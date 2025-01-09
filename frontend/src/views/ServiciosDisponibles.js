// Archivo que contiene la vista de los servicios disponibles para una empresa
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
// función que se ejecuta al cargar la página para obtener los servicios de la empresa
// a partir del id de la empresa almacenado en el localStorage
  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      fetchServicios(empresaId);
    }
  }, []);
// función que obtiene los servicios de una empresa a partir de su id
  const fetchServicios = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/servicios`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error fetching servicios:', error);
    }
  };
// función que se ejecuta al realizar una búsqueda de servicios por el nombre
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/servicios/buscar?nombre=${query}`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error searching servicios:', error);
    }
  };
// función que se ejecuta al hacer clic en el botón de añadir servicio
  const handleAddServiceClick = () => {
    navigate('/crear-servicio1');
  };
// función que se ejecuta al hacer clic en el botón de editar servicio
  const handleEditServiceClick = (id) => {
    navigate(`/editar-servicio/${id}`);
  };
// función que se ejecuta al hacer clic en el botón de crear categoría
  const handleCrearCategoriaClick = () => {
    navigate('/crear-categoria');
  };

  //función que creamos para  Agrupar servicios por categoría
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
    <Container maxWidth="sm"
    sx={{width:'359px',
      height:'710px',
    }}>
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom
        sx={{fontFamily:'Poppins',
          fontSize:'24px',
          marginBottom:'24px',
        }}
        >
          Servicios 
        </Typography>
         {/* # Barra de búsqueda de servicios */}
        <Box display="flex" justifyContent="center" mb={2} mr={15}>
          <SearchBar onSearch={handleSearch} />
        </Box>
         {/* # Verifica si hay categorías y sus servicios; si no, muestra un mensaje */}
        {Object.keys(serviciosPorCategoria).length > 0 ? (
          Object.keys(serviciosPorCategoria).map((categoriaNombre) => (
            <Box key={categoriaNombre} mb={4}>
              
              <Typography variant="h6"
              sx={{fontFamily:'Poppins',
                fontSize:'20px',
                marginBottom:'24px',
              }}
              >{categoriaNombre}
              </Typography>
                {/* # Lista de servicios en cada categoría */}
              <List>
                {serviciosPorCategoria[categoriaNombre].map((servicio) => (
                  <ListItem
                    key={servicio.id}
                    sx={{
                      border: '1px solid #ccc',
                      borderRadius: '15px',
                      mb: 2,
                     
                      width: { xs: '330px', sm: '361px' },
                      height: '83px',
                      backgroundColor: 'white',
                    }}
                  >
                     {/* # Se muestra el nombre, duración y precio del servicio */}
                    <ListItemText
                     sx={{ color: '#666666  ',
                      fontfamily: 'Poppins',
                      fontSize: '16px',
                      }}
                      primary={servicio.nombre}
                      secondary={
                        <Box component="span" display="flex" flexDirection="column">
                          <Typography variant="body2" sx={{ color: '#3A3A3A  ',
                      fontfamily: 'Poppins',
                      fontSize: '12px',
                      }}>
                            {servicio.duracion}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#3A3A3A  ',
                      fontfamily: 'Poppins',
                      fontSize: '16px',
                      }}>
                            $ {servicio.precio}
                          </Typography>
                         
                        </Box>
                      }
                    />
                     {/* # Botón para editar el servicio */}
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={() => handleEditServiceClick(servicio.id)}
                      sx={{
                        marginRight: '10px',
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#FFD000',
                        borderRadius: '50%',
                        padding: '10px',
                        '&:hover': {
                          backgroundColor: 'darkyellow',
                        },
                      }}
                    >
                      <EditIcon sx={{ color: '#000000',
                        width: '24px',
                        height: '24px',
                       }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          ))
        ) : (
          <Typography variant="body1">No hay servicios disponibles</Typography>
        )}
        {/* # Botón para añadir un nuevo servicio */}
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, borderRadius: '30px', backgroundColor: '#FFD000', color: 'black',
            width: '166px', height: '43px',
            '&:hover': {
              backgroundColor: '#FFD000', // Mantiene el mismo color al pasar el cursor
            },
           }}
          onClick={handleAddServiceClick}
        >
          <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', whiteSpace: 'nowrap' }}>
    Añadir Servicio
  </Typography>
        </Button>
          {/* # Botón para crear una nueva categoría */}
        <Box >
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: -9, borderRadius: '25px', ml: 22, backgroundColor: 'transparent', color: '#FFD000',
              width: '166px', height: '43px',border: '3px solid #FFD000',
              '&:hover': {
                backgroundColor: 'transparent', // Mantiene el mismo color al pasar el cursor
              },
             }}
            onClick={handleCrearCategoriaClick}
          >
           <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px', whiteSpace: 'nowrap' }}>
      Crear Categoría
    </Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ServiciosDisponibles;