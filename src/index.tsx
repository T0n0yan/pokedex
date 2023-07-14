import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.scss'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { setupStore } from './store/index';
import './index.css';
const store = setupStore()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);

