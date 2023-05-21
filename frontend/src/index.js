import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { Provider } from 'react-redux'
import { store } from './reducers'

import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="967162800646-i5fbcs2il2vtkdg9i7fnkjr0h696r089.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>;
    </Provider>
  </React.StrictMode>
);

