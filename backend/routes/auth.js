const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { auth, verifyRoles } = require('../middleware/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/auth', auth, authController.getUserInfo);
router.get('/users', auth, verifyRoles('admin'), authController.getUsers); // مسار جلب المستخدمين
router.put('/userType', auth, verifyRoles('admin'), authController.updateUserType); // مسار تعديل userType

router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = router;
