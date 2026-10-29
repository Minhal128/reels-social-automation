const { db } = require('../models');
const ContactInquiry = db.ContactInquiry;
const LandingPage = require('../models/landing-page.model');
const EmailDispatcher = require('../services/emailDispatcher');

// Visitor input goes into an HTML email body; escape it so a message can't inject markup/links
const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

exports.getAllInquiries = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const search = req.query.search || '';
  const sortField = req.query.sort_by || 'created_at';
  const sortOrder = req.query.sort_order?.toUpperCase() === 'ASC' ? 1 : -1;

  try {
    const allowedSortFields = ['id', 'name', 'email', 'subject', 'message', 'created_at', 'updated_at'];
    const safeSortField = allowedSortFields.includes(sortField) ? sortField : 'created_at';

    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { subject: { $regex: search, $options: 'i' } },
            { message: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [inquiries, total] = await Promise.all([
      ContactInquiry.find(query).sort({ [safeSortField]: sortOrder }).skip(skip).limit(limit),
      ContactInquiry.countDocuments(query),
    ]);

    res.status(200).json({
      message:'Contact inquiries fetched successfully.',
      total,
      totalPages: Math.ceil(total / limit),
      page,
      limit,
      inquiries,
    });
  } catch (error) {
    console.error('Error in getAllInquiries:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getInquiryById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res.status(400).json({ message: 'Inquiry ID is required' });
    }

    const inquiry = await ContactInquiry.findById(id);
    if (!inquiry) {
      return res.status(404).json({ message: 'Inquiry not found' });
    }

    res.status(200).json({ message: 'Contact inquiry fetched successfully.', inquiry, });
  } catch (error) {
    console.error('Error in getInquiryById:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid inquiry ID' });
    }

    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createInquiry = async (req, res) => {
  const [name, email, subject, message] = ['name', 'email', 'subject', 'message'].map((k) =>
    typeof req.body?.[k] === 'string' ? req.body[k].trim() : ''
  );

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  try {
    await ContactInquiry.create({ name, email, subject, message });

    // Notify the inbox shown on the landing page. Not awaited (same as welcome-message): the inquiry is
    // already saved, so a slow or failing SMTP (e.g. not configured) is logged instead of blocking the visitor.
    const landing = await LandingPage.findOne().select('contact.email').lean();
    const to = landing?.contact?.email;
    if (to) {
      EmailDispatcher.dispatch(to, 'contact-inquiry', {
        name: escapeHtml(name),
        email: escapeHtml(email),
        subject: escapeHtml(subject),
        message: escapeHtml(message).replace(/\n/g, '<br>'),
      }).then((result) => {
        if (!result?.success) console.error('[createInquiry] Notification email not sent:', result?.message);
      });
    }

    return res.status(200).json({ message: 'Contact inquiry created successfully' });
  } catch (error) {
    console.error('Error in createInquiry:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteInquiry = async (req, res) => {
  const { ids } = req.body;

  try {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: 'Inquiry IDs array is required' });
    }

    const result = await ContactInquiry.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No inquiries found.' });
    }

    const response = {
      message: `${result.deletedCount} Contact inquiries deleted successfully`,
      deletedCount: result.deletedCount,
    };

    return res.status(200).json({message: 'Contact inquiry deleted successfully.', response});
  } catch (error) {
    console.error('Error in deleteInquiry:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};