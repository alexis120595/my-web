import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Typography, List, ListItem, ListItemText, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarEmpresa = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    try {
      const response = await axios.get('http://localhost:8000/empresa', {
        params: {
          nombre: busqueda
        }
      });
      setResultados([response.data]);
    } catch (error) {
      console.error("Error al buscar la empresa:", error);
      setResultados([]);
    }
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Buscar Empresa
        </Typography>
        <TextField
          label="Buscar Empresa"
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleBuscar}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <List>
          {resultados.map((empresa) => (
            <ListItem key={empresa.id}>
              <ListItemText primary={empresa.nombre} secondary={empresa.eslogan} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BuscarEmpresa;