import express from 'express';
const router = express.Router();

// middleware
import { auth, accessTo } from '../middleware/auth.js';

// controller
import * as userController from '../controllers/userController.js';

// utils
import * as userRole from '../utils/userRole.js';

/**
 * @route GET api/user/
 * @desc Get user information
 * @access STUDENT and LIBRARIAN
 */
router
  .route('/student/:phone')
  .get(
    auth,
    accessTo(userRole.LIBRARIAN, userRole.STUDENT),
    userController.getUser
  );

/**
 * @route GET api/user/
 * @desc GET api for get librarian details
 * @access LIBRARIAN
 */
router
  .route('/librarian/:phone')
  .get(auth, accessTo(userRole.LIBRARIAN), userController.getUser);

/**
 * @route PATCH, DELETE api/user/
 * @desc update and delete user info
 * @access STUDENT and LIBRARIAN but only allow to perform logged user
 * @Note access not specified in assignment doc for update and delete
 */
router
  .route('/:id')
  .patch(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

export default router;
