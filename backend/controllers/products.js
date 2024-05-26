const Product = require('../models/products');

const addProduct = async (req, res) => {
  const { name, quantity } = req.body;
  try {
    const newProduct = new Product({
      name,
      quantity,
    });
    await newProduct.save();
    res.status(201).send('Product added successfully');
  } catch (error) {
    res.status(500).send('Error adding product');
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send('Error fetching products');
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).send('Product deleted successfully');
  } catch (error) {
    res.status(500).send('Error deleting product');
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, quantity },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send('Error updating product');
  }
};

const sellProduct = async (req, res) => {
  const { id, quantitySold } = req.body;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }
    if (product.quantity < quantitySold) {
      return res.status(400).send('Insufficient product quantity');
    }
    product.quantity -= quantitySold;
    await product.save();
    res.status(200).send('Product sold successfully');
  } catch (error) {
    res.status(500).send('Error selling product');
  }
};

module.exports = { addProduct, getProducts, deleteProduct, updateProduct, sellProduct };
