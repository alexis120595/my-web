// vista de la agenda de la empresa que muestra los turnos de los clientes
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, ButtonBase } from '@mui/material';
import axios from 'axios';
import CalendarioAgenda from '../components/Calendario';
import SearchBarReservas from '../components/SearchBarReservas';
import { useNavigate } from 'react-router-dom';


const AgendaEmpresa = () => {
  // estados para almacenar las reservas, la fecha seleccionada y el ID de la reserva seleccionada
  const [reservas, setReservas] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedReservaId, setSelectedReservaId] = useState(null); 
  const [empresaId, setEmpresaId] = useState(null); 
  const navigate = useNavigate();
// obtener el ID de la empresa del almacenamiento local
  useEffect(() => {
    const storedEmpresaId = localStorage.getItem('empresaId');
    if (storedEmpresaId) {
      setEmpresaId(storedEmpresaId);
    } else {
      console.error('No se encontró el ID de la empresa en el almacenamiento local');
    }
  }, []);
// función para obtener las reservas de la empresa
  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/reservas/empresa/${empresaId}`);
        setReservas(response.data);
      } catch (error) {
        console.error('Error fetching agenda:', error);
      }
    };

    if (empresaId){

    fetchReservas();
}
  }, [empresaId]);
// función para manejar el clic en una reserva
  const handleReservaClick = (id) => {
    // Guardar el ID de la reserva seleccionada en el estado
    setSelectedReservaId(id); 
    // Navegar a la vista de detalle de la reserva
    navigate(`/detalle-reserva-empresa/${id}`);
  };

// función para manejar el clic en un día del calendario y filtrar las reservas por fecha
  const handleDayClick = async (date) => {
    setSelectedDate(date);
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await axios.get(`http://localhost:8000/reservas/fecha?fecha=${formattedDate}`);
      console.log('Reservas del día:', response.data);
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas for selected date:', error);
    }
  };

// función para buscar las reservas por ID de cliente
  const handleSearchByClienteId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/reservas/cliente/${userId}`);
      console.log('Reservas por cliente ID:', response.data);
      setReservas(response.data);
    } catch (error) {
      console.error('Error fetching reservas by cliente ID:', error);
    }
  };


  return (
    <Container maxWidth="sm"
    sx={{
        width:"360px",
    height:"764px",
    }}
   
    >
      <Box  textAlign="left">
        <Typography variant="h4" gutterBottom  
        sx={{
          fontFamily: 'Poppins',
          fontSize: '24px',
          textAlign: 'left', 
        }}> 
          Agenda 
        </Typography>
        <Box
         sx={{ textAlign: 'left' }}>
          {/* Calendario para seleccionar la fecha */}
        <CalendarioAgenda selectedDate={selectedDate} setSelectedDate={handleDayClick} sx={{mb:2}} />
        </Box>

        <Typography variant="h4" gutterBottom  sx={{mt:2, mr:5, 
        fontFamily: 'Poppins', fontSize: '20px', textAlign: 'left'
        }}>
          Proximos turnos
        </Typography>
        { /* Barra de búsqueda para buscar reservas por ID de cliente */}
        <SearchBarReservas onSearch={handleSearchByClienteId} />
        { /* Lista de reservas */}
        <List>
          {reservas.map((reservas) => (

<ButtonBase
key={reservas.id}
onClick={() => handleReservaClick(reservas.id)}
sx={{ width: '100%', display: 'block', textAlign: 'left' }}
>
            <ListItem key={reservas.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              mb: 2,
              padding: 2,
              width: { xs: '330px', sm: '360px' },
              height: '83px',
            
              backgroundColor: 'white'
              
            }}>
              {/* Información de la reserva */}
               <Box display="flex" flexDirection="column" width="100%">
                  <ListItemText
                    primary={`Cliente n° ${reservas.usuario.id}`}
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: 'Poppins', 
                        fontSize: '16px', 
                        color: '#666666', 
                      },
                    }}
                    sx={{ color: '#666666' }}
                  />

                  {/* Información del servicio y barbero */}
               <Box display="flex" justifyContent="space-between" width="100%" >
              <ListItemText   primary={` ${reservas.servicio.nombre|| 'N/A'}`}
                    secondary={` ${reservas.barbero.nombre || 'N/A'}`} 
                    
                    primaryTypographyProps={{
                      sx: {
                        fontFamily: 'Poppins', 
                        fontSize: '12px',
                        color: '#3A3A3A', 
                      },
                    }}
                    secondaryTypographyProps={{
                      sx: {
                        fontFamily: 'Poppins', 
                        fontSize: '12px', 
                        color: '#3A3A3A', 
                      },
                    }}
                    />
              <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                    flexDirection="column"
                  sx={{
                    width: '104px',
                    height: '47px',
                    borderRadius: '15px',
                    backgroundColor: '#CDFFAE',
                    color: 'white',
                    mb: -20,
                    mt: -2,
                   
                    

                  
                  }}
                >
              <Typography
         
          sx={{
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            color: '#3A3A3A', 
            
          }}
        >
          {/* Fecha y hora de la reserva */}
          {reservas.fecha}
        </Typography>
        <Typography
          
          sx={{
            fontFamily: 'Poppins', 
            fontSize: '14px', 
            color: '#3A3A3A', 
          }}
        >
          {reservas.horario.hora}
        </Typography>
                </Box>
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

export default AgendaEmpresa;