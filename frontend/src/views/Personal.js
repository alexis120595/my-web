import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, Avatar, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'; 
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';


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
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', ml: 2 }}>
          Personal
        </Typography>
        <Box display="flex" justifyContent="center" mb={2}>
          <SearchBar />
        </Box>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', ml: 2 }}>
          Profesionales disponibles
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
                  <Avatar
                alt={`${barbero.nombre} ${barbero.apellido}`}
                src={barbero.imagen_url}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
                <ListItemText primary={`${barbero.nombre} ${barbero.apellido}`} secondary={barbero.servicios_id} />
                <IconButton edge="end" aria-label="edit" onClick={() => (barbero.id)}
                   sx={{
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                <EditIcon  sx={{ color: 'black' }} />
              </IconButton>
              <IconButton edge="end" aria-label="edit" onClick={() => (barbero.id)}
                 sx={{
                  ml: 2,
                  backgroundColor: 'yellow',
                  borderRadius: '50%',
                  padding: '10px',
                  '&:hover': {
                    backgroundColor: 'darkyellow',
                  },
                }}>
                <LinkIcon  sx={{ color: 'black' }} />
              </IconButton>
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
          sx={{ mt: 2, borderRadius: '25px', backgroundColor: 'yellow',  color: 'black', width: '300px', ml: -31 }}
          onClick={handleAddEmpleadoClick}
        >
          Añadir Personal
        </Button>
      </Box>
    </Container>
  );
};

export default Personal;