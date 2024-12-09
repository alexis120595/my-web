import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, IconButton, Button} from '@mui/material';
import axios from 'axios';
import SearchBarClientes from '../components/SearchBarClientes';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate} from 'react-router-dom';


const Sucursales = () => {
  const [sucursales, setSucursales] = useState([]);
  const navigate = useNavigate();
  const empresaId = localStorage.getItem('empresaId'); // Obtener el ID de la empresa desde el almacenamiento local

    

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

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/sucursales/buscar?nombre=${encodeURIComponent(query)}`);
      console.log('Datos recibidos:', response.data);
      setSucursales(response.data);
    } catch (error) {
      console.error('Error searching sucursales:', error);
    }
  };


  const handleAddSucursalClick = () => {
    navigate('/crear-sucursal');
  };

  const handleEditClick = (id) => {
    navigate(`/editar-sucursal/${id}`);
  };

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

        <SearchBarClientes onSearch={handleSearch} />

        <Typography  gutterBottom sx={{
            fontFamily: 'Poppins', // Aplica la fuente Poppins
            fontSize: '16px', 
            
           }}>
          Mis sucursales
        </Typography>
        <List>
          {sucursales.map((sucursales) => (
            <ListItem key={sucursales.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '15px',
              mb: 2,
              
              padding: 2,
              height: '83px',
              width: '360px',
              backgroundColor: 'white'
            }}>
                
              <ListItemText primary={sucursales.nombre} 
              secondary={sucursales.ubicacion} 
               primaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '16px', // Tamaño de fuente 16px
                  color: '#666666', // Cambiar el color del texto a #666666
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontFamily: 'Poppins', // Aplica la fuente Poppins
                  fontSize: '12px', // Tamaño de fuente 14px
                  color: '#3A3A3A', // Cambiar el color del texto a #999999
                },
              }}
              sx={{
                '& .MuiListItemText-primary': {
                  color: '#666666', // Cambiar el color del texto a negro
                },
              }}/>

              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick (sucursales.id)}
                  sx={{
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', // Ancho del botón
                    height: '40px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <EditIcon sx={{ color: 'black',fontSize: '24px' }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(sucursales.id)}
                  sx={{
                    ml: 2,
                    backgroundColor: '#FF8272',
                    borderRadius: '50%',
                    padding: '10px',
                    width: '40px', // Ancho del botón
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

        <Button
  variant="contained"
  color="primary"
  fullWidth
  sx={{
    mt: 2,
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
  onClick={handleAddSucursalClick}
>
<Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: 'black', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
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