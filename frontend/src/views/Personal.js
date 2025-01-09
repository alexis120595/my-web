// # Vista que maneja la visualización y gestión del personal de una empresa.
// # Permite buscar, editar y añadir empleados, así como copiar un enlace al portapapeles.
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
} from '@mui/material'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SearchBarEmpleados from '../components/SearchBarEmpleados';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';

const Personal = () => {
    // # Estado para almacenar la lista de barberos y el término de búsqueda
  const [barberos, setBarberos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  // # Obtiene el ID de la empresa del localStorage y carga los barberos al montar el componente
  useEffect(() => {
    const empresaId = localStorage.getItem('empresaId');
    if (empresaId) {
      fetchBarberos(empresaId);
    }
  }, []);
  // # Función para obtener los barberos de la empresa desde el servidor
  const fetchBarberos = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error fetching personal:', error);
    }
  };
  // # Función para buscar barberos por nombre
  const handleSearch = async (nombre) => {
    try {
      const response = await axios.get(`http://localhost:8000/barberos/buscar?nombre=${nombre}`);
      console.log('Datos recibidos:', response.data);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error searching barberos:', error);
    }
  };
  // # Navega a la vista de creación de empleados
  const handleAddEmpleadoClick = () => {
    navigate('/crear-empleado');
  };
  // # Navega a la vista de edición de un barbero específico
  const handleEditClick = (e, id) => {
    e.stopPropagation(); 
    navigate(`/editar-profesional/${id}`);
  };

  // # Copia el enlace a la página principal al portapapeles y muestra un mensaje
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

  // # Navega a la vista de creación de horarios para un barbero específico
  const handleCrearHorariosClick = (barbero) => {
    navigate('/crear-horarios', { state: { barbero } });

  };
  // # Muestra el mensaje temporalmente y lo oculta después de 3 segundos
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
    sx={{
      width: { xs: '320px', sm: '359px' }, 
      padding: { xs: '16px', sm: '24px' }
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
        {/* # Barra de búsqueda de empleados */}
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
        {/* # Lista de barberos */}
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
                  backgroundColor: 'white', 
                  '&:hover': {
                    backgroundColor: 'lightgray', 
                  },
                }}
              >
                {/* # Avatar del barbero */}
                <Avatar
                  alt={`${barbero.nombre} ${barbero.apellido}`}
                  src={barbero.imagen_url}
                  sx={{ width: 44, height: 45, mr: 2

                  }}
                  
                />
                 {/* # Nombre y servicios del barbero */}
                <ListItemText
                  primary={`${barbero.nombre} ${barbero.apellido}`}
                  secondary={barbero.servicios_id}
                  primaryTypographyProps={{
                    sx: {
                      fontFamily: 'Poppins', 
                      fontSize: '16px', 
                      color: '#666666', 
                    },
                  }}
                  secondaryTypographyProps={{
                    sx: {
                      color: 'gray', 
                    },
                  }}
                  sx={{
                    '& .MuiListItemText-primary': {
                      color: '#666666', 
                    },
                  }}
                />
                {/* # Botón para editar el barbero */}
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
                  {/* # Botón para copiar el enlace al portapapeles */}
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
        {/* # Mensaje de confirmación al copiar el enlace */}
        {mensaje && (
  <Typography
    sx={{
      fontFamily: 'Poppins',
      fontSize: '14px',
      color: 'white',
      mt: 1,    
      ml: -4   
    }}
  >
    {mensaje}
  </Typography>
)}
        {/* # Botón para añadir un nuevo profesional */}
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
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: '#000000', 
      textTransform: 'none', 
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