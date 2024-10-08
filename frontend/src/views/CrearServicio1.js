import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearServicio1 = () => {
  const [nombre, setNombre] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCrearServicio = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      empresa_id: parseInt(empresaId, 10), // Convertir sucursalId a número
      precio,
      duracion,
      descripcion
    };
    console.log('Formulario enviado:', form); // Añadir console.log para ver el formulario enviado
    try {
      const response = await axios.post('http://localhost:8000/servicios', form);
      console.log('Respuesta del servidor:', response.data); // Añadir console.log para ver la respuesta del servidor
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear el servicio
      setNombre('');
      setEmpresaId('');
      setPrecio('');
      setDuracion('');
      setDescripcion('');
      navigate('/crear-horarios');
    } catch (error) {
      console.error('Error al crear el servicio:', error.response || error.message); // Añadir console.log para ver el error
      setError(error.response?.data?.message || 'Error al crear el servicio');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Crear Servicio
        </Typography>
        <form onSubmit={handleCrearServicio}>
          <TextField
            label="Nombre del Servicio"
            variant="outlined"
           
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="ID de la empresa"
            type="number" // Asegurar que solo se acepten números
            variant="outlined"
            
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
          
            sx={{ 
              mb: 2,
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
            label="precio del Servicio"
            variant="outlined"
           
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="Duracion del Servicio"
            variant="outlined"
           
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="Descripcion del Servicio"
            variant="outlined"
           
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            sx={{ 
              mb: 2,
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
          <Button type="submit" variant="contained" color="primary"
            sx={{ 
              mb:2,
              mt: 2, // Margen inferior
              backgroundColor: 'yellow', // Color de fondo del botón
              color: 'black', // Color del texto
              borderRadius: '25px', // Bordes redondeados
              display: 'block', // Para centrar el botón
               // M
               ml: 15, // Margen izquierdo
              width: '150px', // Ancho del botón ajustado al contenido
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
              }
            }}
          >
            Añadir
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearServicio1;