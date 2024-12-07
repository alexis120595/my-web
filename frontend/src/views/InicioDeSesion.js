import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import { UserContext } from '../context/UserContext'; 

const InicioDeSesion = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { setUserEmail } = useContext(UserContext);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login', { email, password });
      const { id: userId, email: userEmail } = response.data;
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
    <Container
    sx={{
      width:"361px",
      height:"555px",
      
      }}
    >
      <Box mt={5}    display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom 
         sx={{ 
          color: 'white',
          width: '361px',
          height: '32px',
          marginBottom: '24px',
         }}>
          Ingresar a mi cuenta
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label={isFocused ? '' : 'Ingresar email'}
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ width: 20, height: 20, color: 'black' }} />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              shrink: true, // Permite que el label se encoja al escribir
            }}
            sx={{ 
              height: '50px', // Alto del input
              width: '361px',
              marginBottom: '24px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'white', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                marginTop: '20px',
                marginLeft: '30px',
                width: '114px',
                height: '18px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
          <TextField
            label="Ingresar contraseña"
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
                  <Box
                    sx={{
                      width: 26,
                      height: 26,
                      borderRadius: '50%',
                      backgroundColor: '#FFD000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <LockIcon sx={{ width: 16, height: 21, color: 'black' }} />
                  </Box>
                </InputAdornment>
              ),
            }}
            sx={{ 
              height: '50px', // Alto del input
              width: '361px',
              marginBottom: '48px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'white', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                marginTop: '20px',
                marginLeft: '30px',
                width: '114px',
                height: '18px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          <Box display="flex" justifyContent="center" mb={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small" // Tamaño pequeño
            sx={{ 
              marginBottom: '48px',
              mt: 2, // Margen superior
              display: 'block', // Para centrar el botón
              backgroundColor: '#FFD000', // Color de fondo del botón
              color: 'black',
              borderRadius: '20px',
              height: '43px', // Alto del botón
              width: '361px', // Ancho del botón ajustado al contenido
            }}
          >
            Iniciar Sesión
          </Button>
          </Box>
        </form>
        <Box sx={{ textAlign: 'center', marginBottom:"24px" }}>
          <p>O ingresar con</p>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom:"24px", mt: 2 }}>
          <GoogleLogin1 />
        </Box>
        <Box display="flex" alignItems="center" justifyContent="center">
          <Typography component="h1" sx={{ color: 'white', mr: 2 }}>
            Todavía no tenés una cuenta
          </Typography>
          <Button
            component={Link}
            to="/registro"
            variant="text"
            size="small"
            sx={{
              color: '#FFD000',
              width: 'auto', // Ajusta el ancho del botón al contenido
              height: 'auto', // Ajusta el alto del botón al contenido
              padding: 0, // Elimina el padding adicional
              minWidth: 'unset', // Elimina el ancho mínimo predeterminado
            }}
          >
            Registrarme
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default InicioDeSesion;