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
    <Container maxWidth="sm"
    sx={{width: "359px", 
    height: "700px",
    }}
    >
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom
        sx={{fontFamily:'Poppins',
fontSize: '24px', // Tamaño de fuente
marginBottom: '40px', // Espacio en la parte inferior del texto
ml: 4
        }}
        >
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
              height:"50px",
              width:"359px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
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
                color: '#989898', // Color del label
                fontFamily:'Poppins',
                fontSize: '14px', // Tamaño de fuente
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
              height:"50px",
              width:"359px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
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
                color: '#989898', // Color del label
                fontFamily:'Poppins',
                fontSize: '14px', // Tamaño de fuente
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
              marginBottom:'24px',
              height:"50px",
              width: "359px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
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
                color: '#989898', // Color del label
                fontFamily:'Poppins',
                fontSize: '14px', // Tamaño de fuente
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color del icono
              },
            }} 
          />

<FormControl >
            <InputLabel id="sucursal-label"
            sx={{
              color: '#989898', // Color del label
              fontFamily:'Poppins',
              fontSize: '14px', // Tamaño de fuente
            }}
            >Sucursal</InputLabel>
            <Select
              labelId="sucursal-label"
              value={sucursalId}
              onChange={(e) => setSucursalId(e.target.value)}
              label="Sucursal"
              sx={{ 
                marginBottom:'24px',
                height:"50px",
                width: "359px",
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                '& .MuiOutlinedInput-root': {
                   borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo
                  '& input': {
                    color: 'black', // Color del texto que se escribe
                  },
                  '& fieldset': {
                    borderColor: 'transparent', // Elimina el borde por defecto
                  },
                  '&:hover fieldset': {
                    borderColor: 'transparent', // Elimina el borde al pasar el mouse
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'transparent', // Elimina el borde al enfocar
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#989898', // Color del label
                fontFamily:'Poppins',
                fontSize: '14px', // Tamaño de fuente
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
           
             height:"50px",
             width: "359px",
            '& .MuiOutlinedInput-root': {
            
            }
          }}>
          <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: 'black', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Crear empleado
  </Typography>
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearEmpleado;