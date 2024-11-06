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
      navigate('/mi-empresa');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
     <Box display="flex" justifyContent="center" mb={2} >
        <Typography variant="h4" component="h6" gutterBottom style={{ marginTop: '40px', fontSize: '2rem', marginRight:'70px'}}>
          Crear empresa
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
      <Box display="flex" justifyContent="flex-end" >
      <SubidaImagenes onImageUpload={setImagenUrl} />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <TextField
          
            label="Nombre de la Empresa"
            variant="outlined"
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 

              
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'black', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Color del borde al enfocar
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
          <TextField
            
            label="Eslogan"
            variant="outlined"
            margin="normal"
            value={eslogan}
            onChange={(e) => setEslogan(e.target.value)}
            sx={{ 

              
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                color: 'black', // Color del texto
                '& fieldset': {
                  borderColor: 'black', // Color del borde
                },
                '&:hover fieldset': {
                  borderColor: 'black', // Color del borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black', // Color del borde al enfocar
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
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mb={2}>
  <FormControl fullWidth variant="outlined" margin="normal" sx={{ width: "300px" }}>
    <InputLabel>Selecciona un rubro</InputLabel>
    <Select
      value={rubro}
      onChange={handleRubroChange}
      label="Selecciona un rubro"
      sx={{
        borderRadius: '20px', // Aseguramos que el Select tenga borderRadius
        '& .MuiOutlinedInput-root': {
          borderRadius: '20px', // Bordes más redondeados
          color: 'black', // Color del texto
          '& fieldset': {
            borderColor: 'black', // Color del borde
          },
          '&:hover fieldset': {
            borderColor: 'black', // Color del borde al pasar el mouse
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black', // Color del borde al enfocar
          },
        },
        '& .MuiInputLabel-root': {
          color: 'black', // Color del label
        },
        '& .MuiInputAdornment-root': {
          color: 'black', // Color del icono
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
        
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <TextField
            fullWidth
            label="Buscar ubicación"
            variant="outlined"
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
            sx={{
              width: "300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
                color: 'black',
                '& fieldset': {
                  borderColor: 'black',
                },
                '&:hover fieldset': {
                  borderColor: 'black',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'black',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
              },
              '& .MuiInputAdornment-root': {
                color: 'black',
              },
            }}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <Mapa onLocationSelect={handleLocationSelect} />
        </Box>
        <Box display="flex" justifyContent="center" mb={2}>
          <HorariosEmpresa onHorariosChange={handleHorariosChange} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" type="submit"
           sx={{ width: '300px', height: '50px', borderRadius: '20px', backgroundColor: 'yellow', color: 'black', mb:5  }}>
            Crear
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default CrearServicio;