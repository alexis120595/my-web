// Archivo que contiene el componente para iniciar sesión con Google
import { GoogleLogin } from '@react-oauth/google';
import decodeJwt from '../utils/decodeJwt';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Box } from '@mui/material'; 

const GoogleLogin1 = () => {
  // estados para manejar el email del usuario
  const { setUserEmail } = useContext(UserContext);
  const navigate = useNavigate();

// Función que maneja el éxito del inicio de sesión con Google
 async function handleSuccess(credentialResponse) {
    console.log("credentialResponse", credentialResponse);
    // Verificar si el usuario ha iniciado sesión correctamente
    if (credentialResponse.credential) {
      const { payload } = decodeJwt(credentialResponse.credential);
      console.log("payload credential", payload);
      // Verificar si el payload contiene el email del usuario
      if (payload && payload.email) {
        setUserEmail(payload.email);
        localStorage.setItem('userEmail', payload.email);

        console.log("Token JWT:", credentialResponse.credential);
      
        // Enviar el token JWT al backend para verificar el usuario
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
// Función que maneja el error del inicio de sesión con Google
  const handleError = () => {
    console.log("login failed");
  }

  return (
    <div>
  <Box
        sx={{
          display: 'inline-block',
          borderRadius: '30px', 
          overflow: 'hidden', 
          width: '361px', 
          height: '43px', 
        }}
      >
        {/* Componente de GoogleLogin */}
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          sx={{ width: '100%', height: '100%' }}
        />
      </Box>
    </div>
  );
}


export default GoogleLogin1;