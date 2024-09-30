import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';


const  CrearServicio1 = () => {
  const [servicios, setServicios] = useState([]);

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

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Crear Servicio
        </Typography>
        <List>
          {servicios.map((servicio) => (
            <ListItem key={servicio.id}>
              <ListItemText primary={servicio.nombre} secondary={servicio.descripcion} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default CrearServicio1;