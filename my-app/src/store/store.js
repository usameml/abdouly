import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import {thunk} from 'redux-thunk';  // redux-thunk'ı doğru şekilde içe aktarma
import rootReducer from '../reducers/rootReducer';  // Kendi reducer'ınıza göre yol ayarlayın

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
