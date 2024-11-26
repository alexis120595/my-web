import React, { useState, useEffect} from 'react';
import { Container, Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import SubidaImagenes from '../components/SubidaImagenes';
import axios from 'axios';



const CrearEmpleado = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  
  const [sucursalId, setSucursalId] = useState(''); // Nuevo estado para la sucursal seleccionada
  const [sucursales, setSucursales] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const empresaId = localStorage.getItem('empresaId');

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



  const handleCrearEmpleado = async (event) => {
    event.preventDefault();
  
    const form = {
      nombre,
      apellido,
      email,
      imagen_url: imagenUrl,
      empresa_id: parseInt(empresaId, 10) ,
      sucursal_id: parseInt(sucursalId, 10) // Convertir el id de la sucursal
    };
    console.log('Formulario enviado:', form); // Añadir console.log para ver el formulario enviado
    try {
      const response = await axios.post('http://localhost:8000/barberos', form);
      console.log('Respuesta del servidor:', response.data); // Añadir console.log para ver la respuesta del servidor
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear el empleado
      setNombre('');
      setApellido('');
      setEmail('');
      setImagenUrl('');
      setSucursalId('');
    } catch (error) {
      console.error('Error al crear el empleado:', error.response || error.message); // Añadir console.log para ver el error
      setError(error.response?.data?.message || 'Error al crear el empleado');
      setSuccess(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Añadir Empleado
        </Typography>
        <form onSubmit={handleCrearEmpleado}>
          <SubidaImagenes onImageUpload={setImagenUrl} />
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                '& input': {
                  color: 'black', // Color del texto que se escribe
                },
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
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            sx={{ 
              width:"300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                '& input': {
                  color: 'black', // Color del texto que se escribe
                },
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
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ 
              width: "300px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                '& input': {
                  color: 'black', // Color del texto que se escribe
                },
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

<FormControl fullWidth margin="normal" sx={{ width: "300px" }}>
            <InputLabel id="sucursal-label">Sucursal</InputLabel>
            <Select
              labelId="sucursal-label"
              value={sucursalId}
              onChange={(e) => setSucursalId(e.target.value)}
              label="Sucursal"
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '30px', // Bordes más redondeados
                  backgroundColor: 'white', // Color de fondo
                  '& input': {
                    color: 'black', // Color del texto que se escribe
                  },
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
                '& .MuiSelect-select': {
      backgroundColor: 'white', // Color de fondo del select
      color: 'black', // Color del texto del select
    },
              }}
            >
               {sucursales.map((sucursal) => (
                <MenuItem key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
         
          
          <Button type="submit" variant="contained" color="primary"
           sx={{ 
            mb:2,
            mt: 2, // Margen inferior
            backgroundColor: 'yellow', // Color de fondo del botón
            color: 'black', // Color del texto
            borderRadius: '25px', // Bordes redondeados
            display: 'block', // Para centrar el botón
             // M
             ml: 22, // Margen izquierdo
            width: '200px', // Ancho del botón ajustado al contenido
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px', // Bordes más redondeados
            }
          }}>
            Crear Empleado
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearEmpleado;