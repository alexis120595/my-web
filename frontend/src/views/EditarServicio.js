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
        <Typography variant="h4" gutterBottom sx={{ mr: 22,  }}>
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
            sx={{ mb: 2,  border: '1px solid #ccc',
                borderRadius: '10px', width:'400px' }}
          
          />
          <TextField
            label="Duración"
            type="text"
            variant="outlined"
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            fullWidth
            sx={{ mb: 2,  border: '1px solid #ccc',
                borderRadius: '10px', width:'400px'}}
          />
          <TextField
            label="Modalidad"
            type="text"
            variant="outlined"
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            fullWidth
            sx={{ mb: 2,  border: '1px solid #ccc',
                borderRadius: '10px', width:'400px' }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ mt: 2,  border: '1px solid #ccc',
                borderRadius: '10px', width:'400px', color:'black', backgroundColor:'yellow'}}>
            Guardar Cambios
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default EditarServicio;
