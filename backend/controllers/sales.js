const Sale = require('../models/Sale');
const Product = require('../models/products');

exports.addSale = async (req, res) => {
  const { productId, price, size, weight, quantitySold } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    if (product.quantity < quantitySold) {
      return res.status(400).send('Insufficient product quantity');
    }

    product.quantity -= quantitySold;
    await product.save();

    const newSale = new Sale({
      productId,
      price,
      size,
      weight,
      quantitySold
    });

    const sale = await newSale.save();
    res.json(sale);
  } catch (err) {
    console.error(err.message);
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
          totalPrice: { $sum: { $multiply: ['$price', '$quantitySold'] } }
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
        $sort: { month: 1 } // ترتيب الأشهر
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

