import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Avatar, IconButton, Button} from '@mui/material';
import axios from 'axios';
import SearchBarClientes from '../components/SearchBarClientes';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteIcon from '@mui/icons-material/Delete';


const Clientes = () => {
  const [registro, setRegistro] = useState([]);
    

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



  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom  sx={{
             
              mr:23
            }}>
          Clientes
        </Typography>

        <SearchBarClientes onSearch={console.log} />

        <Typography  gutterBottom sx={{
             
             mr:27
           }}>
          Mis clientes
        </Typography>
        <List>
          {registro.map((registro) => (
            <ListItem key={registro.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              mb: 2,
              ml:15,
              padding: 2,
              width: '400px'
            }}>
                <Avatar
                  alt={`${registro.email}`}
                  src={registro.imagen_url}
                  sx={{ width: 56, height: 56, mr: 2 }}
                />
              <ListItemText primary={registro.email} />

              <IconButton edge="end" aria-label="edit" onClick={() => (registro.id)}
                  sx={{
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <CalendarTodayIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton edge="end" aria-label="link" onClick={() => (registro.id)}
                  sx={{
                    ml: 2,
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <DeleteIcon sx={{ color: 'black' }} />
                </IconButton>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2, borderRadius: '25px', backgroundColor: 'yellow',  color: 'black', width: '300px', mr: 1, mb:4 }}
         
        >
          Invitar cliente
        </Button>
   
      </Box>
    </Container>
  );
};

export default Clientes;