import express from 'express';
const router = express.Router();

// middleware
import { auth } from '../middleware/auth.js';

import * as bookController from '../controllers/bookController.js';

router
  .route('/')
  .post(bookController.createBook)
  .get(bookController.getAllBooks);

router.route('/search/:searchTex').get(bookController.getBook);

router
  .route('/:id')
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);

export default router;
