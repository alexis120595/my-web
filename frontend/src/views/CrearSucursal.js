import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Mapa from '../components/Mapa';


const CrearSucursal = () => {
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Supongamos que obtienes el ID de la empresa desde el almacenamiento local o algún contexto
    const storedEmpresaId = localStorage.getItem('empresaId');
    if (storedEmpresaId) {
      setEmpresaId(parseInt(storedEmpresaId, 10));
    }
  }, []);

  const handleCrearSucursal = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      ubicacion  ,
      empresa_id: empresaId
    };
    console.log('Formulario enviado:', form); 
    try {
      const response = await axios.post('http://localhost:8000/sucursales', form);
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear la sucursal
      setNombre('');
      setUbicacion('');
      
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
<Box display="flex" justifyContent="center" sx={{width:"300px",ml:53}} >
        <Mapa onLocationSelect={handleLocationSelect}  />
        </Box>
       
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