'use strict';

const { db } = require('../models');
const Session = db.Session;

exports.checkImpersonationStatus = async (req, res, next) => {
  req.isImpersonating = false;

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next();
  }

  const token = authHeader.split(' ')[1];

  try {
    const session = await Session.findOne({
      session_token: token,
      agenda: { $regex: /^impersonation_by_/ },
      status: 'active',
    }).lean();

    if (session) {
      req.isImpersonating = true;
      req.impersonatorId = session.agenda.replace('impersonation_by_', '');
    }
  } catch (err) {
    console.error('Error while checking impersonation status:', err);
  }

  next();
};

exports.restrictImpersonationActions = (req, res, next) => {
  if (!req.isImpersonating) {
    return next();
  }

  // Allow stopping impersonation
  if (req.path && (req.path.endsWith('/impersonation/stop') || req.originalUrl?.includes('/impersonation/stop'))) {
    return next();
  }

  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (!safeMethods.includes(req.method)) {
    return res.status(403).json({
      success: false,
      message: 'You can not make changes while impersonating this account.',
    });
  }

  next();
};
