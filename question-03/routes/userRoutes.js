import express from 'express';
const router = express.Router();

// middleware
import { auth, accessTo } from '../middleware/auth.js';

// controller
import * as userController from '../controllers/userController.js';

// utils
import * as userRole from '../utils/userRole.js';

// student, librarian
router
  .route('/student/:phone')
  .get(
    auth,
    accessTo(userRole.LIBRARIAN, userRole.STUDENT),
    userController.getUser
  );

// only librarian
router
  .route('/librarian/:phone')
  .get(auth, accessTo(userRole.LIBRARIAN), userController.getUser);

router
  .route('/:id')
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

export default router;
