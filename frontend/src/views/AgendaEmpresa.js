import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, ButtonBase } from '@mui/material';
import axios from 'axios';
import Calendario from '../components/Calendario';
import SearchBarReservas from '../components/SearchBarReservas';
import { useNavigate } from 'react-router-dom';


const AgendaEmpresa = () => {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8000/reservas');
        setReservas(response.data);
      } catch (error) {
        console.error('Error fetching agenda:', error);
      }
    };

    fetchReservas();
  }, []);

  const handleReservaClick = (id) => {
    navigate(`/detalle-reserva-empresa`);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom sx={{mr:20}}> 
          Agenda 
        </Typography>
        <Box>
        <Calendario sx={{mb:2}} />
        </Box>

        <Typography variant="h4" gutterBottom  sx={{mt:2, mr:5}}>
          Proximos turnos
        </Typography>

        <SearchBarReservas onSearch={(query) => console.log(query)} />
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
              borderRadius: '8px',
              mb: 2,
              padding: 2,
              width: '400px',
              ml: 16,
              
            }}>
               <Box display="flex" justifyContent="space-between" width="100%" >
              <ListItemText primary={reservas.id}  />
              <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    width: 100,
                    height: 50,
                    borderRadius: '20px',
                    backgroundColor: 'green',
                    color: 'white',
                  }}
                >
              <Typography variant="body2" color="textSecondary">
                  {reservas.fecha}
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

export default AgendaEmpresa;