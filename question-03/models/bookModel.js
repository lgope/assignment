import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },

  date: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('book', bookSchema);
