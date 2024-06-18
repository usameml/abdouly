const express = require('express');
const router = express.Router();
const { addSale, getSales, getSalesByMonth, updateSale, deleteSale, getSaleById } = require('../controllers/sales');
const { auth, verifyRoles } = require('../middleware/authMiddleware');

router.post('/', auth, verifyRoles('billing_manager', 'admin'), addSale);
router.get('/', auth, verifyRoles('admin', 'product_manager', 'billing_manager'), getSales);
router.get('/salesByMonth', auth, verifyRoles('admin'), getSalesByMonth);
router.get('/:saleId', auth, verifyRoles('admin', 'billing_manager'), getSaleById);
router.put('/:saleId', auth, verifyRoles('billing_manager', 'admin'), updateSale);
router.delete('/:saleId', auth, verifyRoles('billing_manager', 'admin'), deleteSale);

module.exports = router;
