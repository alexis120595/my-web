import React, { useState } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearServicio1 = () => {
  const [nombre, setNombre] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCrearServicio = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      empresa_id: parseInt(empresaId, 10) // Convertir sucursalId a número
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
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="ID de la empresa"
            type="number" // Asegurar que solo se acepten números
            variant="outlined"
            fullWidth
            margin="normal"
            value={empresaId}
            onChange={(e) => setEmpresaId(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">
            Crear Servicio
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearServicio1;