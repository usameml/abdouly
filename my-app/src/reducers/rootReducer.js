import { combineReducers } from 'redux';
import authReducer from './authReducer';
import saleReducer from './saleReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  sales: saleReducer
});

export default rootReducer;
