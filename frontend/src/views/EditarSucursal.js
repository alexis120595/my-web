import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Mapa from '../components/Mapa';
import { useParams, useNavigate } from 'react-router-dom';

const EditarSucursal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [empresaId, setEmpresaId] = useState(null);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedEmpresaId = localStorage.getItem('empresaId');
    if (storedEmpresaId) {
      setEmpresaId(parseInt(storedEmpresaId, 10));
    }

    const fetchSucursal = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/sucursales/${id}`);
        const sucursal = response.data;
        setNombre(sucursal.nombre);
        setUbicacion(sucursal.ubicacion);
      } catch (error) {
        console.error('Error fetching sucursal:', error);
      }
    };

    fetchSucursal();
  }, [id]);

  const handleActualizarSucursal = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      ubicacion,
      empresa_id: empresaId
    };
    console.log('Formulario enviado:', form); 
    try {
      const response = await axios.put(`http://localhost:8000/sucursales/${id}`, form);
      setSuccess(response.data.message);
      setError(null);
      navigate('/sucursales');
    } catch (error) {
      setError(error.response?.data?.message || 'Error al actualizar la sucursal');
      setSuccess(null);
    }
  };

  const handleLocationSelect = (address) => {
    setUbicacion(address);
  };

  return (
    <Container>
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom sx={{ mr: 7 }}>
          Editar sucursal
        </Typography>
        <Typography gutterBottom sx={{ ml: 4 }}>
          Modifica el nombre con el cual identificaras a 
        </Typography>
        <Typography gutterBottom sx={{ mr: 26 }}>
          la sucursal
        </Typography>
        <form onSubmit={handleActualizarSucursal}>
          <TextField
            label="Modificar nombre"
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
            Modificar ubicacion
          </Typography>
          <Typography gutterBottom>
            Modifica la direccion de tu sucursal para 
          </Typography>
          <Typography gutterBottom sx={{ mr: 15 }}>
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
          <Box display="flex" justifyContent="center" sx={{ width: "300px", ml: 53 }}>
            <Mapa onLocationSelect={handleLocationSelect} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ mt: 2, borderRadius: '25px', backgroundColor: 'yellow', color: 'black', width: '300px', mr: 1, mb: 4 }}
          >
            Guardar Cambios
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default EditarSucursal;