import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import SubidaImagenes from '../components/SubidaImagenes';
import axios from 'axios';
import { set } from 'date-fns';


const CrearEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [serviciosId, setServiciosId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleCrearEmpleado = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      apellido,
      servicios_id: parseInt(serviciosId, 10), // Convertir servicioId a número
      empresa_id: parseInt(empresaId, 10),
      imagen_url: imagenUrl,
    };
    console.log('Formulario enviado:', form); // Añadir console.log para ver el formulario enviado
    try {
      const response = await axios.post('http://localhost:8000/barberos', form);
      console.log('Respuesta del servidor:', response.data); // Añadir console.log para ver la respuesta del servidor
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear el empleado
      setNombre('');
      setApellido('');
      setServiciosId('');
      setEmpresaId('');
      setImagenUrl('');
    } catch (error) {
      console.error('Error al crear el empleado:', error.response || error.message); // Añadir console.log para ver el error
      setError(error.response?.data?.message || 'Error al crear el empleado');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Crear Empleado
        </Typography>
        <form onSubmit={handleCrearEmpleado}>
          <SubidaImagenes onImageUpload={setImagenUrl} />
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
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
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
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
            label="ID del Servicio"
            type="number" // Asegurar que solo se acepten números
            variant="outlined"
            fullWidth
            margin="normal"
            value={serviciosId}
            onChange={(e) => setServiciosId(e.target.value)}
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
            label="ID de la Empresa"
            type="number" // Asegurar que solo se acepten números
            variant="outlined"
            fullWidth
            margin="normal"
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
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
          <Button type="submit" variant="contained" color="primary"
           sx={{ 
            mb:2,
            mt: 2, // Margen inferior
            backgroundColor: 'yellow', // Color de fondo del botón
            color: 'black', // Color del texto
            borderRadius: '25px', // Bordes redondeados
            display: 'block', // Para centrar el botón
             // M
             ml: 22, // Margen izquierdo
            width: '200px', // Ancho del botón ajustado al contenido
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
            }
          }}>
            Crear Empleado
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearEmpleado;