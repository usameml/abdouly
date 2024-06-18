// src/actions/saleActions.js
import axios from 'axios';
import { ADD_SALE, GET_SALES, GET_SALES_BY_MONTH, UPDATE_SALE, DELETE_SALE, GET_SALE_BY_ID } from './types';

export const addSale = (saleData) => async dispatch => {
  try {
    const res = await axios.post('/api/sales', saleData);
    dispatch({
      type: ADD_SALE,
      payload: res.data
    });
  } catch (err) {
    console.error('Error adding sale', err);
  }
};

export const getSales = () => async dispatch => {
  try {
    const res = await axios.get('/api/sales');
    dispatch({
      type: GET_SALES,
      payload: res.data
    });
  } catch (err) {
    console.error('Error getting sales', err);
  }
};

export const getSalesByMonth = () => async dispatch => {
  try {
    const res = await axios.get('/api/sales/salesByMonth');
    dispatch({
      type: GET_SALES_BY_MONTH,
      payload: res.data
    });
  } catch (err) {
    console.error('Error getting sales by month', err);
  }
};

export const getSaleById = (saleId) => async dispatch => {
  try {
    const res = await axios.get(`/api/sales/${saleId}`);
    dispatch({
      type: GET_SALE_BY_ID,
      payload: res.data
    });
  } catch (err) {
    console.error('Error getting sale by ID', err);
  }
};

export const updateSale = (saleId, saleData) => async dispatch => {
  try {
    const res = await axios.put(`/api/sales/${saleId}`, saleData);
    dispatch({
      type: UPDATE_SALE,
      payload: res.data
    });
  } catch (err) {
    console.error('Error updating sale', err);
  }
};

export const deleteSale = (saleId) => async dispatch => {
  try {
    await axios.delete(`/api/sales/${saleId}`);
    dispatch({
      type: DELETE_SALE,
      payload: saleId
    });
  } catch (err) {
    console.error('Error deleting sale', err);
  }
};
