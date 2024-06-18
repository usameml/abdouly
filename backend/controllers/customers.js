const Customer = require('../models/Customer');
const Sale = require('../models/Sale');
const mongoose = require('mongoose');

// Add Customer
exports.addCustomer = async (req, res) => {
  try {
    const newCustomer = new Customer(req.body);
    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get All Customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Customer Sales
exports.getCustomerSales = async (req, res) => {
  const { customerId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(customerId)) {
    return res.status(400).send('Invalid customer ID');
  }

  try {
    const sales = await Sale.find({ customerId });
    const totalPaidAmount = sales.reduce((total, sale) => total + sale.paidAmount, 0);
    const totalRemainingAmount = sales.reduce((total, sale) => total + sale.remainingAmount, 0);

    res.json({
      sales,
      totalPaidAmount,
      totalRemainingAmount,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
