import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Button, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar'; 
import EditIcon from '@mui/icons-material/Edit';

const ServiciosDisponibles = () => {
  const [servicios, setServicios] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/servicios/buscar?nombre=${query}`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error searching servicios:', error);
    }
  };

  const handleAddServiceClick = () => {
    navigate('/crear-servicio1');
  };

  const handleEditServiceClick = (id) => {
    navigate(`/editar-servicio/${id}`);
  };

  const handleCrearCategoriaClick = () => {
    navigate('/crear-categoria');
  };

  // Agrupar servicios por categoría
  const serviciosPorCategoria = {};
  servicios.forEach(servicio => {
    if (servicio.categorias.length === 0) {
      if (!serviciosPorCategoria['Sin categoría']) {
        serviciosPorCategoria['Sin categoría'] = [];
      }
      serviciosPorCategoria['Sin categoría'].push(servicio);
    } else {
      servicio.categorias.forEach(categoria => {
        if (!serviciosPorCategoria[categoria.nombre]) {
          serviciosPorCategoria[categoria.nombre] = [];
        }
        serviciosPorCategoria[categoria.nombre].push(servicio);
      });
    }
  });

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom>
          Servicios 
        </Typography>
        
        <Box display="flex" justifyContent="center" mb={2} mr={15}>
          <SearchBar onSearch={handleSearch} />
        </Box>
        
        {Object.keys(serviciosPorCategoria).length > 0 ? (
          Object.keys(serviciosPorCategoria).map((categoriaNombre) => (
            <Box key={categoriaNombre} mb={4}>
              <Typography variant="h6">{categoriaNombre}</Typography>
              <List>
                {serviciosPorCategoria[categoriaNombre].map((servicio) => (
                  <ListItem
                    key={servicio.id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      mb: 2,
                      padding: 2,
                      width: '400px',
                    }}
                  >
                    <ListItemText
                      primary={servicio.nombre}
                      secondary={
                        <Box component="span" display="flex" flexDirection="column">
                          <Typography variant="body2" color="textSecondary">
                            {servicio.duracion}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            $ {servicio.precio}
                          </Typography>
                         
                        </Box>
                      }
                    />
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
                ))}
              </List>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No hay servicios disponibles</Typography>
        )}
        
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: '25px', mr: 10, backgroundColor: 'yellow', color: 'black' }}
          onClick={handleAddServiceClick}
        >
          Añadir Servicio
        </Button>
        
        <Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: -8, borderRadius: '25px', ml: 22, backgroundColor: 'yellow', color: 'black' }}
            onClick={handleCrearCategoriaClick}
          >
            Crear Categoria
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiciosDisponibles;