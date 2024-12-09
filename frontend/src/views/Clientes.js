import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Avatar, IconButton, Button} from '@mui/material';
import axios from 'axios';
import SearchBarClientes from '../components/SearchBarClientes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';


const Clientes = () => {
  const [registro, setRegistro] = useState([]);
  const navigate = useNavigate();
    

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

  const handleCrearReserva = (clienteId) => {
    navigate('/home', { state: { clienteId } });
  };

  return (
    <Container maxWidth="sm"
    sx={{width:'360px',
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

        <SearchBarClientes onSearch={console.log} />

        <Typography  gutterBottom sx={{
              fontFamily: 'Poppins',
              fontSize: '16px',
             mr:27
           }}>
          Mis clientes
        </Typography>
        <List>
          {registro.map((registro) => (
            <ListItem key={registro.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              mb: 2,
              
              padding: 2,
              width: '360px',
              height: '89px',
              backgroundColor: 'white'
            }}>
                <Avatar
                  alt={`${registro.email}`}
                  src={registro.imagen_url}
                  sx={{ width: 45, height: 45, mr: 2 }}
                />
              <ListItemText primary={registro.email}
                primaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '16px', // Tamaño de fuente 16px
                  color: '#666666', // Cambiar el color del texto a negro
                },
              }}
               sx={{
                '& .MuiListItemText-primary': {
                  color: '#666666', // Cambiar el color del texto a negro
                },
              }}
              />

              <IconButton edge="end" aria-label="crear reserva"
               onClick={() =>handleCrearReserva (registro.id)}
                  sx={{
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', // Ancho del botón
                    height: '40px', // Alto del botón
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <CalendarTodayIcon sx={{ color: 'black', fontSize: '20px' }} />
                </IconButton>
                <IconButton edge="end" aria-label="link" onClick={() => (registro.id)}
                  sx={{
                    ml: 2,
                    backgroundColor: '#FF8272',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', // Ancho del botón
                    height: '40px', // Alto del botón
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <DeleteIcon sx={{ color: 'black', fontSize: '20px' }} />
                </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
  variant="contained"
  color="primary"
  fullWidth
  sx={{ 
    mt: 5, 
    borderRadius: '30px', 
    backgroundColor: '#FFD000',  
    color: 'black', 
    width: '360px', 
    height: '43px',
    mr: 1, 
    mb: 4,
    '&:hover': {
      backgroundColor: 'gray', // Cambia el fondo a gris al hacer hover
    },
  }}
>
<Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: 'black', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
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