import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector(state => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  if (isAuthenticated) {
    navigate('/mainlayout/dashboard'); // توجيه المستخدم إلى الصفحة الرئيسية عند تسجيل الدخول بنجاح
  }

  return (
    <Container maxWidth="sm" style={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>تسجيل الدخول</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="اسم المستخدم"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <TextField
          label="كلمة المرور"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
          inputProps={{ style: { textAlign: 'right' } }}
        />
        <Box mt={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>تسجيل الدخول</Button>
        </Box>
      </form>
      <Box mt={2}>
        <Typography>
          ليس لديك حساب؟ <Link to="/register">سجل الآن</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
