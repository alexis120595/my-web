// # Vista que muestra la información de la empresa y ofrece accesos rápidos a diferentes secciones (Agenda, Servicios, Personal, Clientes, Sucursales, Ajustes).
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
   // # Captura el ID de la empresa a través de la URL (useParams)
  const { empresaId } = useParams();
    // # Estados para almacenar datos de la empresa e imagen
  const [empresaNombre, setEmpresaNombre] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [empresaData, setEmpresaData] = useState({});
  // # Hook para cambiar de vista
  const navigate = useNavigate();
// # Llama a la API con el ID de la empresa apenas se carga el componente
  useEffect(() => {
      
      if (empresaId) {
        fetchEmpresaData(empresaId);
      }
    }, [empresaId]);
  
     // # Función que obtiene los datos de la empresa y los guarda en el estado
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
    // # Manejadores de clic que redirigen a distintas rutas
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
    <Container maxWidth="sm"
    sx={{
      width: { xs: '320px', sm: '358px' },
    height:'400px',
    padding: { xs: '16px', sm: '24px' },
   
    }}>
      {/* # Cabecera: Logo y nombre de la empresa */}
      {empresaNombre && imagenUrl && (
        <Box display="flex" alignItems="center" mb={4}  mt={4}>
          <img
            src={imagenUrl}
            alt="Logo de la empresa"
            style={{
              width: '61px',
              height: '58px',
              borderRadius: '50%',
              marginRight: '20px' 
            }}
          />
          <Typography variant="h4" component="h2" sx={{ color: 'white', 
            fontFamily:'Poppins',
            fontSize:'24px',
             }}>
            {empresaNombre}
          </Typography>
        </Box>
      )}
      {empresaData && (
        <div>
          {/* Aquí puedes agregar más contenido relacionado con la empresa */}
        </div>
      )}
      {/* # Botones funcionales: Agenda, Servicios, etc. */}
      <Box mt={5} textAlign="center"
       sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', 
        gap: '24px', 
        justifyContent: 'center',
      }}>
        {/* # Botón para la sección de Agenda */}
        <Button variant="contained" sx={{ 
         
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px'
          
            
            }} onClick={handleAgendaClick}
            >
            
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* # Icono de calendario para la sección de Agenda */}
            <CalendarTodayIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
            <Typography variant="h6" sx={{fontFamily:'Poppins', 
              fontSize:'12px',
            }}>Agenda</Typography>
          </Box>
               
            </Button>
              {/* # Botón para la sección de Servicios */}
            <Button variant="contained" sx={{ 
            
              backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px' 
            }} onClick={handleServiciosClick}
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* # Icono de notificaciones para la sección de Servicios */}
            <NotificationsIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
            <Typography variant="h6"
            sx={{fontFamily:'Poppins', 
              fontSize:'12px',
            }}>Servicios</Typography>
          </Box>
            </Button>
            <Button variant="contained" sx={{ 
            
              backgroundColor: '#FFD000', 
              color: 'black', 
              width: '167px', 
              height: '90px',
              borderRadius: '15px' 
        }} onClick={handlePersonalClick}
        >
        {/* # Botón para la sección de Personal */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* # Icono de grupo para la sección de Personal */}
        <GroupIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Personal</Typography>
      </Box>
        </Button>
        <Button variant="contained" sx={{ 
        
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px'
        }} onClick={handleClientesClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* # Icono de persona para la sección de Clientes */}
        <PersonIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Clientes</Typography>
      </Box>
        </Button>
        {/* # Botón para la sección de Clientes */}
        <Button variant="contained" sx={{ 
        
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px'
        }} onClick={handleSucursalesClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         {/* # Icono de ubicación para la sección de Sucursales */}
        <LocationOnIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Sucursales</Typography>
      </Box>
        </Button>
        {/* # Botón para la sección de Sucursales */}
        <Button variant="contained" sx={{ 
        
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px' 
        }} onClick={handleAjustesEmpresaClick}
        >
        {/* # Botón para la sección de Ajustes */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* # Icono de ajustes para la sección de Ajustes */}
        <SettingsIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Ajustes</Typography>
      </Box>
        </Button>
      </Box>
    </Container>
  );
};

export default MiEmpresa;