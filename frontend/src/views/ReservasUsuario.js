import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText,Container,ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ReservasUsuario = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Obtener el ID del usuario del almacenamiento local
    if (userId) {
      fetchReservasUsuario(userId);
    } else {
      setError('No se encontró el ID del usuario en el almacenamiento local');
    }
  }, []);

  const fetchReservasUsuario = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/reservas/usuario/${userId}`);
      setReservas(response.data);
    } catch (error) {
      setError('Error al obtener las reservas del usuario');
      console.error('Error fetching user reservations:', error);
    }
  };

  const handleReservaClick = (reservaId) => {
    navigate(`/detalle/${reservaId}`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom>
          Mis Turnos
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <List>
          {reservas.map((reserva) => (
            <ButtonBase
              key={reserva.id}
              onClick={() => handleReservaClick(reserva.id)}
              sx={{ width: '100%', display: 'block', textAlign: 'left' }}
            >
              <ListItem
                key={reserva.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  mb: 2,
                  padding: 2,
                  width: '400px',
                  ml: 16,
                }}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={` ${reserva.servicio.nombre || 'N/A'}  ${reserva.servicio.duracion || 'N/A'}`}
                    secondary={`$ ${reserva.servicio.precio || 'N/A'}`} 
                    
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 100,
                      height: 50,
                      borderRadius: '20px',
                      backgroundColor: 'lightgreen',
                      color: 'white',
                    }}
                  >
                    <Typography variant="body2" color="textSecondary">
                      {reserva.fecha} 
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                       {reserva.horario.hora}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            </ButtonBase>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default ReservasUsuario;