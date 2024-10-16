import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, Checkbox} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const Servicios = () => {
  const [servicios, setServicios] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      fetchServicios(empresaId);
    }
  }, []);

    const fetchServicios = async (empresaId) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    
  const handleEditServiceClick = (id) => {
    navigate(`/editar-servicio/${id}`);
  };



  return (
    <Container maxWidth="sm">
      <Box mt={2} textAlign="left" sx={{ml:17 }} >

        <List>
        {servicios.length > 0 ? (
            servicios.map((servicio) => (
              <ListItem
                key={servicio.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  mb: 2,
                  padding: 2,
                  width: '400px',
                  
                }}>

<Checkbox
                  edge="start"
                  sx={{ mr: 2 }}
                />
              <ListItemText primary={servicio.nombre} secondary={servicio.descripcion} />
              <IconButton
              edge="end"
              aria-label="edit"
              onClick={() => handleEditServiceClick(servicio.id)}
              sx={{
                
                backgroundColor: 'yellow',
                borderRadius: '50%',
                padding: '10px',
                '&:hover': {
                  backgroundColor: 'darkyellow',
                },
              }}
            >
              <EditIcon sx={{ color: 'black' }} />
            </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No hay servicios disponibles</Typography>
        )}

        </List>
       
      </Box>
    </Container>
  );
};

export default Servicios;