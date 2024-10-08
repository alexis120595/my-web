import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
 

const Opciones = () => {
   

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center" sx={{ color: 'black' }}>
        
        
        <Typography variant="h4" gutterBottom sx={{ color: 'black' }}>
          ¿Qué deseas hacer?
        </Typography>
        <Button
          component={Link}
          to="/buscar-empresa"
          variant="contained"
          color="primary"
          size="small" // Tamaño pequeño
          sx={{ 
            width: "300px",
            borderRadius: '20px', // Bordes redondeados
            mb: 4,
          }}
        >
          Quiero reservar un turno
        </Button>
        <Button
          component={Link}
          to="/crear-servicio"
          variant="outlined"
          color="secondary"
          size="small"
          sx={{ 
            width: "300px",
            borderRadius: '20px', // Bordes redondeados
          }}
        >
          Quiero prestar un servicio
        </Button>
      </Box>
    </Container>
  );
};

export default Opciones;
