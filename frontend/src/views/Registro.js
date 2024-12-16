import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Registro = () => {
  const [form, setForm] = useState({
   
    email: '',
    password: '',
   
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/registro', form);
      setSuccess(response.data.message);
      setError(null);
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al registrar el usuario');
      setSuccess(null);
    }
  };

  return (
    <Container 
    
    sx={{
      width: { xs: '100%', sm: '360px' }, // Ancho 100% en pantallas pequeñas, 360px en pantallas medianas y grandes
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, // Padding 2 en pantallas pequeñas, 0 en pantallas medianas y grandes
      marginTop: { xs: 2, sm: 5 }, // Margen superior 2 en pantallas pequeñas, 5 en pantallas medianas y grandes
    }}>
      <Box mt={5} textAlign="left" sx={{ width: '100%'}}>
        <Typography variant="h4" component="h1" gutterBottom
         sx={{
          textAlign: 'left',
          marginBottom: '24px',
          fontFamily:'Poppins',
          fontSize:'24px',
        }}
        >
          Registrarme
        </Typography>
        <form onSubmit={handleSubmit}>
      
        <TextField
            label={isEmailFocused ? '' : 'Ingresar email'}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onFocus={() => setIsEmailFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsEmailFocused(false)}
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }}
          />
         <TextField
            label={isPasswordFocused ? '' : 'Ingresar contraseña'}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setIsPasswordFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsPasswordFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: '26px',
                      height: '26px',
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }}
          />
          <TextField
            label={isConfirmPasswordFocused ? '' : 'Repetir contraseña'}
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsConfirmPasswordFocused(true)} // Actualiza el estado al enfocar
            onBlur={() => setIsConfirmPasswordFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" // Tamaño pequeño
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    sx={{
                      width: '26px',
                      height: '26px',
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
            InputLabelProps={{
              shrink: true, // Permite que el label se encoja al escribir
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }}
          />
      
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}

          <Box display="flex" justifyContent="left"
          sx={{
            height: '43px',
            width:"362px",
            marginBottom: '44px',
          }}
          >
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}   
          
          sx={{ 
            marginBottom: '44px',
            height: '43px',
            width:"362px",
              // Margen inferior
              backgroundColor: '#FFD000', // Color de fondo del botón
              color: 'black', // Color del texto
              borderRadius: '30px', // Bordes redondeados
              display: 'block', // Para centrar el botón
              fontFamily: 'Poppins', // Aplica la fuente Poppins
              fontSize: '16px', // Tamaño de fuente 16px
              textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
             
            }}>
            Registrarme
          </Button>
          </Box>
        </form>
        <Box 
        sx={{ 
          textAlign: 'center',  
          marginBottom: '24px', 
          fontFamily: 'Poppins',
          fontSize: '14px',
           }}>
          <p>O ingresar con</p>
        </Box>
        <Box 
        sx={{ display: 'flex',
         justifyContent: 'center'
         , marginBottom: '24px',
         
         }}>
          <GoogleLogin1 
           sx={{ 
            display: 'block', // Para centrar el botón
            backgroundColor: 'yellow', // Color de fondo del botón
            color: 'black',
            borderRadius: '20px',
            width: '300px', // Ancho
          }}  />
           </Box>

           <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 2,
            width: '100%',
          }}
        >
          <Typography
            component="h1"
            gutterBottom
            sx={{
              textAlign: 'center',
              color: 'white',
              fontFamily: 'Poppins',
              fontSize: '14px',
            }}
          >
            ¿Ya tenés una cuenta?
          </Typography>
          <Button
              component={RouterLink}
              to="/"
              sx={{
                color: '#FFD000',
                textDecoration: 'none',
                fontFamily: 'Poppins',
                fontSize: '14px',
                textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
              }}
            >
              Ingresar
            </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registro;