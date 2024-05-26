import axios from 'axios';
import { ADD_SALE, GET_SALES, GET_SALES_BY_MONTH } from './types';

export const addSale = (saleData) => async dispatch => {
  try {
    const res = await axios.post('/api/sales', saleData);
    dispatch({
      type: ADD_SALE,
      payload: res.data
    });
  } catch (err) {
    console.error('Error adding sale', err);
    // handle error
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
    // handle error
  }
};

export const getSalesByMonth = () => async dispatch => {
  try {
    const res = await axios.get('/api/sales/salesByMonth');
    console.log(res.data); // للتحقق من البيانات
    dispatch({
      type: GET_SALES_BY_MONTH,
      payload: res.data
    });
  } catch (err) {
    console.error('Error getting sales by month', err);
    // معالجة الخطأ
  }
};