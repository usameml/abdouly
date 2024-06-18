const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  userType: { type: String, enum: ['product_manager', 'billing_manager', 'admin', 'user'], default: 'user' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
