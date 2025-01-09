// Archivos que contiene el componente de la lista de empleados de la empresa
import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText, Avatar } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const   Empleados = () => {
  // Se crea un estado para almacenar los empleados de la empresa
  const [barberos, setBarberos] = useState([]);
    const navigate = useNavigate();
// Se obtiene el id de la empresa del local storage y se llama a la función fetchBarberos
    useEffect(() => {
      const empresaId = localStorage.getItem('empresaId');
      if (empresaId) {
        fetchBarberos(empresaId);
      }
    }, []);
  // Función para obtener los empleados de la empresa
    const fetchBarberos = async (empresaId) => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
        setBarberos(response.data);
      } catch (error) {
        console.error('Error fetching personal:', error);
      }
    };

  const handleAddEmpleadoClick = () => {
    navigate('/crear-empleado');
  };

  return (
    <Container maxWidth="sm">
        <Box sx={{ mt: 8, textAlign: 'center' }}>
          {/*lista de empleados*/}
        <List>
          {barberos.length > 0 ? (
            barberos.map((barbero) => (
              <ListItem
                key={barbero.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  mb: 2,
                  padding: 2,
                  width: '200px'
                }}
              >
                {/*avatar del empleado*/}
                  <Avatar
                alt={`${barbero.nombre} ${barbero.apellido}`}
                src={barbero.imagen_url}
                sx={{ width: 56, height: 56, mr: 2 }}
              />
                <ListItemText primary={`${barbero.nombre} ${barbero.apellido}`} secondary={barbero.servicios_id} />
               
              </ListItem>
            ))
          ) : (
            <Typography>No hay personal disponible para esta empresa.</Typography>
          )}
        </List>
      
      </Box>
    </Container>
  );
};

export default Empleados;