import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import * as userRole from '../utils/userRole.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
      validate: {
        /**
         * This only works on CREATE and SAVE!!
         * Checking bangladeshi number by regex
         */

        validator: function (number) {
          const numRe = /^(?:\+88|88)?(01[3-9]\d{8})$/g;
          return numRe.test(number);
        },
        message: 'This is not a valid Bangladeshi number!',
      },
      unique: true,
    },

    role: {
      type: String,
      enum: [userRole.STUDENT, userRole.LIBRARIAN],
      required: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
      select: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        // excluding those fields from JSON results.
        delete ret.password;
        delete ret.__v;
        delete ret.id;
        return ret;
      },
    },
  }
);
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 10
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = this.password;

  next();
});

export default mongoose.model('user', userSchema);
