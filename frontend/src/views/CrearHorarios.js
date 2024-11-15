// CrearHorarios.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Button, Typography, Box, Select, MenuItem, InputLabel, FormControl, Checkbox, ListItemText } from '@mui/material';
import { useLocation } from 'react-router-dom';


const CrearHorarios = () => {
  const location = useLocation();
  const barbero = location.state?.barbero;
  const [barberoId, setBarberoId] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [horariosSeleccionados, setHorariosSeleccionados] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Obtener barberoId y empresaId desde el localStorage
    if (barbero) {
      setBarberoId(barbero.id);
      setEmpresaId(barbero.empresa_id);
    } else {
      setError('No se pudo obtener la información del barbero o la empresa.');
    }

    // Generar lista de horas disponibles (por ejemplo, de 9:00 a 18:00 cada 30 minutos)
    const horas = [];
    for (let i = 9; i < 18; i++) {
      horas.push(`${i}:00`);
      horas.push(`${i}:30`);
    }
    setHorasDisponibles(horas);
  }, [barbero]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Construir el arreglo de horarios
      const horarios = horariosSeleccionados.map((hora) => ({
        hora,
        barbero_id: barberoId,
        empresa_id: empresaId,
      }));

      await axios.post('http://localhost:8000/horarios/multiples', {
        horarios,
      });
      setSuccess('Horarios creados exitosamente');
      setError('');
    } catch (err) {
      setError('Error al crear los horarios');
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Crear Horarios
        </Typography>
        <form onSubmit={handleSubmit}>
          {/* Eliminamos los campos de entrada para barberoId y empresaId */}

          <FormControl variant="outlined" fullWidth margin="normal" sx={{ width: '300px' }}>
            <InputLabel id="horarios-label">Seleccionar Horarios</InputLabel>
            <Select
              labelId="horarios-label"
              multiple
              value={horariosSeleccionados}
              onChange={(e) => setHorariosSeleccionados(e.target.value)}
              renderValue={(selected) => selected.join(', ')}
              label="Seleccionar Horarios"
              sx={{
                borderRadius: '25px', // Bordes redondeados
              }}
            >
              {horasDisponibles.map((hora) => (
                <MenuItem key={hora} value={hora}>
                  <Checkbox checked={horariosSeleccionados.indexOf(hora) > -1} />
                  <ListItemText primary={hora} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              mb: 2,
              mt: 2,
              backgroundColor: 'yellow',
              color: 'black',
              borderRadius: '25px',
              width: '200px',
            }}
          >
            Añadir Horarios
          </Button>
          </Box>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearHorarios;