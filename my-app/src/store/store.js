import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';  // استخدم التدمير (destructuring) للاستيراد
import rootReducer from '../reducers/rootReducer';  // المسار النسبي

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
