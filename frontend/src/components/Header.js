// Archivo que contiene el header de la aplicación
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Divider, ListItemIcon, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';

const Header = () => {
  // Obtener el correo electrónico del usuario del contexto
  const { userEmail } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [lastReservaId, setLastReservaId] = useState(null);
  const [empresas, setEmpresas] = useState([]);
  const navigate = useNavigate();

  //funcion que se ejecuta al cargar el componente y obtiene el id de la ultima reserva
  useEffect(() => {
    const storedReservaId = localStorage.getItem('lastReservaId');
    if (storedReservaId) {
      setLastReservaId(storedReservaId);
    }
// funcion que se ejecuta al cargar el componente y obtiene las empresas del usuario
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchEmpresasUsuario(userId);
    }
  }, []);
// funcion para obtener las empresas del usuario
  const fetchEmpresasUsuario = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresas/usuario/${userId}`);
      setEmpresas(response.data);
    } catch (error) {
      console.error('Error fetching user companies:', error);
    }
  };

// funciones para manejar el menu y abrirlo
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
// funciones para manejar el menu y cerrarlo
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
// funcion para manejar el click en un item del menu
  const handleMenuItemClick = (path) => {
    navigate(path);
    handleMenuClose();
  };
// funcion para manejar el click en una empresa y guardar el id en el almacenamiento local
  const handleEmpresaClick = (empresaId) => {
    localStorage.setItem('empresaId', empresaId); 
    // Navegar a la página de detalles de la empresa
    navigate(`/mi-empresa/${empresaId}`); 
    handleMenuClose();
  };
// funcion para manejar el click en mis turnos y navegar a la pagina de mis turnos
  const handleMisTurnosClick = () => {
    if (lastReservaId) {
      navigate('/reservas-usuario');
    } else {
      console.error('No hay reservas disponibles');
    }
    handleMenuClose();
  };

  return (
    
    <AppBar position="static" sx={{
       backgroundColor: '#121212',
       color: 'white',
       boxShadow: 'none',
       width: { xs: '100%', sm: '600px' },     
       marginLeft: 'auto',
    }}>
      {/* Barra de Herramientas */}
      <Toolbar>
        
        {/* Logo en el lado izquierdo */}
        <img src={logo} alt="Logo de la Aplicación" className="h-[26px] w-[115px] mr-2" />
        
        {/* Spacer para empujar los elementos siguientes al lado derecho */}
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Correo del Usuario */}
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
        
        {/* Botón de Menú */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Menú Desplegable */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: '264px',    
              maxHeight: '507px', 
              borderRadius: '15px', 
            },
          }}
        >
          <Typography variant="h6" sx={{
            padding: '8px 16px',
            fontFamily: 'Poppins',
            fontSize: '20px',
            color: '#3A3A3A'
          }}>
            Mi Perfil
          </Typography>
          
          <MenuItem onClick={() => handleMenuItemClick('/mi-perfil')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#3A3A3A' }} />
            </ListItemIcon>
            
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#3A3A3A' }}>
              Configuración
            </Typography>
          </MenuItem>
        
          <Typography variant="h6" sx={{
            padding: '8px 16px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            color: '#3A3A3A'
          }}>
            Sección Empresa
          </Typography>
        
          <MenuItem disabled>
            <ListItemIcon>
              <HomeIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#3A3A3A' }} />
            </ListItemIcon>
            <Typography variant="h6" sx={{
              padding: '8px 16px',
              color: '#3A3A3A',
              fontFamily: 'Poppins',
              fontSize: '14px'
            }}>
              Mis Empresas
            </Typography>
          </MenuItem>
          {/* Mapear las empresas del usuario */}
          {empresas.map((empresa) => (
            <MenuItem
              key={empresa.id}
              onClick={() => handleEmpresaClick(empresa.id)}
              sx={{ justifyContent: 'flex-start' }}
            >
              {/* Mostrar la imagen de la empresa si existe */}
              {empresa.imagen_url && (
                <img
                  src={empresa.imagen_url}
                  alt={empresa.nombre}
                  style={{ width: '18px', height: '18px', borderRadius: '50%', marginLeft: '20px' }}
                />
              )}
              <Typography variant="body1" sx={{
                marginLeft: '10px',
                fontFamily: 'Poppins',
                fontSize: '14px',
                color: '#3A3A3A'
              }}>
                {empresa.nombre}
              </Typography>
            </MenuItem>
          ))}
          {/* Agregar Empresa */}
          <MenuItem onClick={() => handleMenuItemClick('/crear-servicio')} sx={{ fontSize: '1.2rem' }}>
            <ListItemIcon>
              <StoreIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#3A3A3A' }} />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#3A3A3A' }}>
              Añadir empresa
            </Typography>
          </MenuItem>
         
          <Typography variant="h6" sx={{
            padding: '8px 16px',
            fontFamily: 'Poppins',
            fontSize: '12px',
            color: '#3A3A3A'
          }}>
            Sección Cliente
          </Typography>

          {/* Reservar Turno */}
          <MenuItem onClick={() => handleMenuItemClick('/buscar-empresa')}>
            <ListItemIcon>
              <CalendarTodayIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#3A3A3A' }} />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#3A3A3A' }}>
              Reservar Turno
            </Typography>
          </MenuItem>
          {/* Turnos del cliente */}
          <MenuItem onClick={handleMisTurnosClick}>
            <ListItemIcon>
              <EventIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#3A3A3A' }} />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#3A3A3A' }}>
              Mis Turnos
            </Typography>
          </MenuItem>
          {/* Cerrar Sesión */}
          <MenuItem onClick={() => handleMenuItemClick('/')} style={{ color: 'red' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ width: '20px', height: '20px', color: '#EC1818' }} />
            </ListItemIcon>
            <Typography sx={{ fontFamily: 'Poppins', fontSize: '14px', color: '#EC1818' }}>
              Cerrar Sesión
            </Typography>
          </MenuItem>
          
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
