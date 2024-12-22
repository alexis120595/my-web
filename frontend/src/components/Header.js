import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
  const { userEmail } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastReservaId, setLastReservaId] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedReservaId = localStorage.getItem('lastReservaId');
    if (storedReservaId) {
      setLastReservaId(storedReservaId);
    }

    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchEmpresasUsuario(userId);
    }
  }, []);

  const fetchEmpresasUsuario = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresas/usuario/${userId}`);
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching user companies:', error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleEmpresaClick = (empresaId) => {
    localStorage.setItem('empresaId', empresaId); // Guardar el ID de la empresa en el almacenamiento local
    navigate(`/mi-empresa/${empresaId}`); // Navegar a la página de detalles de la empresa
    handleMenuClose();
  };


  const handleMisTurnosClick = () => {
    if (lastReservaId) {
      navigate('/reservas-usuario');
    } else {
      console.error('No hay reservas disponibles');
    }
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#121212', color: 'white',
     boxShadow: 'none',
     
     }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        {userEmail && (
          <Typography variant="h6"
          sx={{ 
            
            fontWeight: 'bold',
             fontSize: '16px',
          fontFamily: 'Manrope',
          marginRight: '20px',
         
          }}
          >
            {userEmail}
          </Typography>
        )}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
          sx: {
            width: '264px',    // Ancho deseado
            maxHeight: '507px', // Alto máximo deseado
            borderRadius: '15px', // Bordes redondeados en la parte inferior
          },
        }}
        >
          <Typography variant="h6" sx={{ padding: '8px 16px',
            fontFamily: 'Popins',
             fontSize: '20px',
              color: '#3A3A3A'
          }}>
            Mi Perfil
          </Typography>
          
          <MenuItem onClick={() => handleMenuItemClick('/mi-perfil')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small"
              sx={{width: '20px', height: '20px', color: '#3A3A3A'}}
              />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize:'14px',  color: '#3A3A3A' }}>
    Configuración
  </Typography>
          </MenuItem>
        
          <Typography variant="h6" sx={{ padding: '8px 16px', fontFamily: 'Poppins', fontSize:'12px',  color: '#3A3A3A' }}>
            Sección Empresa
          </Typography>
        
          <MenuItem disabled>
            <ListItemIcon>
              <HomeIcon fontSize="small"
              sx={{width: '20px', height: '20px', color: '#3A3A3A'}}
              />
            </ListItemIcon>
            <Typography variant="h6" sx={{ padding: '8px 16px',  color: '#3A3A3A', fontFamily: 'Poppins', fontSize:'14px' }}>
              Mis Empresas
            </Typography>
          </MenuItem>
          {empresas.map((empresa) => (
            <MenuItem key={empresa.id} onClick={() => handleEmpresaClick(empresa.id)} sx={{ justifyContent: 'flex-start' }}>
              {empresa.imagen_url && (
                <img
                  src={empresa.imagen_url}
                  alt={empresa.nombre}
                  style={{ width: '18px', height: '18px', borderRadius: '50%', marginLeft: '20px' }}
                />
              )}
              <Typography variant="body1" sx={{ marginLeft: '10px', fontFamily: 'Poppins', fontSize:'14px',  color: '#3A3A3A' }}>
                {empresa.nombre}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick('/crear-servicio')} sx={{ fontSize: '1.2rem' }}>
            <ListItemIcon>
              <StoreIcon fontSize="small"
              sx={{width: '20px', height: '20px', color: '#3A3A3A'}}
              />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize:'14px',  color: '#3A3A3A' }}>
    Añadir empresa
  </Typography>
          </MenuItem>
         
          <Typography variant="h6" sx={{ padding: '8px 16px', fontFamily: 'Poppins', fontSize:'12px',  color: '#3A3A3A' }}>
            Sección Cliente
          </Typography>
          
          <MenuItem onClick={() => handleMenuItemClick('/buscar-empresa')}>
            <ListItemIcon>
              <CalendarTodayIcon fontSize="small" 
               sx={{width: '20px', height: '20px', color: '#3A3A3A'}}
              />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize:'14px',  color: '#3A3A3A' }}>
    Reservar Turno
  </Typography>
          </MenuItem>
          <MenuItem onClick={handleMisTurnosClick}>
            <ListItemIcon>
              <EventIcon fontSize="small" 
               sx={{width: '20px', height: '20px', color: '#3A3A3A'}}
              />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize:'14px',  color: '#3A3A3A' }}>
    Mis Turnos
  </Typography>
          </MenuItem>
          
          <MenuItem onClick={() => handleMenuItemClick('/')} style={{ color: 'red' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small"
              sx={{width: '20px', height: '20px', color: '#EC1818'}}
              />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize:'14px',  color: '#EC1818' }}>
    Cerrar Sesión
  </Typography>
          </MenuItem>
          
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
