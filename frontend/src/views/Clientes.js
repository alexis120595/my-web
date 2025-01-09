// Vista de la lista de Clientes de una empresa
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Avatar, IconButton, Button} from '@mui/material';
import axios from 'axios';
import SearchBarClientes from '../components/SearchBarClientes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const Clientes = () => {
  // Estado para almacenar los registros de clientes
  const [registro, setRegistro] = useState([]);
  const navigate = useNavigate();
    
// Función para obtener los registros de clientes
  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const response = await axios.get('http://localhost:8000/registro');
        console.log('Datos recibidos:', response.data); 
        setRegistro(response.data);
      } catch (error) {
        console.error('Error fetching registro:', error);
      }
    };

    fetchRegistro();
  }, []);
// Función para buscar un cliente por email
  const handleSearch = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8000/registro/buscar?email=${email}`);
      console.log('Datos recibidos:', response.data);
      setRegistro(response.data);
    } catch (error) {
      console.error('Error al buscar clientes:', error);
    }
  };
// Función para crear una reserva desde la vista de Clientes
  const handleCrearReserva = (clienteId) => {
    navigate('/home', { state: { clienteId } });
  };

  return (
    <Container maxWidth="sm"
    sx={{
      width:'360px',
    height:'866px',
    }}>
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom  sx={{
             fontFamily: 'Poppins',
             fontSize: '24px',
             
              mb:2
            }}>
          Clientes
        </Typography>
          {/* buscador de clientes */}
        <SearchBarClientes onSearch={handleSearch} />

        <Typography  gutterBottom sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
             mr:27
           }}>
          Mis clientes
        </Typography>
        {/* Lista de clientes */}
        <List>
          {registro.map((registro) => (
            <ListItem key={registro.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              mb: 2,
              
              padding: 2,
              width: { xs: '330px', sm: '360px' },
              height: '89px',
              backgroundColor: 'white'
            }}>
              {/* imagen del cliente */}
                <Avatar
                  alt={`${registro.email}`}
                  src={registro.imagen_url}
                  sx={{ width: 45, height: 45, mr: 2 }}
                />
              <ListItemText primary={registro.email}
                primaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins',
                  fontSize: '16px', 
                  color: '#666666', 
                  
                },
              }}
               sx={{
                '& .MuiListItemText-primary': {
                  color: '#666666', 
                },
              }}
              />
              {/* botones de crear reserva  */}
              <IconButton edge="end" aria-label="crear reserva"
               onClick={() =>handleCrearReserva (registro.id)}
                  sx={{
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', 
                    height: '40px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                    {/* icono de calendario */}
                  <CalendarTodayIcon sx={{ color: 'black', fontSize: '20px' }} />
                </IconButton>
                {/* botón de eliminar cliente */}
                <IconButton edge="end" aria-label="link" onClick={() => (registro.id)}
                  sx={{
                    ml: 2,
                    backgroundColor: '#FF8272',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', 
                    height: '40px', 
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                    {/* icono de eliminar */}
                  <DeleteIcon sx={{ color: 'black', fontSize: '20px' }} />
                </IconButton>
            </ListItem>
          ))}
        </List>
        {/* botón de invitar cliente */}
        <Button
  variant="contained"
  color="primary"
  fullWidth
  sx={{ 
    mt: 5, 
    borderRadius: '30px', 
    backgroundColor: '#FFD000',  
    color: 'black', 
    width: { xs: '330px', sm: '360px' },
    height: '43px',
    mr: 1, 
    mb: 4,
    '&:hover': {
      backgroundColor: 'gray', 
    },
  }}
>
<Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
    }}
  >
    Invitar cliente
  </Typography>
</Button>
      </Box>
    </Container>
  );
};

export default Clientes;