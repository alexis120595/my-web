import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Opciones = () => {
  return (
    <Container
      sx={{
        width: { xs: '100%', sm: '360px' }, // Ancho 100% en pantallas pequeñas, 360px en pantallas medianas y grandes
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 0 }, // Padding 2 en pantallas pequeñas, 0 en pantallas medianas y grandes
        marginTop: { xs: 2, sm: 5 }, // Margen superior 2 en pantallas pequeñas, 5 en pantallas medianas y grandes
      }}
    >
      <Box textAlign="center" sx={{ color: 'black', width: '100%' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'white', // Cambiar el color del texto a blanco
            marginBottom: '44px', // Añadir margen inferior
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '24px', // Tamaño de fuente 24px
            textAlign: 'left', // Alinear el texto a la izquierda
          }}
        >
          ¿Qué deseas hacer?
        </Typography>
        <Button
          component={Link}
          to="/buscar-empresa"
          variant="contained"
          size="small"
          sx={{
            height: '43px', // Altura del botón
            width: '100%', // Ancho 100% para que se ajuste al contenedor
            maxWidth: '360px', // Ancho máximo 360px
            borderRadius: '30px', // Bordes redondeados
            backgroundColor: '#FFD000', // Cambiar el color de fondo a amarillo
            color: 'black', // Cambiar el color del texto a negro para mejor contraste
            borderColor: 'black',
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
            '&:hover': {
              backgroundColor: '#FFD700', // Cambiar el color de fondo al pasar el cursor
              borderColor: 'black',
            },
            marginBottom: 2, // Margen inferior para separar los botones
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
            width: '100%', // Ancho 100% para que se ajuste al contenedor
            maxWidth: '360px', // Ancho máximo 360px
            borderRadius: '30px', // Bordes redondeados
            backgroundColor: '#FFD000', // Cambiar el color de fondo a amarillo
            color: 'black', // Cambiar el color del texto a negro para mejor contraste
            borderColor: 'black',
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '14px', // Tamaño de fuente 14px
            textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
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
