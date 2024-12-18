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
    <Container maxWidth="sm"
    sx={{
      width: '361px',
      height: '547px',
      mx: 'auto', // Centrar el contenedor horizontalmente
    }}
    >
      <Box mt={5} textAlign="center">
        <Typography variant="h4" component="h1" gutterBottom
        sx={{fontFamily:'Popins',fontSize:'24px',
           marginBottom: '24px',
          textAlign: 'left',
          }}
        >
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
                  borderRadius: '15px',
                  marginBottom: '16px',
                  padding: 2,
                  width: { xs: '100%', sm: '361px' },
                  height: '83px',
                 
                  backgroundColor: 'white',
                }}
              >
                <Box display="flex" justifyContent="space-between" width="100%">
                  <ListItemText
                    primary={` ${reserva.servicio.nombre || 'N/A'}  ${reserva.servicio.duracion || 'N/A'}`}
                    secondary={`$ ${reserva.servicio.precio || 'N/A'}`} 
                    primaryTypographyProps={{
                      sx: {
                        color: '#3A3A3A', // Color del servicio y duración
                        fontFamily:'Popins',
                        fontSize:'12px',
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        color: '#3A3A3A', // Color del precio
                        fontFamily:'Popins',
                        fontSize:'16px',
                      },
                    }}
                  />
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                      width: 104,
                      height: 47,
                      borderRadius: '15px',
                      backgroundColor: '#CDFFAE',
                      color: 'white',
                     
                    }}
                  >
                    <Typography variant="body2" color="textSecondary"
                    sx={{ fontFamily:'Popins',
                      fontSize:'14px',
                    color: '#3A3A3A'
                    }}
                    >
                      {reserva.fecha} 
                    </Typography>
                    <Typography variant="body2" 
                     sx={{ fontFamily:'Popins',
                      fontSize:'14px',
                    color: '#3A3A3A'
                    }}
                    >
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