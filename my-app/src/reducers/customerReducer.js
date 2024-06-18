// src/reducers/customerReducer.js
import { GET_CUSTOMERS, ADD_CUSTOMER, GET_CUSTOMER_SALES } from '../actions/types';

const initialState = {
  customers: [],
  customerSales: {},
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload]
      };
    case GET_CUSTOMER_SALES:
      return {
        ...state,
        customerSales: {
          ...state.customerSales,
          [action.payload.customerId]: action.payload.sales,
        },
      };
    default:
      return state;
  }
};

export default customerReducer;
