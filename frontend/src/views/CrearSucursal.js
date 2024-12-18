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
    <Container
    sx={{
      width: { xs: '360px', sm: '549px' },
      height:'1040px',
      backgroundColor: '#504D4D', 
      borderRadius: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      mb: 5,
      
    }}
    >
    <Box mt={5} textAlign="center">
      <Typography variant="h4" gutterBottom sx={{mr:24,
        fontFamily:'Poppins',
        fontSize:'24px',
        marginBottom:'24px',
      }}>
        Añadir sucursal
      </Typography>
      <Typography  gutterBottom sx={{mr:7,
         fontFamily:'Poppins',
         fontSize:'16px',
      }}>
        Ingresa el nombre con el cual identificaras a 
      </Typography>
      <Typography  gutterBottom sx={{mr:35,
        fontFamily:'Poppins',
        fontSize:'16px',
      }}>
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
            mb: 5,
            height: '50px',
            width: { xs: '330px', sm: '360px' },
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
}}
>
        Ingresar ubicacion
      </Typography>
      <Typography  gutterBottom 
      sx={{
        fontFamily:'Poppins',
        fontSize:'16px',
        
        mr:11,
      }}>
        Ingresa la direccion de tu sucursal para 
      </Typography>
      <Typography  gutterBottom sx={{mr:24,
         fontFamily:'Poppins',
         fontSize:'16px',
         mb:2,

      }}>
        visualizarla en el mapa
      </Typography>
        <TextField
          label="Ingresar dirección"
          variant="outlined"
          fullWidth
          margin="normal"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
          sx={{
           
            mb: 5,
            width: { xs: '330px', sm: '360px' },
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
<Box display="flex" justifyContent="center"  >
        <Mapa onLocationSelect={handleLocationSelect}  />
        </Box>
       
        <Button
  variant="contained"
  color="primary"
  onClick={handleCrearSucursal}
  sx={{
    mt: 3,
    borderRadius: '30px',
    backgroundColor: '#FFD000',
    color: 'black',
    width: { xs: '330px', sm: '360px' },
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
    Guardar
  </Typography>
</Button>

        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        </Box>
      
    </Container>
  );
};

export default CrearSucursal;