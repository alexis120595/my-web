import React from 'react';
import { Button, Container, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Opciones = () => {
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          ¿Qué deseas hacer?
        </Typography>
        <Button
          component={Link}
          to="/buscar-empresa"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Quiero reservar un turno
        </Button>
        <Button
          component={Link}
          to="/crear-servicio"
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Quiero prestar un servicio
        </Button>
      </Box>
    </Container>
  );
};

export default Opciones;
