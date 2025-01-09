// # Archivo para crear una nueva empresa en la aplicación
import React, { useState } from 'react';
import Mapa from '../components/Mapa';
import SubidaImagenes from '../components/SubidaImagenes';
import { TextField, Button, Box, Select, MenuItem, InputLabel, FormControl, Typography } from '@mui/material';
import axios from 'axios';
import HorariosEmpresa from '../components/HorariosEmpresa';
import { useNavigate } from 'react-router-dom';

const CrearServicio = () => {
  // # Define estados locales para manejar los datos del formulario y otros estados necesarios
  const [rubro, setRubro] = useState('');
  const [nombre, setNombre] = useState('');
  const [eslogan, setEslogan] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const [horarios, setHorarios] = useState([]);
  const navigate = useNavigate();
// # Maneja el cambio del campo rubro
  const handleRubroChange = (event) => {
    setRubro(event.target.value);
  };

 
// # Maneja el cambio de los horarios
  const handleHorariosChange = (newHorarios) => {
    setHorarios(newHorarios);
  };

  // # Maneja la selección de la ubicación desde el componente Mapa
  const handleLocationSelect = (address) => {
    setUbicacion(address);
  };

  // # Maneja el envío del formulario para crear un nuevo servicio
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Convertir el array de horarios a un objeto JSON
    const horariosJson = horarios.reduce((acc, horario) => {
      acc[horario.dia] = horario.horarios;
      return acc;
    }, {});

    const userId = localStorage.getItem('userId');
    // # Crear un objeto con los datos del formulario
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
    // # Enviar los datos del formulario al backend
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
          fontSize: { xs: '20px', sm: '24px' }, 
          fontWeight: 'bold',
          marginTop: { xs: '20px', sm: '0' },
          marginBottom: { xs: '16px', sm: '24px' },
          textAlign: { xs: 'left  ', sm: 'left' }, 
          width: { xs: '100%', sm: 'auto' },
          mr: { xs: '0', sm: '190px' }, 
        }}>
          Crear empresa
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="flex-end" >
      <SubidaImagenes onImageUpload={setImagenUrl} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" >
           {/* # Campo de texto para ingresar el nombre de la empresa */}
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
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& input': {
                  color: 'black'
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
                color: '#666666', 
                fontSize: '14px', 
                fontFamily: 'Popins', 
              },
              '& .MuiInputAdornment-root': {
                color: 'white', 
              },
            }} 
          />
           {/* # Campo de texto para ingresar el eslogan de la empresa */}
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
                borderRadius: '25px', 
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
                color: '#666666', 
                fontSize: '14px', 
                fontFamily: 'Popins', 
              },
              '& .MuiInputAdornment-root': {
                color: 'white', 
              },
            }} 
          />
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
  {/* # Campo de selección para el rubro de la empresa */}
  <FormControl fullWidth variant="outlined" margin="normal" sx={{ width: "362px",
  height: "50px",
marginBottom:'24px',
  borderRadius: '25px', 
        '& .MuiOutlinedInput-root': {
          borderRadius: '25px', 
          backgroundColor: 'white', 
          '& input': {
            color: 'black', 
          },
          
          '& fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
          '&:hover fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
        },
        '& .MuiInputLabel-root': {
          color: '#666666', 
                fontSize: '14px', 
                fontFamily: 'Popins', 
        },
        '& .MuiInputAdornment-root': {
          color: 'white', 
        },
        '& .MuiSelect-icon': {
          color: 'white', 
        },
        '& .MuiSelect-select': {
          color: 'white', 
        }, }}>
    <InputLabel  sx={{ color: 'white' }}>Selecciona un rubro</InputLabel>
    <Select
      value={rubro}
      onChange={handleRubroChange}
      label="Selecciona un rubro"
      sx={{
        borderRadius: '20px', 
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', 
          backgroundColor: 'white', 
          '& input': {
            color: 'black', 
          },
          
          '& fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
          '&:hover fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
          '&.Mui-focused fieldset': {
            borderColor: 'white', 
            borderWidth: '1px', 
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', 
        },
        '& .MuiInputAdornment-root': {
          color: 'white', 
        },
        '& .MuiSelect-icon': {
          color: 'white', 
        },
        '& .MuiSelect-select': {
          color: 'white', 
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
           {/* # Campo de texto para ingresar la dirección de la empresa */}
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
                borderRadius: '25px',
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
                color: '#666666', 
                fontSize: '14px', 
                fontFamily: 'Popins', 
              },
              '& .MuiInputAdornment-root': {
                color: 'white',
              },
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          {/* # Componente Mapa para seleccionar la ubicación */}
          <Mapa onLocationSelect={handleLocationSelect} />
        </Box>

        <Box display="flex" flexDirection="column" alignItems="center">
  <Typography
    sx={{
      fontSize: '20px',
      fontFamily: 'Poppins',
      marginBottom: '8px',

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
      textAlign: 'left', 
      marginBottom: '8px',
      marginRight: { xs: '130px', sm: '140px' },
    }}
  >
    Utilizá el botón “todos” para aplicar el 

  </Typography>

  <Typography
    sx={{
      fontSize: '14px',
      fontFamily: 'Poppins',
      color: 'white',
      textAlign: 'left', 
      marginBottom: '8px',
      marginRight: { xs: '140px', sm: '145px' }, 
    }}
  >
   mismo horario a todos los items.  Y el
  </Typography>
  <Typography
    sx={{
      fontSize: '14px',
      fontFamily: 'Poppins',
      color: 'white',
      textAlign: 'left', 
      marginBottom: '24px',
      marginRight: { xs: '135px', sm: '110px' }, 
    }}
  >
    botón más para agregar otro rango horario.
  </Typography>
</Box>
        <Box display="flex" justifyContent="center" mb={2}>
          {/* # Componente HorariosEmpresa para seleccionar los horarios de atención */}
          <HorariosEmpresa onHorariosChange={handleHorariosChange} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {/* # Botón para enviar el formulario y crear la empresa */}
          <Button variant="contained" color="primary" type="submit"
           sx={{ width: '361px', height: '50px', borderRadius: '30px', backgroundColor: '#FFD000', color: 'black',
            fontFamily: 'Poppins',
            fontSize: '16px',
            marginBottom: '24px',
            textTransform: 'none',
            }}>
            Crear
          </Button>
        </Box>
      </form>
    </Box>
   
  );
}

export default CrearServicio;