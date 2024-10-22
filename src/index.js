import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { loadInitialState } from './store/slices/loadInitialState';
import store from './store/store';
import { ErrorBoundary } from 'react-error-boundary';
import { Fallback } from './utils/Fallback';
"use client"; // required for class components, which error boundaries require

store.dispatch(loadInitialState());
const root = ReactDOM.createRoot(document.getElementById('root'));
if (!root) {
  throw new Error('Root element not found');
}
root.render(
  <ErrorBoundary FallbackComponent={Fallback}>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </ErrorBoundary>
);