import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
 

const Opciones = () => {
   

  return (
    <Container
    sx={{
      width:"360px",
      height:"214px",
      
      
      }}>
      <Box mt={5} textAlign="center" sx={{ color: 'black' }}>
        
        
        <Typography variant="h4" gutterBottom 
        sx={{ color: 'white', // Cambiar el color del texto a blanco
          marginBottom: '44px', // Añadir margen inferior
         }}>
          ¿Qué deseas hacer?
        </Typography>
        <Button
          component={Link}
          to="/buscar-empresa"
          variant="contained"
         
          size="small" // Tamaño pequeño
          sx={{ 
            height: '43px', // Altura del botón
            width: "360px",
            borderRadius: '30px', // Bordes redondeados
            marginBottom: '24px', // Margen inferior
            
            backgroundColor: '#FFD000', // Cambiar el color de fondo a amarillo
            color: 'black', // Cambiar el color del texto a negro para mejor contraste
            '&:hover': {
              backgroundColor: '#FFD700', // Cambiar el color de fondo al pasar el cursor
            },
          }}
        >
          Quiero reservar un turno
        </Button>
        <Button
          component={Link}
          to="/crear-servicio"
          variant="outlined"
          
          size="small"
          sx={{ 
            height: '43px', // Altura del botón
            width: "360px",
            borderRadius: '30px', // Bordes redondeados
            backgroundColor: '#FFD000', // Cambiar el color de fondo a amarillo
            color: 'black', // Cambiar el color del texto a negro para mejor contraste
            borderColor: 'black',
            '&:hover': {
              backgroundColor: '#FFD700', // Cambiar el color de fondo al pasar el cursor
              borderColor: 'black',
            },
          }}
        >
          Quiero prestar un servicio
        </Button>
      </Box>
    </Container>
  );
};

export default Opciones;
