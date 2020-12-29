import catchAsync from '../utils/catchAsync.js';
import * as factory from '../controllers/handlerFactory.js';
import User from '../models/userModel.js';

export const deleteUser = factory.deleteOne(Book);

export const getUser = factory.getOne(User);

export const updateUser = catchAsync(async (req, res, next) => {
  console.log('I am in update user controller');
});
