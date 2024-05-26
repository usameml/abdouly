const express = require('express');
const router = express.Router();
const { addSale, getSales, getSalesByMonth } = require('../controllers/sales');
const { auth, verifyRoles } = require('../middleware/authMiddleware');

router.post('/', auth, verifyRoles('billing_manager', 'admin'), addSale);
router.get('/', auth, verifyRoles('admin', 'product_manager', 'billing_manager'), getSales);
router.get('/salesByMonth', auth, verifyRoles('admin', 'product_manager', 'billing_manager'), getSalesByMonth);

module.exports = router;
