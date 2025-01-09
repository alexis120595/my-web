// vista para buscar una empresa por su nombre o dirección
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Typography, List, ListItem, ListItemText, InputAdornment, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BuscarEmpresa = () => {
  // Estados para el valor de la búsqueda y los resultados
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

// Función para buscar una empresa por su nombre
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
// Función que guarda el id de la empresa seleccionada en el localStorage y redirige a la página de home
  const handleSeleccionarEmpresa = (empresa) => {
    localStorage.setItem('empresaId', empresa.id);
    navigate('/home');
  };

  return (
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, 
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, 
      marginTop: { xs: 2, sm: 5 }, 
    }}>
      <Box mt={5} >
        <Typography variant="h4" gutterBottom style={{ color: 'white',
          fontFamily: 'Poppins',
          fontSize: '24px',
         }}>
          Buscar Empresa
        </Typography>
        <Typography variant="h4" gutterBottom style={{ color: 'white', fontSize: '12px',  width:"360px",
      height:"32px",
     
      fontFamily: 'Poppins',
      }}>
          si conoces una empresa o negocio realiza la busqueda
        </Typography>
        {/* Campo de texto para ingresar el nombre o dirección de la empresa */}
        <TextField
        label={isFocused ? '' : 'Ingresa nombre o dirección'}
          variant="outlined"
          fullWidth
          onFocus={() => setIsFocused(true)} 
          onBlur={() => setIsFocused(false)}
          margin="normal"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            
            startAdornment: (
              
              <InputAdornment position="start">
                <IconButton onClick={handleBuscar}>
                  {/* Icono de búsqueda */}
                  <SearchIcon style= {{ color: '#313131',  width: 18, height: 18  }}/>
                </IconButton>
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
          sx={{
            width:"360px",
            height:"50px",
            '& .MuiOutlinedInput-root': {
              borderRadius: '25px', 
              backgroundColor: 'white', 
              color: 'black', 
              '& input': {
                color: 'black', 
              },
              '& fieldset': {
                borderColor: 'white', 
              },
              '&:hover fieldset': {
                borderColor: 'white', 
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', 
              },
              '&.Mui-focused': {
                color: 'white', 
              },
            },
            '& .MuiInputLabel-root': {
              color: '#666666', 
                marginTop: '20px',
                marginLeft: '30px',
              
                fontFamily: 'Poppins',
                fontSize: '14px',
                left: '50%', 
                transform: 'translateX(-100%)', 
                textAlign: 'center', 
            },
            '& .MuiInputAdornment-root': {
              color: 'white',
            },
          }}


        />
        {/* Lista de resultados de la búsqueda */}
       <List>
          {resultados.map((empresa) => (
            <ListItem key={empresa.id}>
              <ListItemText
                primary={empresa.nombre}
                secondary={empresa.eslogan}
                sx={{
                  '& .MuiListItemText-primary': {
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    color: '#666666',
                  },
                  '& .MuiListItemText-secondary': {
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    color: '#666666',
                  },
                }}
              />
              {/* Botón para seleccionar la empresa */}
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSeleccionarEmpresa(empresa)}
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  textTransform: 'none',
                  backgroundColor: '#FFD000', 
                  color: 'black',
                  '&:hover': {
                    backgroundColor: '#FFC107', 
                  },
                }}
              >
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