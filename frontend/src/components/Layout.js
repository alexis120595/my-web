import React from 'react';
import { Box } from '@mui/material';
import SidebarImage from '../assets/recorte.png'; // Asegúrate de que la ruta es correcta

const Layout = ({ children }) => {
  return (
    <Box display="flex" height="100vh">
      {/* Lado Izquierdo con la Imagen */}
      <Box
        sx={{
          width: '700px', // Ajusta el ancho según las dimensiones de tu imagen
          height: '780px', // Ajusta la altura según las dimensiones de tu imagen
          backgroundImage: `url(${SidebarImage})`,
          backgroundSize: 'contain', // Asegura que la imagen completa sea visible
          backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
          backgroundPosition: 'center', // Centra la imagen dentro del Box
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