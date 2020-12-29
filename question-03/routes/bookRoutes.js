import express from 'express';
const router = express.Router();

// middleware
import { auth, accessTo } from '../middleware/auth.js';

// utils
import * as userRole from '../utils/userRole.js';

// controller
import * as bookController from '../controllers/bookController.js';

/**
 * @route POST, GET  api/book/
 * @desc Post and Get book information
 * @access LIBRARIAN
 */

router
  .route('/')
  .post(auth, accessTo(userRole.LIBRARIAN), bookController.createBook)
  .get(
    auth,
    accessTo(userRole.STUDENT, userRole.LIBRARIAN),
    bookController.getAllBooks
  );

/**
 * @route GET api/book/
 * @desc Get a book information by author or name
 * @access STUDENT and LIBRARIAN
 */
router
  .route('/search/:searchTex')
  .get(
    auth,
    accessTo(userRole.STUDENT, userRole.LIBRARIAN),
    bookController.getBook
  );

/**
 * @route PATCH, DELETE api/book/
 * @desc update and delete user info
 * @access LIBRARIAN
 * @Note access not specified in assignment doc for update and delete
 */

router
  .route('/:id')
  .patch(auth, accessTo(userRole.LIBRARIAN), bookController.updateBook)
  .delete(auth, accessTo(userRole.LIBRARIAN), bookController.deleteBook);

export default router;
