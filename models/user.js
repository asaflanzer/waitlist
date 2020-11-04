const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      default: 'pending',
    },
    number: {
      type: Number,
      required: false,
    },
    role: {
      type: String,
      default: 'basic',
      enum: ['basic', 'supervisor', 'admin'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
