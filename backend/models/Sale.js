const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new mongoose.Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: {
    type: Schema.Types.String,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be positive']
  },
  size: {
    type: String,
    required: true
  },
  weight: {
    type: String,
    required: true
  },
  quantitySold: {
    type: Number,
    required: true,
    min: [0, 'Quantity sold must be positive']
  },
  paidAmount: {
    type: Number,
    required: true,
    min: [0, 'Paid amount must be positive']
  },
  remainingAmount: {
    type: Number,
    required: true,
    min: [0, 'Remaining amount must be positive']
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  customerName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Sale', SaleSchema);
