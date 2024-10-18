import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Mapa from '../components/Mapa';


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

  const handleLocationSelect = (address) => {
    setUbicacion(address);
  };

  return (
    <Container >
    <Box mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom sx={{mr:7}}>
        Añadir sucursal
      </Typography>
      <Typography  gutterBottom sx={{ml:4}}>
        Ingresa el nombre con el cual identificaras a 
      </Typography>
      <Typography  gutterBottom sx={{mr:26}}>
        la sucursal
      </Typography>
      <form onSubmit={handleCrearSucursal}>
        <TextField
          label="Ingresar nombre"
          variant="outlined"
          fullWidth
          margin="normal"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            width: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes redondeados
            },
          }}
        />

<Typography variant="h4" gutterBottom>
        Ingresar ubicacion
      </Typography>
      <Typography  gutterBottom >
        Ingresala direccion de tu sucursal para 
      </Typography>
      <Typography  gutterBottom sx={{mr:15}}>
        visualizarla en el mapa
      </Typography>
        <TextField
          label="Dirección"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          sx={{
            mt: 2,
            mb: 2,
            width: '300px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes redondeados
            },
          }}
        />
<Box display="flex" justifyContent="center" >
        <Mapa onLocationSelect={handleLocationSelect}  />
        </Box>
        <TextField
          label="ID de Empresa"
          type="number" // Asegurar que solo se acepten números
          variant="outlined"
          fullWidth
          margin="normal"
          value={empresa}
          onChange={(e) => setEmpresa(e.target.value)}
        />
          <Button variant="contained" color="primary" onClick={handleCrearSucursal}
           sx={{ mt: 2, borderRadius: '25px', backgroundColor: 'yellow',  color: 'black', width: '300px', mr: 1, mb:4 }}>
            Guardar
          </Button>

        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        </Box>
      
    </Container>
  );
};

export default CrearSucursal;