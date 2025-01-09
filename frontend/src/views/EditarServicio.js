// # Este archivo define el componente EditarServicio, el cual permite editar los datos de un servicio existente.
// # Utiliza React Router (useParams para obtener el ID y useNavigate para redirigir tras guardar cambios).
// # Maneja estados locales para precio, duración y modalidad, y llama a la API para cargar y actualizar la información.
// # Al enviar, hace un PUT al endpoint correspondiente para guardar los cambios y luego redirige a 'servicios-disponibles'.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditarServicio = () => {
  // # useParams obtiene el ID del servicio desde la ruta.
  const { id } = useParams();
  // # useNavigate permite redirigir luego de editar con éxito.
  const navigate = useNavigate();
// # Estados locales para almacenar los datos del servicio.
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [modalidad, setModalidad] = useState('');
// # Al montar, obtiene la información del servicio usando el ID y setea los estados iniciales.
  useEffect(() => {
    const fetchServicio = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/servicios/${id}`);
        const servicio = response.data;
        setPrecio(servicio.precio);
        setDuracion(servicio.duracion);
        setModalidad(servicio.modalidad);
      } catch (error) {
        console.error('Error fetching servicio:', error);
      }
    };

    fetchServicio();
  }, [id]);

  // # handleSubmit envía los datos actualizados al backend mediante un PUT.
  // # Convierte el precio a entero y envía la nueva información al endpoint /servicios/:id.
  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedServicio = {
      precio: parseInt(precio, 10),
      duracion,
      modalidad,
    };

    try {
      await axios.put(`http://localhost:8000/servicios/${id}`, updatedServicio);
      alert('Servicio actualizado correctamente');
      navigate('/servicios-disponibles');
    } catch (error) {
      console.error('Error updating servicio:', error);
      alert('Error al actualizar el servicio');
    }
  };
  // # Renderiza un contenedor con campos de texto para editar precio, duración y modalidad, y un botón para guardar cambios.
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom sx={{ mr: 22, fontFamily:'Poppins', fontSize:'24px',
          marginBottom: '24px',
         }}>
          Editar Servicio
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Precio"
            type="number"
            variant="outlined"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            fullWidth
            sx={{ 
                borderRadius: '25px', width:'362px', height:'50px',
              backgroundColor:'white',
              marginBottom: '24px',
              '& .MuiOutlinedInput-root': {
                '& input': {
                  fontFamily: 'Poppins', 
                  fontSize: '14px', 
                  color: '#666666', 
                },
              },
              }}
          
          />
          <TextField
            label="Duración"
            type="text"
            variant="outlined"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            fullWidth
            sx={{ 
              marginBottom: '24px',
              borderRadius: '25px', width:'362px', height:'50px',
              backgroundColor:'white',
              '& .MuiOutlinedInput-root': {
                '& input': {
                  fontFamily: 'Poppins', 
                  fontSize: '14px', 
                  color: '#666666', 
                },
              },  
            }}
          />
          <TextField
            label="Modalidad"
            type="text"
            variant="outlined"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            fullWidth
            sx={{ 
              marginBottom: '32px', 
                 borderRadius: '25px', width:'362px', height:'50px',
              backgroundColor:'white',
              '& .MuiOutlinedInput-root': {
                '& input': {
                  fontFamily: 'Poppins', 
                  fontSize: '14px', 
                  color: '#666666', 
                },
              },
              }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{  
                borderRadius: '25px', width:'361px', height:'50px', color:'black', backgroundColor:'#FFD000',
                '&:hover': {
                  backgroundColor: '#FFD000', 
                },
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    fontFamily: 'Poppins', 
                    fontSize: '16px', 
                    color: '#666666', 
                  },
                },
                }}>
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditarServicio;
