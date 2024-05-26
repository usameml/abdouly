const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['product_manager', 'billing_manager', 'admin'], default: 'product_manager' }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
