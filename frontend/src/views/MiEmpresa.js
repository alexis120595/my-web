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
    <Container maxWidth="sm"
    sx={{width:'358px',
    height:'400px',
    }}>
      
      {empresaNombre && imagenUrl && (
        <Box display="flex" alignItems="center" mb={4} ml={6} mt={4}>
          <img
            src={imagenUrl}
            alt="Logo de la empresa"
            style={{
              width: '61px',
              height: '58px',
              borderRadius: '50%',
              marginRight: '20px' // Espacio entre la imagen y el nombre
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
      <Box mt={5} textAlign="center"
       sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // 2 columnas
        gap: '24px', // Espacio entre los elementos
      }}>
        <Button variant="contained" sx={{ 
         
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px'
          
            // Added borderRadius for rounded corners
            }} onClick={handleAgendaClick}
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <CalendarTodayIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
            <Typography variant="h6" sx={{fontFamily:'Poppins', 
              fontSize:'12px',
            }}>Agenda</Typography>
          </Box>
               
            </Button>
            <Button variant="contained" sx={{ 
            
              backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px' // Added borderRadius for rounded corners
            }} onClick={handleServiciosClick}
            >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
              borderRadius: '15px' // Added borderRadius for rounded corners
        }} onClick={handlePersonalClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          borderRadius: '15px'// Added borderRadius for rounded corners
        }} onClick={handleClientesClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PersonIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Clientes</Typography>
      </Box>
        </Button>
        <Button variant="contained" sx={{ 
        
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px'// Added borderRadius for rounded corners
        }} onClick={handleSucursalesClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <LocationOnIcon sx={{  mb: 1,  width: '40px',
    height: '40px', }} />
        <Typography variant="h6"
        sx={{fontFamily:'Poppins', 
          fontSize:'12px',
        }}>Sucursales</Typography>
      </Box>
        </Button>
        <Button variant="contained" sx={{ 
        
          backgroundColor: '#FFD000', 
          color: 'black', 
          width: '167px', 
          height: '90px',
          borderRadius: '15px' // Added borderRadius for rounded corners
        }} onClick={handleAjustesEmpresaClick}
        >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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