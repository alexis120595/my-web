import React, { useState, useEffect } from 'react';
import { Container, Box, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MiEmpresa = () => {
  const [empresaNombre, setEmpresaNombre] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const nombre = localStorage.getItem('empresaNombre');
      console.log('Nombre de la empresa recuperado:',nombre);
      if (nombre) {
        setEmpresaNombre(nombre);
      }
    }, []);

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
        <h1>Mi Empresa</h1>
        {empresaNombre && <h2>{empresaNombre}</h2>}
      
      <Box mt={5} textAlign="center">
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAgendaClick}>
          Agenda
        </Button>
        <Button variant="contained" color="secondary" fullWidth sx={{ mt: 2 }} onClick={handleServiciosClick}>
          Servicios
        </Button>
        <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}  onClick={handlePersonalClick}>
          Personal
        </Button>
        <Button variant="contained" color="warning" fullWidth sx={{ mt: 2 }} onClick={handleClientesClick}>
          Clientes
        </Button>
        <Button variant="contained" color="info" fullWidth sx={{ mt: 2 }} onClick={handleSucursalesClick}>
          Sucursales
        </Button>
        <Button variant="contained" color="error" fullWidth sx={{ mt: 2 }} onClick={handleAjustesEmpresaClick}>
          Ajustes
        </Button>
      </Box>
    </Container>
  );
};

export default MiEmpresa;