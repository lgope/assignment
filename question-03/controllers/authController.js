// packages
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Catch Async Error
import catchAsync from '../utils/catchAsync.js';

// Global Error Handler
import AppError from '../utils/appError.js';

// User Role
import * as userRole from '../utils/userRole.js';

// Models
import User from '../models/userModel.js';

// signup user
export const signup = catchAsync(async (req, res, next) => {
  const { name, mobileNumber, role, password, confirmPassword } = req.body;

  // Bangladeshi mobile number regex
  const numRe = /^(?:\+88|88)?(01[3-9]\d{8})$/g;

  //   Simple validation
  if (!name || !mobileNumber || !role || !password || !confirmPassword) {
    return next(new AppError('Please enter all fields!', 400));
  }

  // checking valid Bangladeshi number
  if (!numRe.test(mobileNumber))
    return next(new AppError('This is not a valid Bangladeshi number!', 400));

  // role checking
  if (![userRole.STUDENT, userRole.LIBRARIAN].includes(role)) {
    return next(new AppError("role must be 'student' or 'librarian'", 400));
  }

  // checking password
  if (password !== confirmPassword)
    return next(new AppError('Passwords are not the same!', 400));

  const user = await User.findOne({ mobileNumber });
  if (user) {
    return next(
      new AppError(
        'Sorry. A user with that mobile number already exists, or the mobile number was invalid.',
        400
      )
    );
  }

  const newUser = await User.create({
    name,
    mobileNumber,
    role,
    password,
  });

  if (!newUser) {
    return next(
      new AppError('Something wrong To add new user! Try again.', 400)
    );
  }

  return res.status(201).json({
    status: 'success',
    newUser,
  });
});

// login user
export const login = catchAsync(async (req, res, next) => {
  const { mobileNumber, password } = req.body;

  // Simple validation
  if (!mobileNumber || !password) {
    return next(new AppError('Please enter all fields 🙂', 400));
    // return res.status(400).json({ msg: 'Please enter all fields 🙂' });
  }

  // Check for existing user
  const user = await User.findOne({ mobileNumber }).select('+password');

  if (!user) return next(new AppError('User Does not exist', 400));

  //   Validate password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError('Invalid credentials', 400));

  // We are sending the profile inside the token
  const token = jwt.sign(
    { mobileNumber: user.mobileNumber, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 3600 }
  );

  if (!token) return next(new AppError('Something went wrong!', 400));

  // returning response
  res.status(200).json({
    message: 'Welcome to Library!',
    token,
    user,
  });
});

// LOGOUT
export const logout = (req, res, next) => {
  const token = jwt.sign(
    { mobileNumber: '21212', role: '2121' },
    process.env.JWT_SECRET,
    { expiresIn: Math.floor(Date.now() / 1000) - 30 }
  );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;

  res.status(200).json({ status: 'success', message: 'Logged out!' });
};
