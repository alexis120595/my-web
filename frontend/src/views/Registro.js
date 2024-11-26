import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GoogleLogin1 from '../components/GoogleLogin1';

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
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
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
            sx={{ 
              width:"300px",
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
            sx={{ 
              width:"300px",
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
            sx={{ 
              width:"300px",
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
          <Button type="submit" variant="contained" color="primary" onClick={handleSubmit} fullWidth   sx={{ 
              mb:2,
              mt: 2, // Margen inferior
              backgroundColor: 'yellow', // Color de fondo del botón
              color: 'black', // Color del texto
              borderRadius: '25px', // Bordes redondeados
              display: 'block', // Para centrar el botón
               // M
               ml: 25, // Margen izquierdo
              width: '150px', // Ancho del botón ajustado al contenido
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
              }
            }}>
            Registrarme
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

<Typography variant="h6" component="h1" gutterBottom  sx={{ color: 'white', mt:2}}>
          ¿Ya tenés una cuenta?
        </Typography>
      </Box>
    </Container>
  );
};

export default Registro;