import React, { useState } from 'react';
import Mapa from '../components/Mapa';
import SubidaImagenes from '../components/SubidaImagenes';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import HorariosEmpresa from '../components/HorariosEmpresa';
import { useNavigate } from 'react-router-dom';

const CrearServicio = () => {
  const [rubro, setRubro] = useState('');
  const [nombre, setNombre] = useState('');
  const [eslogan, setEslogan] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [horarios, setHorarios] = useState([]);
  const navigate = useNavigate();

  const handleRubroChange = (event) => {
    setRubro(event.target.value);
  };

 

  const handleHorariosChange = (newHorarios) => {
    setHorarios(newHorarios);
  };

  const handleLocationSelect = (address) => {
    setUbicacion(address);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el array de horarios a un objeto JSON
    const horariosJson = horarios.reduce((acc, horario) => {
      acc[horario.dia] = horario.horarios;
      return acc;
    }, {});

    const userId = localStorage.getItem('userId');
    
    const formData = {
      nombre: nombre,
      eslogan: eslogan,
      rubro: rubro,
      ubicacion: ubicacion,
      imagen_url: imagenUrl,
      horarios: horariosJson,
      user_id: userId,
    };

    console.log('Form Data:', formData); 

    try {
      const response = await axios.post('http://localhost:8000/empresa', formData);
      console.log('Response:', response.data);

      const {id: empresaId, nombre: empresaNombre, imagen_url: empresaImagenUrl  } = response.data;
      console.log('ID de la empresa almacenado:', empresaId);
      console.log('Nombre de la empresa almacenado:', empresaNombre);
      console.log('URL de la imagen de la empresa almacenada:', empresaImagenUrl);
      localStorage.setItem('empresaId', empresaId);
      localStorage.setItem('empresaNombre', empresaNombre);
      localStorage.setItem('empresaImagenUrl', empresaImagenUrl);
      navigate(`/mi-empresa/${empresaId}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box
    sx={{
      width: '100%',
      padding: { xs: '16px', sm: '24px' },
    }}
  >
     <Box display="flex" justifyContent="center"  >
        <Typography sx={{ 
          fontFamily: 'Poppins',
          fontSize: { xs: '20px', sm: '24px' }, // Tamaño de fuente responsivo
          fontWeight: 'bold',
          marginTop: { xs: '20px', sm: '0' },
          marginBottom: { xs: '16px', sm: '24px' },
          textAlign: { xs: 'left  ', sm: 'left' }, // Alineación responsiva
          width: { xs: '100%', sm: 'auto' },
          mr: { xs: '0', sm: '190px' }, // Margen izquierdo responsivo
        }}>
          Crear empresa
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="flex-end" >
      <SubidaImagenes onImageUpload={setImagenUrl} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" >
          <TextField
          
            label="Ingresar nombre"
            variant="outlined"
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              marginBottom:'24px',
              height:"50px",
              width:"362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                '& input': {
                  color: 'black'
                },
                '& fieldset': {
                  borderColor: 'white', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'white', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                fontSize: '14px', // Tamaño de la fuente
                fontFamily: 'Popins', // Tipo de fuente
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />
          <TextField
            
            label="Eslogan"
            variant="outlined"
            margin="normal"
            value={eslogan}
            onChange={(e) => setEslogan(e.target.value)}
            sx={{ 

              marginBottom:'24px',
              height:"50px",
              width:"362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
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
                  borderColor: 'white', // Color del borde al enfocar
                },
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                fontSize: '14px', // Tamaño de la fuente
                fontFamily: 'Popins', // Tipo de fuente
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
  <FormControl fullWidth variant="outlined" margin="normal" sx={{ width: "362px",
  height: "50px",
marginBottom:'24px',
  borderRadius: '25px', // Aseguramos que el Select tenga borderRadius
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px', // Bordes más redondeados
          backgroundColor: 'white', // Color de fondo
          '& input': {
            color: 'black', // Color del texto que se escribe
          },
          
          '& fieldset': {
            borderColor: 'white', // Color del borde
            borderWidth: '1px', // Ancho del borde
          },
          '&:hover fieldset': {
            borderColor: 'white', // Color del borde al pasar el mouse
            borderWidth: '1px', // Ancho del borde al pasar el mouse
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Color del borde al enfocar
            borderWidth: '1px', // Ancho del borde al enfocar
          },
        },
        '& .MuiInputLabel-root': {
          color: '#666666', // Color del label
                fontSize: '14px', // Tamaño de la fuente
                fontFamily: 'Popins', // Tipo de fuente
        },
        '& .MuiInputAdornment-root': {
          color: 'white', // Color del icono
        },
        '& .MuiSelect-icon': {
          color: 'white', // Color del icono del select
        },
        '& .MuiSelect-select': {
          color: 'white', // Color del texto del select
        }, }}>
    <InputLabel  sx={{ color: 'white' }}>Selecciona un rubro</InputLabel>
    <Select
      value={rubro}
      onChange={handleRubroChange}
      label="Selecciona un rubro"
      sx={{
        borderRadius: '20px', // Aseguramos que el Select tenga borderRadius
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', // Bordes más redondeados
          backgroundColor: 'white', // Color de fondo
          '& input': {
            color: 'black', // Color del texto que se escribe
          },
          
          '& fieldset': {
            borderColor: 'white', // Color del borde
            borderWidth: '1px', // Ancho del borde
          },
          '&:hover fieldset': {
            borderColor: 'white', // Color del borde al pasar el mouse
            borderWidth: '1px', // Ancho del borde al pasar el mouse
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', // Color del borde al enfocar
            borderWidth: '1px', // Ancho del borde al enfocar
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Color del label
        },
        '& .MuiInputAdornment-root': {
          color: 'white', // Color del icono
        },
        '& .MuiSelect-icon': {
          color: 'white', // Color del icono del select
        },
        '& .MuiSelect-select': {
          color: 'white', // Color del texto del select
        },
      }}
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
        </Box>
        
        <Box display="flex" justifyContent="center"  >
        <Typography sx={{  fontSize: '20px', marginRight:'250px',
fontFamily:'Popins',
marginBottom:'24px',
        }}>
          Ubicación
        </Typography>
      </Box>
        
        <Box display="flex" flexDirection="column" alignItems="center" >
          <TextField
            
            label="Ingresar dirección"
            variant="outlined"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            sx={{
              marginBottom:'32px',
              height: "50px",
              width: "362px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                backgroundColor: 'white',
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
              },
              '& .MuiInputLabel-root': {
                color: '#666666', // Color del label
                fontSize: '14px', // Tamaño de la fuente
                fontFamily: 'Popins', // Tipo de fuente
              },
              '& .MuiInputAdornment-root': {
                color: 'white',
              },
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Mapa onLocationSelect={handleLocationSelect} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
  <Typography
    sx={{
      fontSize: '20px',
      fontFamily: 'Poppins',
      marginBottom: '8px',
      // Otros estilos para el título
      marginRight: { xs: '185px', sm: '190px' },
    }}
  >
    Horarios de atención
  </Typography>
  <Typography
    sx={{
      fontSize: '14px',
      fontFamily: 'Poppins',
      color: 'white',
      textAlign: 'left', // Alinea el texto a la izquierda
      marginBottom: '8px',
      marginRight: { xs: '130px', sm: '140px' }, // Sin margen en pantallas pequeñas, margen en pantallas grandes
    }}
  >
    Utilizá el botón “todos” para aplicar el 

  </Typography>

  <Typography
    sx={{
      fontSize: '14px',
      fontFamily: 'Poppins',
      color: 'white',
      textAlign: 'left', // Alinea el texto a la izquierda
      marginBottom: '8px',
      marginRight: { xs: '140px', sm: '145px' }, // Sin margen en pantallas pequeñas, margen en pantallas grandes
    }}
  >
   mismo horario a todos los items.  Y el
  </Typography>
  <Typography
    sx={{
      fontSize: '14px',
      fontFamily: 'Poppins',
      color: 'white',
      textAlign: 'left', // Alinea el texto a la izquierda
      marginBottom: '24px',
      marginRight: { xs: '135px', sm: '110px' }, // Sin margen en pantallas pequeñas, margen en pantallas grandes
    }}
  >
    botón más para agregar otro rango horario.
  </Typography>
</Box>
        <Box display="flex" justifyContent="center" mb={2}>

          <HorariosEmpresa onHorariosChange={handleHorariosChange} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" type="submit"
           sx={{ width: '361px', height: '50px', borderRadius: '30px', backgroundColor: '#FFD000', color: 'black',
            fontFamily: 'Poppins',
            fontSize: '16px',
            marginBottom: '24px',
            }}>
            Crear
          </Button>
        </Box>
      </form>
    </Box>
   
  );
}

export default CrearServicio;