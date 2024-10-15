import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Typography, List, ListItem, ListItemText, InputAdornment, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BuscarEmpresa = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();

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

  const handleSeleccionarEmpresa = (empresa) => {
    localStorage.setItem('empresaId', empresa.id);
    navigate('/home');
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom style={{ color: 'white' }}>
          Buscar Empresa
        </Typography>
        <TextField
         
          variant="outlined"
          fullWidth
          margin="normal"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleBuscar}>
                  <SearchIcon style= {{ color: 'black' }}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { color: 'black' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes redondeados
              color: 'black', // Color del texto
              '& fieldset': {
                borderColor: 'black', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'black', // Color del borde al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'black', // Mantener el color del borde al enfocar
              },
              '&.Mui-focused': {
                color: 'black', // Mantener el color del texto al enfocar
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
        <List>
          {resultados.map((empresa) => (
            <ListItem key={empresa.id}   >
              <ListItemText primary={empresa.nombre} secondary={empresa.eslogan} style={{ color: 'black' }} />
              <Button variant="contained" color="primary" onClick={() => handleSeleccionarEmpresa(empresa)}>
                Seleccionar
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default BuscarEmpresa;