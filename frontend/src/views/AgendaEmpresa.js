import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AgendaEmpresa = () => {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    const fetchAgenda = async () => {
      try {
        const response = await axios.get('http://localhost:8000/agenda');
        setAgenda(response.data);
      } catch (error) {
        console.error('Error fetching agenda:', error);
      }
    };

    fetchAgenda();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Agenda de la Empresa
        </Typography>
        <List>
          {agenda.map((item) => (
            <ListItem key={item.id}>
              <ListItemText primary={item.nombre} secondary={item.fecha} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default AgendaEmpresa;