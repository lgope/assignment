import express from 'express';
const router = express.Router();

// middleware
import { auth } from '../middleware/auth.js';
import * as userController from '../controllers/userController.js';

// student, librarian
router.route('student/:phone').get(userController.getUser);

// only librarian
router.route('librarian/:phone').get(userController.getUser);

router
  .route('/:id')
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

export default router;
