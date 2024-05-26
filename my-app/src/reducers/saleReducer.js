import { ADD_SALE, GET_SALES, GET_SALES_BY_MONTH } from '../actions/types';

const initialState = {
  sales: [],
  salesByMonth: [] // تهيئة الحالة
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
        salesByMonth: action.payload // تأكد من أن البيانات تم تحميلها بشكل صحيح
      };
    default:
      return state;
  }
};

export default saleReducer;
