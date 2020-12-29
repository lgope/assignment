import jwt from 'jsonwebtoken';

import AppError from '../utils/appError.js';

export const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  // Check for token
  if (!token) return next(new AppError('No token, authorization denied', 401));

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    // res.status(400).json({ msg: 'Token is not valid' });
    return next(new AppError('Token is not valid', 400));
  }
};

export const accessTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action.', 403)
      );
    }

    next();
  };
};
