// Archivo que se creo para  para crear un diseño de dos columnas, 
// donde la columna izquierda contiene una imagen y 
// la columna derecha contiene el contenido principal de la aplicación.
import React from 'react';
import { Box } from '@mui/material';
import SidebarImage from '../assets/recorte.png'; 

const Layout = ({ children }) => {
  return (
    <Box display="flex" height="100vh">
      {/* Lado Izquierdo con la Imagen */}
      <Box
        sx={{
          width: '700px', 
          height: '780px', 
          backgroundImage: `url(${SidebarImage})`,
          backgroundSize: 'contain', 
          backgroundRepeat: 'no-repeat', 
          backgroundPosition: 'center', 
          display: { xs: 'none', md: 'block' }
        }}
      ></Box>

      {/* Contenido Principal */}
      <Box sx={{ flexGrow: 1, padding: 2, overflowY: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;