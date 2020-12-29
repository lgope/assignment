import * as factory from '../controllers/handlerFactory.js';
import User from '../models/userModel.js';

export const deleteUser = factory.modifyUser(User, 'softDelete');

export const getUser = factory.getOne(User);

export const updateUser = factory.modifyUser(User, 'update');
