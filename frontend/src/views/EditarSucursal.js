// # Este archivo define el componente EditarSucursal para editar la información de una sucursal existente.
// # Se obtienen los datos (nombre, ubicación, etc.) desde la API, se permiten modificaciones, y luego se hace un PUT.
// # Al actualizar con éxito, se redirige a la lista de sucursales. También integra un componente Mapa (Mapa.js) para asignar la ubicación.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Button, Typography } from '@mui/material';
import Mapa from '../components/Mapa';
import { useParams, useNavigate } from 'react-router-dom';

const EditarSucursal = () => {
  // # useParams para obtener el ID de la sucursal desde la URL
  const { id } = useParams();
  // # useNavigate para redirigir después de guardar cambios
  const navigate = useNavigate();

  // # Estados locales: nombre, ubicacion, y empresaId
  const [nombre, setNombre] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [empresaId, setEmpresaId] = useState(null);

  // # Estados para manejar mensajes de éxito o error
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  // # Al montar, obtiene el 'empresaId' almacenado en localStorage y carga datos de la sucursal
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

  // # handleActualizarSucursal: arma el form con los datos, hace PUT y navega si hay éxito
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

  // # handleLocationSelect: recibe la dirección desde el componente Mapa y la setea en ubicacion
  const handleLocationSelect = (address) => {
    setUbicacion(address);
  };

  // # Render principal: contenedor con formulario para editar nombre y ubicación, y un componente Mapa
  return (
    <Container
      sx={{
        width: { xs: '360px', sm: '549px' },
        height: '1040px',
        backgroundColor: '#504D4D',
        borderRadius: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 5
      }}
    >
      <Box mt={5} textAlign="center">
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            mr: 27,
            fontFamily: 'Poppins',
            fontSize: '24px',
            marginBottom: '24px',
            whiteSpace: 'nowrap'
          }}
        >
          Editar sucursal
        </Typography>
        <Typography
          gutterBottom
          sx={{
            mr: 7,
            fontFamily: 'Poppins',
            fontSize: '16px'
          }}
        >
          Modifica el nombre con el cual identificaras a
        </Typography>
        <Typography
          gutterBottom
          sx={{
            mr: 35,
            fontFamily: 'Poppins',
            fontSize: '16px'
          }}
        >
          la sucursal
        </Typography>
        <form onSubmit={handleActualizarSucursal}>
           {/* # Campo de texto para modificar el nombre de la sucursal */}
          <TextField
            label="Modificar nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{
              mt: 2,
              mb: 5,
              height: '50px',
              width: { xs: '340px', sm: '360px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white'
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                color: '#666666'
              }
            }}
          />
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontSize: '20px',
              marginBottom: '24px',
              mr: 24
            }}
          >
            Modificar ubicacion
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              mr: 11
            }}
          >
            Modifica la direccion de tu sucursal para
          </Typography>
          <Typography
            gutterBottom
            sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
              mr: 25
            }}
          >
            visualizarla en el mapa
          </Typography>
            {/* # Campo de texto para modificar la dirección de la sucursal */}
          <TextField
            label="Dirección"
            variant="outlined"
            fullWidth
            margin="normal"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            sx={{
              mb: 5,
              width: { xs: '340px', sm: '360px' },
              height: '50px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white'
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins',
                fontSize: '14px',
                color: '#666666'
              }
            }}
          />
           {/* # Componente Mapa para seleccionar la ubicación */}
          <Box display="flex" justifyContent="center">
            <Mapa onLocationSelect={handleLocationSelect} />
          </Box>
          {/* # Botón para guardar los cambios */}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 3,
              borderRadius: '30px',
              backgroundColor: '#FFD000',
              color: 'black',
              width: { xs: '340px', sm: '360px' },
              height: '43px',
              mr: 1,
              mb: 4,
              '&:hover': {
                backgroundColor: 'gray'
              }
            }}
          >
            <Typography
              sx={{
                fontFamily: 'Poppins',
                fontSize: '14px',
                color: 'black',
                textTransform: 'none'
              }}
            >
              Guardar cambios
            </Typography>
          </Button>
        </form>
        {/* # Mensajes de éxito o error */}
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default EditarSucursal;