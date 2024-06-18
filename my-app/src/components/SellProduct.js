import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, MenuItem, Select, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomers, addCustomer } from '../actions/customerActions';

const SellProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const stateProductId = location.state?.productId;
  const stateProductName = location.state?.productName;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const customers = useSelector(state => state.customer.customers);

  const [formData, setFormData] = useState({
    productId: productId || stateProductId || '',
    productName: stateProductName || '',
    price: '',
    size: '',
    weight: '',
    quantitySold: '',
    customerId: '',
    paidAmount: '',
    remainingAmount: '',
  });

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCustomerName, setNewCustomerName] = useState('');

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const onChange = e => {
    const { name, value } = e.target;
    if (name === 'customerId' && value === 'new') {
      setIsModalVisible(true);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    
    // Customer object
    const customer = customers.find(cust => cust._id === formData.customerId);
    
    // Complete formData object with customer name
    const completeFormData = {
      ...formData,
      customerName: customer ? customer.name : ''
    };
    
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(completeFormData);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    // Save the customer object separately for easy access
    localStorage.setItem('customer', JSON.stringify(customer));
    
    navigate('/mainlayout/cart');
  };
  

  const handleAddCustomer = () => {
    dispatch(addCustomer({ name: newCustomerName })).then(() => {
      dispatch(getCustomers());
      setIsModalVisible(false);
      setNewCustomerName('');
    });
  };

  return (
    <Container maxWidth="sm" style={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>بيع المنتج</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="معرف المنتج"
          value={formData.productId}
          fullWidth
          margin="dense"
          InputProps={{ readOnly: true, style: { textAlign: 'right' } }}
          required
        />
        <TextField
          label="اسم المنتج"
          value={formData.productName}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true, style: { textAlign: 'right' } }}
          required
        />
        <TextField
          label="السعر"
          name="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="الحجم"
          name="size"
          value={formData.size}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="الوزن"
          name="weight"
          value={formData.weight}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="الكمية المباعة"
          name="quantitySold"
          type="number"
          value={formData.quantitySold}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Select
          label="اسم العميل"
          name="customerId"
          value={formData.customerId}
          onChange={onChange}
          fullWidth
          margin="dense"
          required
          displayEmpty
          inputProps={{ style: { textAlign: 'right' } }}
        >
          <MenuItem value="" disabled>
            اختر العميل
          </MenuItem>
          {customers.map(customer => (
            <MenuItem key={customer._id} value={customer._id}>
              {customer.name}
            </MenuItem>
          ))}
          <MenuItem value="new">
            إضافة عميل جديد
          </MenuItem>
        </Select>
        <TextField
          label="المبلغ المدفوع"
          name="paidAmount"
          type="number"
          value={formData.paidAmount}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="المبلغ المتبقي"
          name="remainingAmount"
          type="number"
          value={formData.remainingAmount}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>إضافة إلى السلة</Button>
        </Box>
      </form>
      <Modal
        open={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <Container maxWidth="sm" style={{ direction: 'rtl', padding: '2em' }}>
          <Typography variant="h6" gutterBottom>إضافة عميل جديد</Typography>
          <TextField
            label="اسم العميل"
            value={newCustomerName}
            onChange={e => setNewCustomerName(e.target.value)}
            fullWidth
            margin="normal"
            required
            inputProps={{ style: { textAlign: 'right' } }}
          />
          <Box mt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleAddCustomer}>
              إضافة عميل
            </Button>
          </Box>
        </Container>
      </Modal>
    </Container>
  );
};

export default SellProduct;
