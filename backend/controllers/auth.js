const jwt = require('jsonwebtoken');
const User = require('../models/auth');
const bcrypt = require('bcryptjs');

const tokenSecret = process.env.TOKEN_SECRET;

const registerUser = async (req, res) => {
  const { username, password } = req.body; // إزالة userType من body
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send('Username already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering new user');
  }
};


const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
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
  updateUserType
};
