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
        <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '1rem' }}>
          si conoces una empresa o negocio realiza la busqueda
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
            style: { color: 'white' },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes redondeados
              backgroundColor: 'white', // Color de fondo
              color: 'black', // Color del texto
              '& input': {
                color: 'black', // Color del texto que se escribe
              },
              '& fieldset': {
                borderColor: 'white', // Color del borde
              },
              '&:hover fieldset': {
                borderColor: 'white', // Color del borde al pasar el mouse
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Mantener el color del borde al enfocar
              },
              '&.Mui-focused': {
                color: 'white', // Mantener el color del texto al enfocar
              },
            },
            '& .MuiInputLabel-root': {
              color: 'black', // Color del label
            },
            '& .MuiInputAdornment-root': {
              color: 'white', // Color del icono
            },
          }}


        />
        <List>
          {resultados.map((empresa) => (
            <ListItem key={empresa.id}   >
              <ListItemText primary={empresa.nombre} secondary={empresa.eslogan}  sx={{ 
    '& .MuiListItemText-secondary': {
      color: 'white',
    },
  }} />
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