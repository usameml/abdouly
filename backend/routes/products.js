const express = require('express');
const router = express.Router();
const { auth: verifyToken, verifyRoles } = require('../middleware/authMiddleware');
const productController = require('../controllers/products');

router.post('/products', verifyToken, verifyRoles('product_manager', 'admin'), productController.addProduct);
router.get('/products', verifyToken, verifyRoles('product_manager', 'billing_manager', 'admin'), productController.getProducts);
router.delete('/products/:id', verifyToken, verifyRoles('product_manager', 'admin'), productController.deleteProduct);
router.put('/products/:id', verifyToken, verifyRoles('product_manager', 'admin'), productController.updateProduct);
router.post('/products/sell', verifyToken, verifyRoles('billing_manager', 'admin'), productController.sellProduct);

// Error handling middleware
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
