import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const SellProduct = () => {
  const { productId } = useParams();
  const location = useLocation();
  const stateProductId = location.state?.productId;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: productId || stateProductId || '',
    price: '',
    size: '',
    weight: '',
    quantitySold: ''
  });

  const { price, size, weight, quantitySold } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(formData);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    navigate('/mainlayout/cart'); // الانتقال إلى صفحة السلة بعد إضافة المنتج
  };

  return (
    <Container maxWidth="sm" style={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>بيع المنتج</Typography>
      <form onSubmit={onSubmit}>
      <TextField
          label="معرف المنتج"
          value={formData.productId} // تم تغييرها إلى value بدلاً من name
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true, style: { textAlign: 'right' } }} // إضافة readOnly: true لجعل الحقل غير قابل للتعديل
          required
        />
        <TextField
          label="السعر"
          name="price"
          type="number"
          value={price}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="الحجم"
          name="size"
          value={size}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="الوزن"
          name="weight"
          value={weight}
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
          value={quantitySold}
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
    </Container>
  );
};

export default SellProduct;
