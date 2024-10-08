import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const   Personal = () => {
  const [barberos, setBarberos] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchBarberos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/barberos');
        setBarberos(response.data);
      } catch (error) {
        console.error('Error fetching barberos:', error);
      }
    };

    fetchBarberos();
  }, []);

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
          {barberos.map((barberos) => (
            <ListItem key={barberos.id}
            sx={{ 
              border: '1px solid #ccc', 
              borderRadius: '8px', 
              mb: 2, 
              padding: 2,
              width: '400px'
            }}>
              <ListItemText primary={barberos.nombre} />
            </ListItem>
          ))}
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