// # Este archivo es el punto de entrada principal de la aplicación React.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserProvider } from './context/UserContext';
// # Se incluye GoogleOAuthProvider para la autenticación con Google.
// # Se agrega UserProvider para manejar el contexto de usuario.
// # Se renderiza el componente App, que contiene toda la lógica de la aplicación.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
// # Se configura la raíz de la aplicación y se envuelve dentro de BrowserRouter.
  <BrowserRouter>
      
   <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
   
    <UserProvider>
    
      <App />

    </UserProvider>
    </GoogleOAuthProvider>
  </BrowserRouter>
);


reportWebVitals();
