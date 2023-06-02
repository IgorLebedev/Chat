import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './i18n';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import store from './slicers/store';
import AuthProvider from './providers/AuthProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SocketProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </SocketProvider>
    </Provider>
  </React.StrictMode>,
);
