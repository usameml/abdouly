import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

const Login = () => {
  const [email, setEmail] = useState(''); // Change username to email
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.userType === 'user') {
        navigate('/'); // Normal kullanıcıları ana sayfaya yönlendir
      } else {
        navigate('/mainlayout/dashboard'); // Diğer kullanıcıları dashboard'a yönlendir
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })); // Change username to email
  };

  return (
    <Container maxWidth="sm" style={{ direction: 'rtl' }}>
      <Typography variant="h4" component="h1" gutterBottom>تسجيل الدخول</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
