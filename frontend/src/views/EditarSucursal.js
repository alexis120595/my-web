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
    <Container
    sx={{width:'549px',
      height:'1040px',
      backgroundColor: '#504D4D', 
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mb: 5,
    }}>
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom sx={{mr:27,
        fontFamily:'Poppins',
        fontSize:'24px',
        marginBottom:'24px',
      }}>
          Editar sucursal
        </Typography>
        <Typography gutterBottom sx={{mr:7,
         fontFamily:'Poppins',
         fontSize:'16px',
      }}>
          Modifica el nombre con el cual identificaras a 
        </Typography>
        <Typography gutterBottom sx={{mr:35,
        fontFamily:'Poppins',
        fontSize:'16px',
      }}>
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
              mb: 5,
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes redondeados
                backgroundColor: 'white', // Fondo blanco
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', // Aplica la fuente Poppins
                fontSize: '14px',      // Tamaño de fuente 14px
                color: '#666666',      // Color del label
              },
            }}
          />

          <Typography variant="h4" gutterBottom
          sx={{
            fontFamily:'Poppins',
            fontSize:'20px',
            marginBottom:'24px',
            mr:24,
          }}>
            Modificar ubicacion
          </Typography>
          <Typography gutterBottom
           sx={{
            fontFamily:'Poppins',
            fontSize:'16px',
            
            mr:11,
          }}>
            Modifica la direccion de tu sucursal para 
          </Typography>
          <Typography gutterBottom 
           sx={{
            fontFamily:'Poppins',
            fontSize:'16px',
            
            mr:25,
          }}>
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
           
              mb: 5,
              width: '360px',
              height: '50px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes redondeados
                backgroundColor: 'white', // Fondo blanco
              },
              '& .MuiInputLabel-root': {
                fontFamily: 'Poppins', // Aplica la fuente Poppins
                fontSize: '14px',      // Tamaño de fuente 14px
                color: '#666666',      // Color del label
              },
            }}
          />
          <Box display="flex" justifyContent="center">
            <Mapa onLocationSelect={handleLocationSelect} />
          </Box>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{
              mt: 3,
              borderRadius: '30px',
              backgroundColor: '#FFD000',
              color: 'black',
              width: '360px',
              height: '43px',
              mr: 1,
              mb: 4,
              '&:hover': {
                backgroundColor: 'gray', // Color de fondo al hacer hover
              },
            }}
          >
          <Typography
              sx={{
                fontFamily: 'Poppins', // Aplica la fuente Poppins
                fontSize: '14px', // Tamaño de fuente 14px
                color: 'black', // Asegura que el color del texto sea consistente
                textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
              }}
            >
              Guardar cambios
            </Typography>
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default EditarSucursal;