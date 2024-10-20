import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { loadInitialState } from './store/slices/loadInitialState';
import store from './store/store';

store.dispatch(loadInitialState());
const root = ReactDOM.createRoot(document.getElementById('root'));
if (!root) {
  throw new Error('Root element not found');
}
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);