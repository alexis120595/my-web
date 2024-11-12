import React, { useState, useEffect } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';



const MiEmpresa = () => {
  const { empresaId } = useParams();
  const [empresaNombre, setEmpresaNombre] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [empresaData, setEmpresaData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
      
      if (empresaId) {
        fetchEmpresaData(empresaId);
      }
    }, [empresaId]);
  

    const fetchEmpresaData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${id}`);
        const empresa = response.data;
        setEmpresaNombre(empresa.nombre);
        setImagenUrl(empresa.imagen_url);
        setEmpresaData(empresa);
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
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Agenda</Typography>
          </Box>
               
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
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 40, mb: 1 }} />
            <Typography variant="h6">Servicios</Typography>
          </Box>
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
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <GroupIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">Personal</Typography>
      </Box>
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
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PersonIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">Clientes</Typography>
      </Box>
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
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LocationOnIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">Sucursales</Typography>
      </Box>
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
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SettingsIcon sx={{ fontSize: 40, mb: 1 }} />
        <Typography variant="h6">Ajustes</Typography>
      </Box>
        </Button>
      </Box>
    </Container>
  );
};

export default MiEmpresa;