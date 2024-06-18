const mongoose = require('mongoose');
const Sale = require('../models/Sale');
const Product = require('../models/products');
const Customer = require('../models/Customer');

exports.addSale = async (req, res) => {
  const { productId, productName, price, size, weight, quantitySold, paidAmount, customerId, customerName } = req.body;

  if (!customerName) {
    return res.status(400).send('Customer name is required');
  }

  console.log("Received sale data:", req.body); // Log incoming data

  try {
    console.log("Fetching product with ID:", productId);
    const product = await Product.findById(productId);
    if (!product) {
      console.error("Product not found:", productId);
      return res.status(404).send('Product not found');
    }

    if (product.quantity < quantitySold) {
      console.error("Insufficient product quantity for productId:", productId);
      return res.status(400).send('Insufficient product quantity');
    }

    console.log("Fetching customer with ID:", customerId);
    const customer = await Customer.findById(customerId);
    if (!customer) {
      console.error("Customer not found:", customerId);
      return res.status(404).send('Customer not found');
    }

    product.quantity -= quantitySold;
    console.log("Updating product quantity. New quantity:", product.quantity);
    await product.save();

    const remainingAmount = price - paidAmount;
    console.log("Calculated remaining amount:", remainingAmount);

    const newSale = new Sale({
      productId,
      productName,
      price,
      size,
      weight,
      quantitySold,
      paidAmount,
      remainingAmount,
      customerId,
      customerName
    });

    console.log("Saving new sale...");
    const sale = await newSale.save();
    console.log("Sale created successfully:", sale); // Log successful sale creation
    res.json(sale);
  } catch (err) {
    console.error('Server Error:', err.message);
    console.error('Stack Trace:', err.stack);
    res.status(500).send('Server Error');
  }
};

exports.getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('productId');
    res.json(sales);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getSalesByMonth = async (req, res) => {
  try {
    const salesByMonth = await Sale.aggregate([
      {
        $group: {
          _id: { $month: '$date' },
          totalPrice: { $sum: { $multiply: ['$paidAmount', 1] } }
        }
      },
      {
        $project: {
          _id: 0,
          month: '$_id',
          totalPrice: 1
        }
      },
      {
        $sort: { month: 1 }
      }
    ]);

    const months = [
      "", "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const salesByMonthWithNames = salesByMonth.map(sale => ({
      month: months[sale.month],
      totalPrice: sale.totalPrice
    }));

    res.json(salesByMonthWithNames);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getSaleById = async (req, res) => {
  const { saleId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    return res.status(400).send('Invalid sale ID');
  }

  try {
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }
    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



exports.updateSale = async (req, res) => {
  const { saleId } = req.params;
  const { price, size, weight, quantitySold, paidAmount, customerName } = req.body;

  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    return res.status(400).send('Invalid sale ID');
  }

  try {
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    sale.price = price;
    sale.size = size;
    sale.weight = weight;
    sale.quantitySold = quantitySold;
    sale.paidAmount = paidAmount;
    sale.remainingAmount = price - paidAmount;
    sale.customerName = customerName;

    await sale.save();
    res.json(sale);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


exports.deleteSale = async (req, res) => {
  const { saleId } = req.params;

  // Check if saleId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(saleId)) {
    return res.status(400).send('Invalid sale ID');
  }

  try {
    const sale = await Sale.findById(saleId);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }

    const product = await Product.findById(sale.productId);
    if (product) {
      product.quantity += sale.quantitySold;
      await product.save();
    }

    await Sale.findByIdAndDelete(saleId);
    res.send('Sale removed');
  } catch (err) {
    console.error(`Error deleting sale with ID ${saleId}:`, err);
    res.status(500).send('Server Error');
  }
};
