const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  // Other customer fields as necessary
});

module.exports = mongoose.model('Customer', CustomerSchema);
