import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// user roles
import * as userRole from '../utils/userRole.js';

export const deleteOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(
      { _id: req.params.id, isActive: 'true' },
      { isActive: 'false' },
      { new: true }
    );

    if (!doc) {
      return next(new AppError('No document found with that id', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOneAndUpdate(
      { _id: req.params.id, isActive: 'true' },
      req.body,
      {
        new: true,
      }
    );
    if (!doc) {
      return next(new AppError('No doccument found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

// only for book
export const createOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      doc,
    });
  });

// only for user
export const getOne = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findOne({
      mobileNumber: req.params.phone,
      isActive: 'true',
    });

    if (!doc) {
      return next(
        new AppError('No Document found with that phone number!', 404)
      );
    }

    // console.log('reu ', req.user);
    if (doc.role === userRole.LIBRARIAN && req.user.role === userRole.STUDENT)
      return res.status(200).json({
        status: 'success',
        message: 'Librarian details are not visible for students!',
      });

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

export const getAll = Model =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.find({ isActive: true }).sort({ createdAt: -1 });

    // SEND Response res
    res.status(200).json({
      status: 'success',
      results: doc.length,
      doc,
    });
  });

// only for users
export const modifyUser = (Model, method) =>
  catchAsync(async (req, res, next) => {
    const user = await Model.findOne({
      _id: req.params.id,
      isActive: 'true',
    });

    if (!user) {
      return next(new AppError('No user found with that id', 404));
    }

    // checking requested user and update user same or not
    if (user.mobileNumber !== req.user.mobileNumber)
      return next(
        new AppError(
          'Sorry! You do not have permission to perform this action others information.',
          403
        )
      );

    // update name
    if (method === 'update') {
      const { name } = req.body;

      if (!name) return next(new AppError('Please enter all fields 🙂', 400));

      user.name = name;
      await user.save();

      res.status(200).json({
        status: 'success',
        doc: user,
      });
    }

    // delete
    if (method === 'softDelete') {
      user.isActive = false;
      await user.save();

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  });
