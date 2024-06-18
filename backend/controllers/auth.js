const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const sendEmail = require('../utils/sendEmail');

const tokenSecret = process.env.TOKEN_SECRET;

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send('Email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationCode,
      userType: 'user',
      isVerified: false
    });

    await newUser.save();

    // Send verification email
    const emailText = `Please verify your email by entering the following code: ${verificationCode}`;
    await sendEmail(email, 'Email Verification', emailText);

    res.status(201).send('User registered successfully, please check your email for verification code');
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
};

const verifyUser = async (req, res) => {
  const { email, verificationCode } = req.body;
  try {
    const user = await User.findOne({ email, verificationCode });
    if (!user) {
      return res.status(400).send('Invalid verification code');
    }
    user.isVerified = true;
    await user.save();
    res.status(200).send('User verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying user');
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body; // Change username to email
  try {
    const user = await User.findOne({ email });
    if (user && await bcrypt.compare(password, user.password)) {
      if (!user.isVerified) {
        return res.status(403).send('Please verify your email before logging in.');
      }
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        tokenSecret,
        { expiresIn: '24h' }
      );
      res.json({ token });
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userInfo = await User.findById(req.user.id);
    res.json(userInfo);
  } catch (error) {
    res.status(500).send('Error retrieving user information');
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error fetching users');
  }
};

const updateUserType = async (req, res) => {
  const { userId, userType } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.userType = userType;
    await user.save();
    res.status(200).send('UserType updated successfully');
  } catch (error) {
    res.status(500).send('Error updating userType');
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
  getUsers,
  updateUserType,
  verifyUser
};
