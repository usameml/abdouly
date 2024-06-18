import { combineReducers } from 'redux';
import authReducer from './authReducer';
import saleReducer from './saleReducer';
import customerReducer from './customerReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  sales: saleReducer,
  customer: customerReducer,
});

export default rootReducer;
