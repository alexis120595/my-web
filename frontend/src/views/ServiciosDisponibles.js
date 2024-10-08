import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiciosDisponibles = () => {
  const [servicios, setServicios] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/servicios');
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  const handleAddServiceClick = () => {
    navigate('/crear-servicio1');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Servicios Disponibles
        </Typography>
        <List>
          {servicios.map((servicio) => (
            <ListItem key={servicio.id}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              mb: 2, 
              padding: 2,
              width: '400px'
            }}>
              <ListItemText primary={servicio.nombre} secondary={servicio.descripcion} />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          
          sx={{ mt: 2, borderRadius: '25px', ml: -50, backgroundColor: 'yellow',  color: 'black'   }}
          onClick={handleAddServiceClick}
        >
          Añadir Servicio
        </Button>
      </Box>
    </Container>
  );
};

export default ServiciosDisponibles;