// # Vista que muestra las reservas del usuario, permitiendo actualizar estados y acceder al detalle.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, List, ListItem, ListItemText,Container,ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const ReservasUsuario = () => {
   // # Estado para almacenar la lista de reservas y manejar posibles errores
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState(null);
    const navigate = useNavigate();
 // # Carga el ID del usuario del localStorage y obtiene sus reservas
  useEffect(() => {
    const userId = localStorage.getItem('userId'); 
    if (userId) {
      fetchReservasUsuario(userId);
    } else {
      setError('No se encontró el ID del usuario en el almacenamiento local');
    }
  }, []);
// # Función para obtener las reservas del usuario y actualizar el estado de las reservas realizadas
  const fetchReservasUsuario = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/reservas/usuario/${userId}`);
      const reservasActualizadas = await Promise.all(response.data.map(async (reserva) => {
        const reservaFechaHora = new Date(`${reserva.fecha}T${reserva.horario.hora}`);
        if (reserva.estado !== 'Cancelada' && reservaFechaHora < new Date()) {
          await actualizarEstadoReserva(reserva.id, 'Realizada');
          return { ...reserva, estado: 'Realizada' };
        }
        return reserva;
      }));
      setReservas(reservasActualizadas);
    } catch (error) {
      setError('Error al obtener las reservas del usuario');
      console.error('Error fetching user reservations:', error);
    }
  };
// # Función para actualizar el estado de una reserva
  const actualizarEstadoReserva = async (reservaId, estado) => {
    try {
      await axios.put(`http://localhost:8000/reservas/${reservaId}/realizar`, { estado });
    } catch (error) {
      console.error('Error updating reservation status:', error);
    }
  };
// # Función para manejar el clic en una reserva y redirigir al detalle de la reserva
  const handleReservaClick = (reservaId) => {
    navigate(`/detalle/${reservaId}`);
  };
// # Función para obtener el color de fondo de una reserva según su estado
  const getColorByEstado = (estado) => {
    switch (estado) {
      case 'Pendiente':
        return '#CDFFAE'; 
      case 'Cancelada':
        return '#FF8272'; 
      case 'Realizada':
        return '#666666'; 
      default:
        return '#CDFFAE'; 
    }
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
           {/* # Listado de reservas del usuario */}
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
                        color: '#3A3A3A', 
                        fontFamily:'Popins',
                        fontSize:'12px',
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        color: '#3A3A3A', 
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
                      backgroundColor: getColorByEstado(reserva.estado), 
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