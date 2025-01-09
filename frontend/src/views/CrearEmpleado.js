// Vista para crear un empleado
import React, { useState, useEffect} from 'react';
import { Container, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import ImagenBarbero from '../components/ImagenBarbero';
import axios from 'axios';



const CrearEmpleado = () => {
  // Definir los estados necesarios para el formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  
  const [sucursalId, setSucursalId] = useState('');
  const [sucursales, setSucursales] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const empresaId = localStorage.getItem('empresaId');

// Obtener las sucursales de la empresa al cargar la vista
  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/sucursales`);
        console.log('Datos recibidos:', response.data); 
        setSucursales(response.data);
      } catch (error) {
        console.error('Error fetching registro:', error);
      }
    };

    if (empresaId) {
      fetchSucursales();
    }
  }, [empresaId]);


// Crear un empleado al enviar el formulario
  const handleCrearEmpleado = async (event) => {
    event.preventDefault();
    // Crear un objeto con los datos del formulario
    const form = {
      nombre,
      apellido,
      email,
      imagen_url: imagenUrl,
      empresa_id: parseInt(empresaId, 10) ,
      sucursal_id: parseInt(sucursalId, 10) 
    };
    console.log('Formulario enviado:', form); 
    try {
      const response = await axios.post('http://localhost:8000/barberos', form);
      console.log('Respuesta del servidor:', response.data); 
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear el empleado
      setNombre('');
      setApellido('');
      setEmail('');
      setImagenUrl('');
      setSucursalId('');
    } catch (error) {
      console.error('Error al crear el empleado:', error.response || error.message); 
      setError(error.response?.data?.message || 'Error al crear el empleado');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm"
    sx={{width: "359px", 
    height: "700px",
    }}
    >
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom
        sx={{fontFamily:'Poppins',
fontSize: '24px', 
marginBottom: '40px', 

        }}
        >
          Añadir Empleado
        </Typography>
        {/* Formulario para crear un empleado */}
        <form onSubmit={handleCrearEmpleado}>
          {/* Componente para subir imagen del barbero */}
          <ImagenBarbero onImageUpload={setImagenUrl} />
          {/* Campos de texto para ingresar el nombre */}
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& input': {
                  color: 'black',
                },
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
                color: '#989898', 
                fontFamily:'Poppins',
                fontSize: '14px', 
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }} 
          />
          {/* Campos de texto para ingresar el apellido */}
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            sx={{ 
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& input': {
                  color: 'black', 
                },
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
                color: '#989898', 
                fontFamily:'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'black',
              },
            }} 
          />
{/* Campos de texto para ingresar el email */}
<TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ 
              marginBottom:'24px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& input': {
                  color: 'black', 
                },
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
                color: '#989898',
                fontFamily:'Poppins',
                fontSize: '14px', 
              },
              '& .MuiInputAdornment-root': {
                color: 'black', 
              },
            }} 
          />
{/* Campo de selección múltiple para seleccionar la sucursal */}
<FormControl >
            <InputLabel id="sucursal-label"
            sx={{
              color: '#989898', 
              fontFamily:'Poppins',
              fontSize: '14px', 
            }}
            >Sucursal
            </InputLabel>
            
            <Select
              labelId="sucursal-label"
              value={sucursalId}
              onChange={(e) => setSucursalId(e.target.value)}
              label="Sucursal"
              sx={{ 
                marginBottom:'24px',
                height:"50px",
                width: { xs: '330px', sm: '361px' },
                borderRadius: '25px', 
                backgroundColor: 'white', 
                '& .MuiOutlinedInput-root': {
                   borderRadius: '25px', 
                backgroundColor: 'white',
                  '& input': {
                    color: 'black', 
                  },
                  '& fieldset': {
                    borderColor: 'transparent', 
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#989898', 
                fontFamily:'Poppins',
                fontSize: '14px', 
                },
              }}
            >
              {/* Opciones para seleccionar la sucursal */}
               {sucursales.map((sucursal) => (
                <MenuItem key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
          {/* Botón para enviar el formulario */}
          <Button type="submit" variant="contained" color="primary"
           sx={{ 
            mb:2,
            mt: 2, 
            backgroundColor: 'yellow',
            color: 'black', 
            borderRadius: '25px', 
            display: 'block',
           
             height:"50px",
             width: { xs: '330px', sm: '361px' },
            '& .MuiOutlinedInput-root': {
            
            }
          }}>
          <Typography
    sx={{
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
    }}
  >
    Crear empleado
  </Typography>
          </Button>
        </form>
        {/* Mensajes de éxito o error al crear el empleado */}
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearEmpleado;