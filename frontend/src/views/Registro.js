import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
      width:"362px",
      height:"529px",
      
      }}>
      <Box mt={5} textAlign="left">
        <Typography variant="h4" component="h1" gutterBottom
         sx={{
          textAlign: 'left',
          marginBottom: '24px', // Espacio entre el texto y el primer input
        }}
        >
          Registrarme
        </Typography>
        <form onSubmit={handleSubmit}>
      
          <TextField
            label="ingresar email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ width: 20, height: 20, color: 'black' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              marginBottom: '24px',
              height: '50px',
              width:"362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
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
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
              marginBottom: '24px',
              height: '50px',
              width:"362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
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
                color: 'black', // Color del label
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />
           <TextField
            label="repetir contraseña"
            name="password"
            type="password"
            
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
              marginBottom: '48px',
              height: '50px',
              width:"362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
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
                color: 'black', // Color del label
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
              borderRadius: '25px', // Bordes redondeados
              display: 'block', // Para centrar el botón
               // M
               // Margen izquierdo
              // Ancho del botón ajustado al contenido
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
              }
            }}>
            Registrarme
          </Button>
          </Box>
        </form>
        <Box 
        sx={{ 
          textAlign: 'center',  
          marginBottom: '24px' 
           }}>
          <p>O ingresar con</p>
        </Box>
        <Box 
        sx={{ display: 'flex',
         justifyContent: 'center'
         , marginBottom: '24px'
         }}>
          <GoogleLogin1 
           sx={{ 
             // Margen inferior
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

<Typography component="h1" gutterBottom  

sx={{ 
  textAlign: 'center',
  color: 'white',
  mt:2,
  height: '26 px',
  width:"163px",
  }}>
          ¿Ya tenés una cuenta?
        </Typography>
      </Box>
    </Container>
  );
};

export default Registro;