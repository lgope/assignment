import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import AppError from '../utils/appError.js';
// import User from '../models/userModel.js';
import { auth } from '../middleware/auth.js';

router.get('/', (req, res) => {
  res.status(200).json({
    status: 'Ok',
    message: 'Hello World!',
  });
});

export default router;
