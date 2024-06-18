// src/reducers/saleReducer.js
import { ADD_SALE, GET_SALES, GET_SALES_BY_MONTH, UPDATE_SALE, DELETE_SALE, GET_SALE_BY_ID } from '../actions/types';

const initialState = {
  sales: [],
  salesByMonth: [],
  currentSale: null
};

const saleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SALE:
      return {
        ...state,
        sales: [...state.sales, action.payload]
      };
    case GET_SALES:
      return {
        ...state,
        sales: action.payload
      };
    case GET_SALES_BY_MONTH:
      return {
        ...state,
        salesByMonth: action.payload
      };
    case GET_SALE_BY_ID:
      return {
        ...state,
        currentSale: action.payload
      };
    case UPDATE_SALE:
      return {
        ...state,
        sales: state.sales.map(sale => sale._id === action.payload._id ? action.payload : sale)
      };
    case DELETE_SALE:
      return {
        ...state,
        sales: state.sales.filter(sale => sale._id !== action.payload)
      };
    default:
      return state;
  }
};

export default saleReducer;
