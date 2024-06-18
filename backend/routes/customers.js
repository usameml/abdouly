const express = require('express');
const { addCustomer, getCustomers, getCustomerSales } = require('../controllers/customers');
const { auth, verifyRoles } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, verifyRoles('admin', 'billing_manager'), addCustomer);
router.get('/', auth, verifyRoles('admin', 'billing_manager'), getCustomers);
router.get('/:customerId/sales', auth, verifyRoles('admin', 'billing_manager'), getCustomerSales);

module.exports = router;
