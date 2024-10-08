import React, { useState } from 'react';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const CrearHorarios = () => {
  const [barberoId, setBarberoId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [hora, setHora] = useState('');
 
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/horarios', {
        hora,
        
        barbero_id: barberoId,
        empresa_id: empresaId
      });
      setSuccess('Horario creado exitosamente');
      setError('');
    } catch (err) {
      setError('Error al crear el horario');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Crear Horario
        </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Hora"
          variant="outlined"
          fullWidth
          margin="normal"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          sx={{ 
            width:"300px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
              color: 'black', // Color del texto
              '& fieldset': {
                borderColor: 'black', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'black', // Color del borde al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Color del borde al enfocar
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Color del label
            },
            '& .MuiInputAdornment-root': {
              color: 'black', // Color del icono
            },
          }} 
        />
        <TextField
          label="Barbero ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={barberoId}
          onChange={(e) => setBarberoId(e.target.value)}
          sx={{ 
            width:"300px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
              color: 'black', // Color del texto
              '& fieldset': {
                borderColor: 'black', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'black', // Color del borde al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Color del borde al enfocar
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Color del label
            },
            '& .MuiInputAdornment-root': {
              color: 'black', // Color del icono
            },
          }} 
        />
        <TextField
          label="Empresa ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
          sx={{ 
            width:"300px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
              color: 'black', // Color del texto
              '& fieldset': {
                borderColor: 'black', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'black', // Color del borde al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Color del borde al enfocar
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Color del label
            },
            '& .MuiInputAdornment-root': {
              color: 'black', // Color del icono
            },
          }} 
        />
        <Box mt={2} />
        <Button type="submit" variant="contained" color="primary"
          sx={{ 
            mb:2,
            mt: 2, // Margen inferior
            backgroundColor: 'yellow', // Color de fondo del botón
            color: 'black', // Color del texto
            borderRadius: '25px', // Bordes redondeados
            display: 'block', // Para centrar el botón
             // M
             ml: 22, // Margen izquierdo
            width: '200px', // Ancho del botón ajustado al contenido
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
            }
          }}>
          Añadir Horario
        </Button>
      </form>
      {success && <Typography color="primary">{success}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Box>
    </Container>
  );
};

export default CrearHorarios;