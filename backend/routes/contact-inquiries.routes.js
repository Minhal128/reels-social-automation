const express = require('express');
const router = express.Router();
const { authenticate } = require('../middlewares/auth');
const { checkPermission } = require('../middlewares/permission');
const contactInquiryController = require('../controllers/contact-inquiries.controller');

router.post('/create', contactInquiryController.createInquiry);
router.use(authenticate);
router.get('/all', checkPermission('view.inquiries'), contactInquiryController.getAllInquiries);
router.get('/:id', checkPermission('view.inquiries'), contactInquiryController.getInquiryById);
router.delete('/delete', checkPermission('delete.inquiries'), contactInquiryController.deleteInquiry);

module.exports = router;