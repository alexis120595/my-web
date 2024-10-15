import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const   Personal = () => {
  const [barberos, setBarberos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const empresaId = localStorage.getItem('empresaId');
      if (empresaId) {
        fetchBarberos(empresaId);
      }
    }, []);
  
    const fetchBarberos = async (empresaId) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
        setBarberos(response.data);
      } catch (error) {
        console.error('Error fetching personal:', error);
      }
    };

  const handleAddEmpleadoClick = () => {
    navigate('/crear-empleado');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Personal
        </Typography>
        <List>
          {barberos.length > 0 ? (
            barberos.map((barbero) => (
              <ListItem
                key={barbero.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  mb: 2,
                  padding: 2,
                  width: '400px'
                }}
              >
                <ListItemText primary={`${barbero.nombre} ${barbero.apellido}`} secondary={barbero.servicios_id} />
              </ListItem>
            ))
          ) : (
            <Typography>No hay personal disponible para esta empresa.</Typography>
          )}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: '25px', backgroundColor: 'yellow',  color: 'black', width: '300px', ml: -20 }}
          onClick={handleAddEmpleadoClick}
        >
          Añadir Personal
        </Button>
      </Box>
    </Container>
  );
};

export default Personal;