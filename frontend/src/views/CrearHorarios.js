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
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Hora"
          variant="outlined"
          fullWidth
          margin="normal"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
        />
        <TextField
          label="Barbero ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={barberoId}
          onChange={(e) => setBarberoId(e.target.value)}
        />
        <TextField
          label="Empresa ID"
          variant="outlined"
          fullWidth
          margin="normal"
          value={empresaId}
          onChange={(e) => setEmpresaId(e.target.value)}
        />
        <Box mt={2} />
        <Button type="submit" variant="contained" color="primary">
          Crear Horario
        </Button>
      </form>
      {success && <Typography color="primary">{success}</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default CrearHorarios;