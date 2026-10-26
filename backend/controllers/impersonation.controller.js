'use strict';

const { db } = require('../models');
const User = db.User;
const Session = db.Session;
const RolePermission = db.RolePermission;
const { generateToken } = require('../utils/jwt');
const { formatUser, getSettings } = require('../helpers/authHelpers');

exports.startImpersonation = async (req, res) => {
  try {
    const { targetUserId } = req.body;
    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'Target user ID is required' });
    }

    const impersonator = req.user;
    const impersonatorRole = impersonator.roleId ? impersonator.roleId.name : null;
    if (impersonatorRole !== 'super_admin' && impersonatorRole !== 'admin') {
      return res.status(403).json({ success: false, message: 'Only admin can impersonate users' });
    }

    const targetUser = await User.findById(targetUserId).populate('roleId');
    if (!targetUser) {
      return res.status(404).json({ success: false, message: 'Target user not found' });
    }

    const targetUserRole = targetUser.roleId ? targetUser.roleId.name : null;
    if (targetUserRole === 'super_admin' || targetUserRole === 'admin') {
      return res.status(400).json({ success: false, message: 'Cannot impersonate another admin' });
    }

    const impersonationToken = generateToken({
      id: targetUser._id,
      email: targetUser.email,
      role: impersonatorRole,
      isImpersonated: true,
      impersonatorId: impersonator._id
    });

    const settings = await getSettings();
    const expires_at = new Date(Date.now() + (settings?.session_expiration_days || 7) * 24 * 60 * 60 * 1000);

    await Session.create({
      user_id: targetUser._id,
      session_token: impersonationToken,
      device_info: req.headers['user-agent'] || 'unknown',
      ip_address: req.ip,
      agenda: `impersonation_by_${impersonator._id}`,
      expires_at,
      status: 'active',
    });

    const roleId = targetUser.roleId ? (targetUser.roleId._id || targetUser.roleId) : null;
    if (roleId) {
      const rolePerms = await RolePermission.find({ role_id: roleId })
        .populate('permission_id', 'slug')
        .lean();
      targetUser.permissionSlugs = rolePerms
        .filter(rp => rp.permission_id)
        .map(rp => rp.permission_id.slug);
    } else {
      targetUser.permissionSlugs = [];
    }

    return res.status(200).json({
      success: true,
      message: 'Impersonation started successfully',
      token: impersonationToken,
      user: formatUser(targetUser)
    });
  } catch (error) {
    console.error('Error in startImpersonation:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.stopImpersonation = async (req, res) => {
  try {
    const token = req.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const session = await Session.findOne({
      session_token: token,
      agenda: { $regex: /^impersonation_by_/ },
      status: 'active'
    });

    if (!session) {
      return res.status(400).json({ success: false, message: 'Not currently impersonating anyone' });
    }

    const impersonatorId = session.agenda.replace('impersonation_by_', '');

    const originalUser = await User.findById(impersonatorId).populate('roleId');
    if (!originalUser) {
      return res.status(404).json({ success: false, message: 'Original admin not found' });
    }

    const originalUserRole = originalUser.roleId ? originalUser.roleId.name : null;

    const originalToken = generateToken({
      id: originalUser._id,
      email: originalUser.email,
      role: originalUserRole,
    });

    await Session.updateOne({ _id: session._id }, { status: 'inactive' });

    const settings = await getSettings();
    const expires_at = new Date(Date.now() + (settings?.session_expiration_days || 7) * 24 * 60 * 60 * 1000);

    await Session.create({
      user_id: originalUser._id,
      session_token: originalToken,
      device_info: req.headers['user-agent'] || 'unknown',
      ip_address: req.ip,
      agenda: 'login',
      expires_at,
      status: 'active',
    });

    const roleId = originalUser.roleId ? (originalUser.roleId._id || originalUser.roleId) : null;
    if (roleId) {
      const rolePerms = await RolePermission.find({ role_id: roleId })
        .populate('permission_id', 'slug')
        .lean();
      originalUser.permissionSlugs = rolePerms
        .filter(rp => rp.permission_id)
        .map(rp => rp.permission_id.slug);
    } else {
      originalUser.permissionSlugs = [];
    }

    return res.status(200).json({
      success: true,
      message: 'Impersonation stopped successfully',
      token: originalToken,
      user: formatUser(originalUser),
    });
  } catch (error) {
    console.error('Stop impersonation error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

exports.getImpersonationStatus = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      isImpersonating: !!req.isImpersonating,
      impersonatorId: req.isImpersonating ? req.impersonatorId : null,
    });
  } catch (error) {
    console.error('Get status error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
