import React, { useContext, useState} from 'react';
import { UserContext } from '../context/UserContext';
import { AppBar, Toolbar, Typography,  IconButton, Menu, MenuItem, Divider  } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { userEmail } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  
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

  return (
    <AppBar position="static">
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
          <MenuItem onClick={() => handleMenuItemClick('/mi-perfil')}>Configuracion</MenuItem>

          <Divider />

          <Typography variant="h6" sx={{ padding: '8px 16px' }}>
            Sección Empresa
          </Typography>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/mi-empresa')}>Mi Empresa</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/crear-servicio')}>Crear Empresa</MenuItem>
          <Divider />
          <Typography variant="h6" sx={{ padding: '8px 16px' }}>
            Sección Cliente
          </Typography>
          <Divider />
          <MenuItem onClick={() => handleMenuItemClick('/buscar-empresa')}>Reservar turno</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/detalle')}>Mis Turnos</MenuItem>
          <Divider />

          <MenuItem onClick={() => handleMenuItemClick('/logout')} style={{ color: 'red' }}>Cerrar Sesión</MenuItem>
          <Divider />
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;