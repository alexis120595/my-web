import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const   Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get('http://localhost:8000/sucursales');
        setSucursales(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    fetchSucursales();
  }, []);

  const handleAddSucursalClick = () => {
    navigate('/crear-sucursal');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Sucursales
        </Typography>
        <List>
          {sucursales.map((sucursales) => (
            <ListItem key={sucursales.id}>
              <ListItemText primary={sucursales.nombre}  />
            </ListItem>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleAddSucursalClick}
        >
          Añadir Sucursal
        </Button>
      </Box>
    </Container>
  );
};

export default Sucursales;