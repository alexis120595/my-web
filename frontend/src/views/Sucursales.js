// Archivo que nos va a permitir visualizar las sucursales de la empresa

import React, { useState, useEffect } from 'react';
// Importar componentes de Material-UI que vamos a utilizar en este componente
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, Button} from '@mui/material';
// Importar axios para realizar solicitudes HTTP al servidor de la API
import axios from 'axios';
import SearchBarSucursales from '../components/SearchBarSucursales';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// Importar el componente useNavigate para cambiar de ruta en React Router
import {useNavigate} from 'react-router-dom';


const Sucursales = () => {
  // Definir el estado de las sucursales y una función para actualizarlo
  const [sucursales, setSucursales] = useState([]);
  const navigate = useNavigate();
  const empresaId = localStorage.getItem('empresaId'); // Obtener el ID de la empresa desde el almacenamiento local

    
// Función que se ejecuta al cargar el componente y nos permite obtener las sucursales de la empresa
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/sucursales`);
        console.log('Datos recibidos:', response.data); 
        setSucursales(response.data);
      } catch (error) {
        console.error('Error fetching registro:', error);
      }
    };

    if (empresaId) {
      fetchSucursales();
    }
  }, [empresaId]);

  // Función que se ejecuta al realizar una búsqueda de sucursales por nombre 
  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/sucursales/buscar?nombre=${encodeURIComponent(query)}`);
      console.log('Datos recibidos:', response.data);
      setSucursales(response.data);
    } catch (error) {
      console.error('Error searching sucursales:', error);
    }
  };

// Función que se ejecuta al hacer clic en el botón de añadir sucursal y nos lleva a la página de creación de sucursales
  const handleAddSucursalClick = () => {
    navigate('/crear-sucursal');
  };

  // Función que se ejecuta al hacer clic en el botón de editar sucursal y nos lleva a la página de edición de sucursales
  const handleEditClick = (id) => {
    navigate(`/editar-sucursal/${id}`);
  };

  // Función que se ejecuta al hacer clic en el botón de eliminar sucursal y nos permite eliminar una sucursal
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/sucursales/${id}`);
      setSucursales(sucursales.filter((sucursal) => sucursal.id !== id));
      alert('Sucursal eliminada correctamente');
    } catch (error) {
      console.error('Error deleting sucursal:', error);
      alert('Error al eliminar la sucursal');
    }
  };


  return (
    <Container maxWidth="sm"
    sx={{
      width:'360px',
      height:'618px',
    }}>
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom  sx={{
             
             fontFamily: 'Poppins', // Aplica la fuente Poppins
             fontSize: '24px',
             mb: 3,
            }}>
          Sucursales
        </Typography>

        <SearchBarSucursales onSearch={handleSearch} />

        <Typography  gutterBottom sx={{
            fontFamily: 'Poppins', 
            fontSize: '16px', 
            
           }}>
          Mis sucursales
        </Typography>
        {/* # sección que mapea y muestra la lista de sucursales existentes*/}
        <List>
         {/* # se recorre el arreglo de sucursales y se muestran en una lista*/}
          {sucursales.map((sucursales) => (
            <ListItem key={sucursales.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              mb: 2,
              width: { xs: '330px', sm: '360px' },
              padding: 2,
              height: '83px',
             
              backgroundColor: 'white'
            }}>
                
              <ListItemText primary={sucursales.nombre} 
              secondary={sucursales.ubicacion} 
               primaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins', 
                  fontSize: '16px', 
                  color: '#666666', 
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins', 
                  fontSize: '12px', 
                  color: '#3A3A3A', 
                },
              }}
              sx={{
                '& .MuiListItemText-primary': {
                  color: '#666666', 
                },
              }}/>
         {/* # Botón para editar la sucursal */}
              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick (sucursales.id)}
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
                  <EditIcon sx={{ color: 'black',fontSize: '24px' }} />
                </IconButton>
               {/* # Botón para eliminar la sucursal */}
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(sucursales.id)}
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
                  <DeleteIcon sx={{ color: 'black',fontSize: '24px' }} />
                </IconButton>
            </ListItem>
          ))}
        </List>
{/* # Botón para añadir la sucursal */}
        <Button
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: 2,
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
  onClick={handleAddSucursalClick}
>
<Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
    }}
  >
    Añadir sucursal
  </Typography>
</Button>
   
      </Box>
    </Container>
  );
};

export default Sucursales;