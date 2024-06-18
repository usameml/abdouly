const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const saleRoutes = require('./routes/sales');
const customerRoutes = require('./routes/customers');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/customers', customerRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 10000, // Increase timeout to 10 seconds
})
.then(() => {
  console.log("Connected to MongoDB successfully");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit process with failure
});


// Basic route for testing
app.get('/', (req, res) => {
  res.send('API is running...');
});
