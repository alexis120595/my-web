// Archivo que muestra los servicios de la empresa y permite editarlos
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, Checkbox} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';


const Servicios = () => {
  // Estado para almacenar los servicios
  const [servicios, setServicios] = useState([]);
    const navigate = useNavigate();
// Función que se ejecuta al cargar el componente para obtener los servicios de la empresa
  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      fetchServicios(empresaId);
    }
  }, []);
// Función para obtener los servicios de la empresa
    const fetchServicios = async (empresaId) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

  // Función para redirigir a la página de edición de un servicio
  const handleEditServiceClick = (id) => {
    navigate(`/editar-servicio/${id}`);
  };



  return (
    <Container maxWidth="sm">
      <Box mt={2} textAlign="left" sx={{ml:17 }} >
      {/* servicios disponibles */}
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
{/* Checkbox para seleccionar el servicio */} 
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
              {/* Icono para editar el servicio */}
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