import express from 'express';
const router = express.Router();

// middleware
import { auth, accessTo } from '../middleware/auth.js';
import * as userRole from '../utils/userRole.js';
import * as bookController from '../controllers/bookController.js';

router
  .route('/')
  .post(bookController.createBook)
  .get(
    auth,
    accessTo(userRole.STUDENT, userRole.LIBRARIAN),
    bookController.getAllBooks
  );

router
  .route('/search/:searchTex')
  .get(
    auth,
    accessTo(userRole.STUDENT, userRole.LIBRARIAN),
    bookController.getBook
  );

router
  .route('/:id')
  .patch(auth, accessTo(userRole.LIBRARIAN), bookController.updateBook)
  .delete(auth, accessTo(userRole.LIBRARIAN), bookController.deleteBook);

export default router;
