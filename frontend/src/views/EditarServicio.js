import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const EditarServicio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [modalidad, setModalidad] = useState('');

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
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '14px', // Tamaño de la fuente
                  color: '#666666', // Color del texto
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
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '14px', // Tamaño de la fuente
                  color: '#666666', // Color del texto
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
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '14px', // Tamaño de la fuente
                  color: '#666666', // Color del texto
                },
              },
              }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{  
                borderRadius: '25px', width:'361px', height:'50px', color:'black', backgroundColor:'#FFD000',
                '&:hover': {
                  backgroundColor: '#FFD000', // Mantiene el mismo color al pasar el cursor
                },
                '& .MuiOutlinedInput-root': {
                  '& input': {
                    fontFamily: 'Poppins', // Aplica la fuente Poppins
                    fontSize: '16px', // Tamaño de la fuente
                    color: '#666666', // Color del texto
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
