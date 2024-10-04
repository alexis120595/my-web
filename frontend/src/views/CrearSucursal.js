import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';


const CrearSucursal = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleCrearSucursal = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      ubicacion  ,
      empresa_id: parseInt(empresa, 10) 
    };
    console.log('Formulario enviado:', form); 
    try {
      const response = await axios.post('http://localhost:8000/sucursal', form);
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear la sucursal
      setNombre('');
      setUbicacion('');
      setEmpresa('');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al crear la sucursal');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
    <Box mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom>
        Crear Sucursal
      </Typography>
      <form onSubmit={handleCrearSucursal}>
        <TextField
          label="Nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          label="Dirección"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
        <TextField
          label="ID de Empresa"
          type="number" // Asegurar que solo se acepten números
          variant="outlined"
          fullWidth
          margin="normal"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
          <Button variant="contained" color="primary" onClick={handleCrearSucursal}>
            Crear Sucursal
          </Button>

        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        </Box>
      
    </Container>
  );
};

export default CrearSucursal;