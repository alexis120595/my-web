import React, { useContext } from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext'; // Importar el contexto del usuario

const Opciones = () => {
  const { userEmail } = useContext(UserContext); // Usar el contexto del usuario

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center" sx={{ color: 'black' }}>
        {userEmail && (
          <Typography variant="h6" gutterBottom>
            Bienvenido, {userEmail}
          </Typography>
        )}
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
