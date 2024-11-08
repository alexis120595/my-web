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
    <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
        {userEmail && (
          <Typography variant="h6">
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
        >
          <Typography variant="h6" sx={{ padding: '8px 16px' }}>
            Mi Perfil
          </Typography>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/mi-perfil')}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            Configuración
          </MenuItem>
          <Divider />
          <Typography variant="h6" sx={{ padding: '8px 16px' }}>
            Sección Empresa
          </Typography>
          <Divider />
          <MenuItem disabled>
            <ListItemIcon>
              <HomeIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="h6" sx={{ padding: '8px 16px', color: 'black' }}>
              Mis Empresas
            </Typography>
          </MenuItem>
          {empresas.map((empresa) => (
            <MenuItem key={empresa.id} onClick={() => handleEmpresaClick(empresa.id)} sx={{ justifyContent: 'flex-start' }}>
              {empresa.imagen_url && (
                <img
                  src={empresa.imagen_url}
                  alt={empresa.nombre}
                  style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '20px' }}
                />
              )}
              <Typography variant="body1" sx={{ marginLeft: '10px' }}>
                {empresa.nombre}
              </Typography>
            </MenuItem>
          ))}
          <MenuItem onClick={() => handleMenuItemClick('/crear-servicio')} sx={{ fontSize: '1.2rem' }}>
            <ListItemIcon>
              <StoreIcon fontSize="small" />
            </ListItemIcon>
            Añadir Empresa
          </MenuItem>
          <Divider />
          <Typography variant="h6" sx={{ padding: '8px 16px' }}>
            Sección Cliente
          </Typography>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/buscar-empresa')}>
            <ListItemIcon>
              <CalendarTodayIcon fontSize="small" />
            </ListItemIcon>
            Reservar turno
          </MenuItem>
          <MenuItem onClick={handleMisTurnosClick}>
            <ListItemIcon>
              <EventIcon fontSize="small" />
            </ListItemIcon>
            Mis Turnos
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/logout')} style={{ color: 'red' }}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Cerrar Sesión
          </MenuItem>
          <Divider />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
