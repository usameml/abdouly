import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { loadUser } from './actions/authActions';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import MainLayout from './components/MainLayout';
import AddProduct from './components/AddProduct';
import ManageProducts from './components/ManageProducts';
import SellProduct from './components/SellProduct';
import Dashboard from './components/Dashboard';
import ProductForSell from './components/ProductForSell';
import ManageUsers from './components/ManageUsers';
import Invoice from './components/Invoice';
import Cart from './components/Cart';
import ManageSales from './components/ManageSales';
import ManageCustomers from './components/ManageCustomers';
import Home from './components/Home';
import VerifyEmail from './components/VerifyEmail';
import About from './components/About';

const App = () => {
  const dispatch = useDispatch();
  const [setSelectedCustomerId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainlayout/*" element={
          <PrivateRoute allowedRoles={['admin', 'billing_manager', 'product_manager']}>
            <MainLayout />
          </PrivateRoute>
        }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="manageproducts" element={<ManageProducts />} />
          <Route path="productforsell" element={<ProductForSell />} />
          <Route path="sellproduct/:productId" element={<SellProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="invoice" element={<Invoice />} />
          <Route path="manageusers" element={<ManageUsers />} />
          <Route path="managesales" element={<ManageSales />} />
          <Route path="managecustomers" element={<ManageCustomers onViewSales={setSelectedCustomerId} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
