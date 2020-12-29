import catchAsync from '../utils/catchAsync.js';
import * as factory from '../controllers/handlerFactory.js';
import Book from '../models/bookModel.js';

export const getAllBooks = factory.getAll(Book);
export const createBook = factory.createOne(Book);
export const updateBook = factory.updateOne(Book);
export const deleteBook = factory.deleteOne(Book);

export const getBook = catchAsync(async (req, res, next) => {
  const searchTex = req.params.searchTex;

  const book = await Book.find({ isActive: true,
    $or: [
      { bookName: { $regex: searchTex, $options: 'i' } },
      { author: { $regex: searchTex, $options: 'i' } },
    ],
  }).sort({ createdAt: -1 });

  if (book.length === 0)
    return res.status(404).json({
      status: 'fail',
      results: book.length,
      message: 'No book found with that search text. Try differen! ☹',
    });

  res.status(200).json({
    status: 'success',
    results: book.length,
    doc: book,
  });
});
