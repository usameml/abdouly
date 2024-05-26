const mongoose = require('mongoose');

const SaleSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    required: true
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
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Sale = mongoose.model('Sale', SaleSchema);
