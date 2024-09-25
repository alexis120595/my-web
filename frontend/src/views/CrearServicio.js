import React, { useState } from 'react';
import Mapa from '../components/Mapa';
import SubidaImagenes from '../components/SubidaImagenes';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const CrearServicio = () => {
  const [rubro, setRubro] = useState('');
  const [nombre, setNombre] = useState('');
  const [eslogan, setEslogan] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const handleRubroChange = (event) => {
    setRubro(event.target.value);
  };

  const handleImageUpload = (url) => {
    setImagenUrl(url);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nombre: nombre,
      eslogan: eslogan,
      rubro: rubro,
      ubicacion: ubicacion,
      imagen_url: imagenUrl
    };

    try {
      const response = await axios.post('http://localhost:8000/empresa', formData);
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Crear Empresa</h1>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Nombre de la Empresa"
            variant="outlined"
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            fullWidth
            label="Eslogan"
            variant="outlined"
            margin="normal"
            value={eslogan}
            onChange={(e) => setEslogan(e.target.value)}
          />
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Selecciona un rubro</InputLabel>
            <Select
              value={rubro}
              onChange={handleRubroChange}
              label="Selecciona un rubro"
            >
              <MenuItem value="">
                <em>Ninguno</em>
              </MenuItem>
              <MenuItem value="rubro1">Rubro 1</MenuItem>
              <MenuItem value="rubro2">Rubro 2</MenuItem>
              <MenuItem value="rubro3">Rubro 3</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <h1>Ubicacion</h1>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Buscar ubicación"
            variant="outlined"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
        </Box>
        <Mapa />
        <SubidaImagenes onImageUpload={handleImageUpload} />
        <Box mt={2}>
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default CrearServicio;