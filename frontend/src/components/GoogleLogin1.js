import { GoogleLogin } from '@react-oauth/google';
import decodeJwt from '../utils/decodeJwt';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const GoogleLogin1 = () => {
  const { setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();

 async function handleSuccess(credentialResponse) {
    console.log("credentialResponse", credentialResponse);
    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential);
      console.log("payload credential", payload);
      if (payload && payload.email) {
        setUserEmail(payload.email);
        localStorage.setItem('userEmail', payload.email);

        console.log("Token JWT:", credentialResponse.credential);
        // Send the token to the server

        try {
          const response = await axios.post('http://localhost:8000/login/google', {
            token: credentialResponse.credential
          });
          console.log("Respuesta del backend:", response.data);
          navigate('/opciones');
          // Manejar la respuesta del backend según sea necesario
        } catch (error) {
          console.error("Error al verificar el usuario:", error);
        }
      }
    }
  }

  const handleError = () => {
    console.log("login failed");
  }

  return (
    <div>
     
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
        />
     
    </div>
  );
}

export default GoogleLogin1;