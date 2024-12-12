// Personal.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  IconButton
} from '@mui/material'; // Asegúrate de importar ListItemButton
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBarEmpleados from '../components/SearchBarEmpleados';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';

const Personal = () => {
  const [barberos, setBarberos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      fetchBarberos(empresaId);
    }
  }, []);

  const fetchBarberos = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error fetching personal:', error);
    }
  };

  const handleSearch = async (nombre) => {
    try {
      const response = await axios.get(`http://localhost:8000/barberos/buscar?nombre=${nombre}`);
      console.log('Datos recibidos:', response.data);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error searching barberos:', error);
    }
  };

  const handleAddEmpleadoClick = () => {
    navigate('/crear-empleado');
  };

  const handleEditClick = (e, id) => {
    e.stopPropagation(); // Evita que el clic se propague al ListItemButton
    navigate(`/editar-profesional/${id}`);
  };

 // Dentro de tu componente Personal.js

 const handleLinkClick = (e) => {
  e.stopPropagation();

  // Genera el enlace a la página principal
  const link = `${window.location.origin}/home`;

  // Copia el enlace al portapapeles
  navigator.clipboard.writeText(link)
    .then(() => {
      // Muestra un mensaje en la interfaz
      setMensaje('Enlace copiado al portapapeles');
    })
    .catch((err) => {
      console.error('Error al copiar el enlace:', err);
    });
};

  const handleCrearHorariosClick = (barbero) => {
    navigate('/crear-horarios', { state: { barbero } });

  };

  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje('');
      }, 3000); // El mensaje desaparece después de 3 segundos
      return () => clearTimeout(timer);
    }
  }, [mensaje]);

  return (
    <Container 
    sx={{width:'359px',
    height:'679px',
    }}
    >
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left',
          fontFamily: 'Poppins',  
          fontSize: '24px',
          ml: -4
         }}>
          Personal
        </Typography>
        
        <Box display="flex" justifyContent="left" >
          <SearchBarEmpleados onSearch={handleSearch} />
        </Box>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'left', 
          fontFamily: 'Poppins',
          fontSize: '16px',
          ml: -4
         }}>
          Profesionales disponibles
        </Typography>
     
        <List>
          {barberos.length > 0 ? (
            barberos.map((barbero) => (
              <ListItemButton
                key={barbero.id}
                onClick={() => handleCrearHorariosClick(barbero)}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '15px',
                  marginBottom: '16px',
                  padding: 2,
                  width: '361px',
                  height: '89px',
                  ml: -5,
                  backgroundColor: 'white', // Color de fondo del input
                  '&:hover': {
                    backgroundColor: 'lightgray', // Cambiar el color de fondo al pasar el cursor a gris claro
                  },
                }}
              >
                <Avatar
                  alt={`${barbero.nombre} ${barbero.apellido}`}
                  src={barbero.imagen_url}
                  sx={{ width: 44, height: 45, mr: 2

                  }}
                  
                />
                <ListItemText
                  primary={`${barbero.nombre} ${barbero.apellido}`}
                  secondary={barbero.servicios_id}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: 'Poppins', // Aplica la fuente Poppins
                      fontSize: '16px', // Tamaño de fuente 16px
                      color: '#666666', // Cambiar el color del nombre del barbero a negro
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      color: 'gray', // Cambiar el color del texto secundario a gris
                    },
                  }}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#666666', // Cambiar el color del nombre del barbero a negro
                    },
                  }}
                />
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(e) => handleEditClick(e, barbero.id)}
                  sx={{
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow'
                    }
                  }}
                >
                  <EditIcon sx={{ color: 'black' }} />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="link"
                  onClick={handleLinkClick}
                  sx={{
                    ml: 2,
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    padding: '10px',
                    '&:hover': {
                      backgroundColor: 'darkyellow'
                    }
                  }}
                >
                  <LinkIcon sx={{ color: 'black' }} />
                </IconButton>
              </ListItemButton>
            ))
          ) : (
            <Typography>No hay personal disponible para esta empresa.</Typography>
          )}
        </List>
        {mensaje && (
  <Typography
    sx={{
      fontFamily: 'Poppins',
      fontSize: '14px',
      color: 'white',
      mt: 1,    // Margen superior para separar del título
      ml: -4    // Alineación con el título
    }}
  >
    {mensaje}
  </Typography>
)}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: '44px',
            borderRadius: '30px',
            backgroundColor: '#FFD000',
            color: 'black',
            width: '359px',
            height: '43px',
           
            ml: -4.5, 
          }}
          onClick={handleAddEmpleadoClick}
        >
          <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: '#000000', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Añadir profesional
  </Typography>
        </Button>
        
      </Box>
    </Container>
  );
};

export default Personal;