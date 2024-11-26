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
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom  sx={{
             
              mr:18
            }}>
          Sucursales
        </Typography>

        <SearchBarClientes onSearch={handleSearch} />

        <Typography  gutterBottom sx={{
             
             mr:25
           }}>
          Mis sucursales
        </Typography>
        <List>
          {sucursales.map((sucursales) => (
            <ListItem key={sucursales.id}
            sx={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              mb: 2,
              ml:15,
              padding: 2,
              width: '400px',
              backgroundColor: 'white'
            }}>
                
              <ListItemText primary={sucursales.nombre} 
              
              sx={{
                '& .MuiListItemText-primary': {
                  color: 'black', // Cambiar el color del texto a negro
                },
              }}/>

              <IconButton edge="end" aria-label="edit" onClick={() => handleEditClick (sucursales.id)}
                  sx={{
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow',
                    },
                  }}>
                  <EditIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteClick(sucursales.id)}
                  sx={{
                    ml: 2,
                    backgroundColor: 'red',
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
  sx={{
    mt: 2,
    borderRadius: '25px',
    backgroundColor: 'yellow',
    color: 'black',
    width: '300px',
    mr: 1,
    mb: 4,
    '&:hover': {
      backgroundColor: 'gray', // Cambia el fondo a gris al hacer hover
    },
  }}
  onClick={handleAddSucursalClick}
>
  Añadir sucursal
</Button>
   
      </Box>
    </Container>
  );
};

export default Sucursales;