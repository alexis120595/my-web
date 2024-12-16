import React, { useState } from 'react';
import axios from 'axios';
import { Container, Box, TextField, Typography, List, ListItem, ListItemText, InputAdornment, IconButton, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BuscarEmpresa = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);

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
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, // Ancho 100% en pantallas pequeñas, 360px en pantallas medianas y grandes
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, // Padding 2 en pantallas pequeñas, 0 en pantallas medianas y grandes
      marginTop: { xs: 2, sm: 5 }, // Margen superior 2 en pantallas pequeñas, 5 en pantallas medianas y grandes
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
        <TextField
        label={isFocused ? '' : 'Ingresa nombre o dirección'}
          variant="outlined"
          fullWidth
          onFocus={() => setIsFocused(true)} // Actualiza el estado al enfocar
          onBlur={() => setIsFocused(false)}
          margin="normal"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          InputProps={{
            
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleBuscar}>
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
              borderRadius: '25px', // Bordes redondeados
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
              color: '#666666', // Color del label
                marginTop: '20px',
                marginLeft: '30px',
              
                fontFamily: 'Poppins',
                fontSize: '14px',
                left: '50%', // Centrar el label horizontalmente
                transform: 'translateX(-100%)', // Ajustar la posición del label
                textAlign: 'center', 
            },
            '& .MuiInputAdornment-root': {
              color: 'white', // Color del icono
            },
          }}


        />
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleSeleccionarEmpresa(empresa)}
                sx={{
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  textTransform: 'none',
                  backgroundColor: '#FFD000', // Color de fondo amarillo
                  color: 'black', // Color del texto
                  '&:hover': {
                    backgroundColor: '#FFC107', // Color de fondo al pasar el mouse
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