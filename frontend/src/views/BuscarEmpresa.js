import React, { useState } from 'react';
import { Container, Box, TextField, Typography, List, ListItem, ListItemText, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BuscarEmpresa = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const empresas = [
    { id: 1, nombre: 'Empresa 1' },
    { id: 2, nombre: 'Empresa 2' },
    { id: 3, nombre: 'Empresa 3' },
    // Agrega más empresas según sea necesario
  ];

  const handleBuscar = () => {
    const resultadosFiltrados = empresas.filter(empresa =>
      empresa.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Buscar Empresa
        </Typography>
        <p>Si conoces una empresa o negocio realiza la busqueda</p>
        <TextField
          label="Ingresa nombre o direccion"
          variant="outlined"
          fullWidth
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          sx={{ mt: 2 }}
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
        <List sx={{ mt: 2 }}>
          {resultados.map((empresa) => (
            <ListItem key={empresa.id}>
              <ListItemText primary={empresa.nombre} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BuscarEmpresa;