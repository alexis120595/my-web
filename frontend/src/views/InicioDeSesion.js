import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { UserContext } from '../context/UserContext'; 

const InicioDeSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { email, password });
      const {id: userId, email: userEmail } = response.data;
      localStorage.setItem('userId', userId);
      localStorage.setItem('userEmail', userEmail);
      setUserEmail(userEmail);
      setSuccess('Inicio de sesión exitoso');
      setError(null);
      console.log('ID del usuario guardado en localStorage:', userId); // Verificar el ID del usuario
      navigate('/opciones');
    } catch (error) {
      setError('Error al iniciar sesión');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom  sx={{ color: 'black' }}>
          Ingresar a mi cuenta
        </Typography>
        <form onSubmit={handleSubmit} >
          <TextField
            label="ingresar email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ 

              
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'black', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Color del label
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
          <TextField
            label="ingresar contraseña"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              )
            }}
            sx={{ 
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'black', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black', // Color del label
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Button type="submit" variant="contained" color="primary"   size="small" // Tamaño pequeño
            sx={{ 
              mb:2,
              mt: 2, // Margen inferior
              display: 'block', // Para centrar el botón
               // M
               ml: 16,
               backgroundColor: 'yellow', // Color de fondo del botón
               color: 'black',
               borderRadius: '20px',
              width: '300px', // Ancho del botón ajustado al contenido
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
              }
            }} >
            Iniciar Sesión
          </Button>
        </form>
        <Box sx={{ textAlign: 'center', mt: 2, mb: 4  }}>
          <p>O ingresar con</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2, mt: 2 }}>
          <GoogleLogin1 
           sx={{ 
            mb:2,
            mt: 2, // Margen inferior
            display: 'block', // Para centrar el botón
             // M
             mr: 16,
             backgroundColor: 'yellow', // Color de fondo del botón
             color: 'black',
             borderRadius: '20px',
            width: '300px', // Ancho del botón ajustado al contenido
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
            }
          }}  />
           </Box>

<Typography variant="h6" component="h1" gutterBottom  sx={{ color: 'black', mt:2}}>
          Todavia no tenes una  cuenta
        </Typography>
          <Button component={Link} to="/registro" variant="text"  size="small" // Tamaño pequeño
             sx={{ 
              mb:2,
              mt: 2, // Margen inferior
              display: 'block', // Para centrar el botón
               // M
               ml: 16,
                 // Color de fondo del botón
               color: 'yellow',
               
              width: '300px', // Ancho del botón ajustado al contenido
              
            }} 
           >
            Registrarse
          </Button>
      </Box>
    </Container>
  );
};

export default InicioDeSesion;