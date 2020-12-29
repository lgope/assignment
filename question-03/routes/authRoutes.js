import express from 'express';
const router = express.Router();

// middleware
import { auth } from '../middleware/auth.js';

import * as authController from '../controllers/authController.js';

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.get('/logout', auth, authController.logout);

export default router;
