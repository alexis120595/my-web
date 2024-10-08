import React, { useState, useEffect } from 'react';
import { Container, Box, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';



const MiEmpresa = () => {
  const [empresaNombre, setEmpresaNombre] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const nombre = localStorage.getItem('empresaNombre');
      console.log('Nombre de la empresa recuperado:',nombre);
      if (nombre) {
        setEmpresaNombre(nombre);
      }
    }, []);

    const handleAgendaClick = () => {
        navigate('/agenda-empresa');
    };

    const handleServiciosClick = () => {
        navigate('/servicios-disponibles');
      };
      const handlePersonalClick = () => {
        navigate('/personal');
      };
      const handleClientesClick = () => {
        navigate('/clientes');
      };

      const handleSucursalesClick = () => {
        navigate('/sucursales');
      };

      const handleAjustesEmpresaClick = () => {
        navigate('/ajustes-empresa');
      };
  return (
    <Container maxWidth="sm">
      <h1>Mi Empresa</h1>
      {empresaNombre && <h2>{empresaNombre}</h2>}
      
      <Box mt={5} textAlign="center">
        <Button variant="contained" sx={{ 
          mr: 2, 
          ml: 2,
          mt:2,
          mb:2, // Added margin bottom to separate buttons
          backgroundColor: 'yellow', 
          color: 'black', 
          width: '200px', 
          height: '100px',
           borderRadius: '25px'
          
            // Added borderRadius for rounded corners
            }} onClick={handleAgendaClick}
            startIcon={<CalendarTodayIcon />}
            >
              Agenda
            </Button>
            <Button variant="contained" sx={{ 
              mr: 2, 
              ml: 2, // Added margin bottom to separate buttons
              backgroundColor: 'yellow', 
              color: 'black', 
              width: '200px', 
              height: '100px',
              borderRadius: '25px' // Added borderRadius for rounded corners
            }} onClick={handleServiciosClick}
            startIcon={<NotificationsIcon />}
            >
              Servicios
            </Button>
            <Button variant="contained" sx={{ 
              mr: 2, 
              ml: 2,
              mt:2,
              mb:2, // Added margin bottom to separate buttons
          backgroundColor: 'yellow', 
          color: 'black', 
          width: '200px', 
          height: '100px',
          borderRadius: '25px' // Added borderRadius for rounded corners
        }} onClick={handlePersonalClick}
        startIcon={<GroupIcon />}
        >
          Personal
        </Button>
        <Button variant="contained" sx={{ 
          mr: 2, 
          ml: 2, // Added margin bottom to separate buttons
          backgroundColor: 'yellow', 
          color: 'black', 
          width: '200px', 
          height: '100px',
          borderRadius: '25px' // Added borderRadius for rounded corners
        }} onClick={handleClientesClick}
        startIcon={<PersonIcon />} 
        >
          Clientes
        </Button>
        <Button variant="contained" sx={{ 
          mr: 2, 
          ml: 2, // Added margin bottom to separate buttons
          mt:2,
          mb:2,
          backgroundColor: 'yellow', 
          color: 'black', 
          width: '200px', 
          height: '100px',
          borderRadius: '25px' // Added borderRadius for rounded corners
        }} onClick={handleSucursalesClick}
        startIcon={<LocationOnIcon />}
        >
          Sucursales
        </Button>
        <Button variant="contained" sx={{ 
          mr: 2, 
          ml: 2, // Added margin bottom to separate buttons
          backgroundColor: 'yellow', 
          color: 'black', 
          width: '200px', 
          height: '100px',
          borderRadius: '25px' // Added borderRadius for rounded corners
        }} onClick={handleAjustesEmpresaClick}
        startIcon={<SettingsIcon />}
        >
          Ajustes
        </Button>
      </Box>
    </Container>
  );
};

export default MiEmpresa;