import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../actions/authActions';
import logo from '../assets/logo.png';

// Custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#000000', // Black color
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      '"Arial"',
      'sans-serif'
    ].join(','),
  },
});

const CustomAppBar = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar style={{ justifyContent: 'center' }}>
          <img src={logo} alt="Logo" style={{ height: '70px', marginRight: '30px' }} />
          <Box>
            {isAuthenticated ? (
              <Button color="inherit" onClick={handleLogout}>
                {t('Logout')}
              </Button>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                {t('Login')}
              </Button>
            )}
            <Button color="inherit" component={Link} to="/">
              {t('Home')}
            </Button>
            <Button color="inherit" component={Link} to="/about">
              {t('About')}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default CustomAppBar;
