// # Vista que maneja el proceso de registro de un nuevo usuario, utilizando axios para enviar los datos al servidor.
// # Contiene validaciones para email, contraseña y confirmación de contraseña, y emplea Material UI para la interfaz.
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment, Link } from '@mui/material';
import axios from 'axios';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';

const Registro = () => {
    // # Maneja el estado del formulario, incluyendo email y contraseña
  const [form, setForm] = useState({

    email: '',
    password: '',
   
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
   // # Controla el enfoque de cada campo (email, contraseña) para ajustar el label
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
 // # Actualiza el estado cuando cambian los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };
 // # Envía los datos de registro al servidor y maneja la respuesta
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
      width: { xs: '100%', sm: '360px' },
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, 
      marginTop: { xs: 2, sm: 5 }, 
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
         {/* # Formulario para ingresar datos de registro */}
        <form onSubmit={handleSubmit}>
        {/* # Campo para el email */}
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
              shrink: true, 
            }}
            sx={{
              height: '50px', 
              width: '361px',
              marginBottom: '24px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                color: 'black', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }}
          />
            {/* # Campo para la contraseña */}
         <TextField
            label={isPasswordFocused ? '' : 'Ingresar contraseña'}
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            onFocus={() => setIsPasswordFocused(true)} 
            onBlur={() => setIsPasswordFocused(false)}
            fullWidth
            margin="normal"
            required
            size="small" 
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
              shrink: true, 
            }}
            sx={{
              height: '50px', 
              width: '361px',
              marginBottom: '24px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                color: 'black', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }}
          />
          {/* # Campo para confirmar contraseña */}
          <TextField
            label={isConfirmPasswordFocused ? '' : 'Repetir contraseña'}
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            onFocus={() => setIsConfirmPasswordFocused(true)} 
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
              shrink: true, 
            }}
            sx={{
              height: '50px', 
              width: '361px',
              marginBottom: '48px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                color: 'black', 
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: 'white', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', 
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }}
          />
      
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">{success}</Typography>}
          {/* # Botón de registro */}
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

              backgroundColor: '#FFD000', 
              color: 'black', 
              borderRadius: '30px', 
              display: 'block', 
              fontFamily: 'Poppins', 
              fontSize: '16px', 
              textTransform: 'none', 
             
            }}>
            Registrarme
          </Button>
          </Box>
        </form>
          {/* # Sección para mostrar otras opciones de inicio de sesión, p. ej. con Google */}
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
            display: 'block', 
            backgroundColor: 'yellow', 
            color: 'black',
            borderRadius: '20px',
            width: '300px', 
          }}  />
           </Box>
             {/* # Sección para redirigir al usuario al inicio de sesión si ya tiene cuenta */}
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
                textTransform: 'none', 
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