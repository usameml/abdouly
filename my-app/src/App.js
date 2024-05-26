import React, { useEffect } from 'react';
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

const App = () => {
  const dispatch = useDispatch();

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
      <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mainlayout" element={
          <PrivateRoute>
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
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
