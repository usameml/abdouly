import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store';  // المسار المحدث
import App from './App';
import './i18n'; // i18n dosyasını dahil et
import './index.css';

// استخدم createRoot بدلاً من ReactDOM.render
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
