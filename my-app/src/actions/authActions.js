import axios from 'axios';

export const register = (userData) => async dispatch => {
  try {
    const res = await axios.post('/api/register', userData);
    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data
    });
    return { success: true };
  } catch (err) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload: err.response.data
    });
    return { success: false, error: err.response.data };
  }
};

export const verifyUser = (email, verificationCode) => async dispatch => {
  try {
    const res = await axios.post('/api/verify', { email, verificationCode });
    dispatch({
      type: 'VERIFY_SUCCESS',
      payload: res.data
    });
    return { success: true };
  } catch (err) {
    dispatch({
      type: 'VERIFY_FAIL',
      payload: err.response.data
    });
    return { success: false, error: err.response.data };
  }
};

export const loginUser = (userData) => async dispatch => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    const response = await axios.post('/api/login', userData);
    const token = response.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['x-auth-token'] = token;
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
    dispatch(loadUser());
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data });
  }
};

export const loadUser = () => async dispatch => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  }

  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: 'USER_LOADED',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'AUTH_ERROR'
    });
  }
};

export const fetchUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users');  // Make sure the endpoint is correct
    dispatch({
      type: 'FETCH_USERS_SUCCESS',
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: 'FETCH_USERS_FAIL',
      payload: err.response.data
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['x-auth-token'];
  dispatch({ type: 'LOGOUT' });
};

