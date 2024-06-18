import axios from 'axios';
import { GET_CUSTOMERS, ADD_CUSTOMER, GET_CUSTOMER_SALES } from './types';

export const getCustomers = () => async dispatch => {
  try {
    const res = await axios.get('/api/customers');
    dispatch({
      type: GET_CUSTOMERS,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};

export const addCustomer = customer => async dispatch => {
  try {
    const res = await axios.post('/api/customers', customer);
    dispatch({
      type: ADD_CUSTOMER,
      payload: res.data,
    });
  } catch (err) {
    console.error(err);
  }
};

export const getCustomerSales = customerId => async dispatch => {
  try {
    const res = await axios.get(`/api/customers/${customerId}/sales`);
    dispatch({
      type: GET_CUSTOMER_SALES,
      payload: { customerId, sales: res.data },
    });
  } catch (err) {
    console.error(err);
  }
};
