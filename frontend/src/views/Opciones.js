// # Vista que presenta opciones al usuario para reservar un turno o prestar un servicio.
import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Opciones = () => {
  return (
    <Container
      sx={{
        width: { xs: '100%', sm: '360px' }, 
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: { xs: 2, sm: 0 }, 
        marginTop: { xs: 2, sm: 5 }, 
      }}
    >
      <Box textAlign="center" sx={{ color: 'black', width: '100%' }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color: 'white', 
            marginBottom: '44px', 
            fontFamily: 'Poppins', 
            fontSize: '24px', 
            textAlign: 'left', 
          }}
        >
          ¿Qué deseas hacer?
        </Typography>
        {/* # Botón para reservar un turno */}
        <Button
          component={Link}
          to="/buscar-empresa"
          variant="contained"
          size="small"
          sx={{
            height: '43px', 
            width: '100%', 
            maxWidth: '360px', 
            borderRadius: '30px', 
            backgroundColor: '#FFD000', 
            color: 'black', 
            borderColor: 'black',
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            textTransform: 'none', 
            '&:hover': {
              backgroundColor: '#FFD700', 
              borderColor: 'black',
            },
            marginBottom: 2, 
          }}
        >
          Quiero reservar un turno
        </Button>
        {/* # Botón para prestar un servicio */}
        <Button
          component={Link}
          to="/crear-servicio"
          variant="outlined"
          size="small"
          sx={{
            height: '43px', 
            width: '100%',
            maxWidth: '360px', 
            borderRadius: '30px', 
            backgroundColor: '#FFD000', 
            color: 'black', 
            borderColor: 'black',
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            textTransform: 'none', 
            '&:hover': {
              backgroundColor: '#FFD700', 
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
