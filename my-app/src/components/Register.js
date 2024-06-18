import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../actions/authActions';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    userType: 'user'
  });

  const { username, email, password, userType } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    const result = await dispatch(register({ username, email, password, userType }));
    if (result.success) {
      navigate('/verify-email'); // Kullanıcıyı doğrulama sayfasına yönlendirin
    }
  };

  return (
    <Container maxWidth="sm" style={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>التسجيل</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label="اسم المستخدم"
          name="username"
          value={username}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="البريد الإلكتروني"
          name="email"
          value={email}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="كلمة المرور"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>تسجيل</Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
