import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText} from '@mui/material';
import axios from 'axios';


const Clientes = () => {
  const [registro, setRegistro] = useState([]);
    

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await axios.get('http://localhost:8000/registro');
        setRegistro(response.data);
      } catch (error) {
        console.error('Error fetching registro:', error);
      }
    };

    fetchRegistro();
  }, []);



  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Clientes
        </Typography>
        <List>
          {registro.map((registro) => (
            <ListItem key={registro.id}>
              <ListItemText primary={registro.nombre} />
            </ListItem>
          ))}
        </List>
   
      </Box>
    </Container>
  );
};

export default Clientes;