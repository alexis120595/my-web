import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';



const MiEmpresa = () => {
  const [empresaNombre, setEmpresaNombre] = useState(null);
  const [imagenUrl, setImagenUrl] = useState(null);
  const [empresaData, setEmpresaData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const empresaId = localStorage.getItem('empresaId');
      const nombre = localStorage.getItem('empresaNombre');
      const imagen = localStorage.getItem('empresaImagenUrl');

      console.log('ID de la empresa recuperado:', empresaId);
      console.log('Nombre de la empresa recuperado:',nombre);
      console.log('URL de la imagen de la empresa recuperada:', imagen);
      if (nombre) {
        setEmpresaNombre(nombre);
      }

      if (imagen) {
        setImagenUrl(imagen);
      }
      if (empresaId) {
        fetchEmpresaData(empresaId);
      }
    }, []);

    const fetchEmpresaData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${id}`);
        setEmpresaData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de la empresa:', error);
      }
    };

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
      
      {empresaNombre && imagenUrl && (
        <Box display="flex" alignItems="center" mb={4} ml={6} mt={4}>
          <img
            src={imagenUrl}
            alt="Logo de la empresa"
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              marginRight: '20px' // Espacio entre la imagen y el nombre
            }}
          />
          <Typography variant="h4" component="h2" sx={{ color: 'black' }}>
            {empresaNombre}
          </Typography>
        </Box>
      )}
      {empresaData && (
        <div>
          {/* Aquí puedes agregar más contenido relacionado con la empresa */}
        </div>
      )}
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