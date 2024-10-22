import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel,MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CrearServicio1 = () => {
  const [nombre, setNombre] = useState('');
  const [empresaId, setEmpresaId] = useState('');
  const [precio, setPrecio] = useState('');
  const [duracion, setDuracion] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [seña, setSeña] = useState('');
  const [modalidad, setModalidad] = useState('');
  const [tipoDeServicio, setTipoDeServicio] = useState('');
  const [barberos, setBarberos] = useState([]);
  const [selectedBarberos, setSelectedBarberos] = useState([]);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [precioServicioChecked, setPrecioServicioChecked] = useState(false);
  const [descripcionChecked, setDescripcionChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmpresaId = localStorage.getItem('empresaId');
    if (storedEmpresaId) {
      setEmpresaId(storedEmpresaId);
      fetchBarberos(storedEmpresaId);
    }
  }, []);

  const fetchBarberos = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error fetching barberos:', error);
    }
  };

  const handleCrearServicio = async (event) => {
    event.preventDefault();
    const form = {
      nombre,
      tipo_de_servicio: tipoDeServicio,
      descripcion,
      precio: parseInt(precio, 10),
      seña: parseInt(seña, 10),
      duracion,
      modalidad,
      empresa_id: parseInt(empresaId, 10),
      barberos_ids: selectedBarberos.map(id => parseInt(id, 10))
    };
    console.log('Formulario enviado:', form); // Añadir console.log para ver el formulario enviado
    try {
      const response = await axios.post('http://localhost:8000/servicios', form);
      console.log('Respuesta del servidor:', response.data); // Añadir console.log para ver la respuesta del servidor
      setSuccess(response.data.message);
      setError(null);
      // Limpiar los campos del formulario después de crear el servicio
      setNombre('');
      setTipoDeServicio('');
      setDescripcion('');
      setPrecio('');
      setSeña('');
      setDuracion('');
      setModalidad('');
      setSelectedBarberos([]);
      navigate('/crear-horarios');
    } catch (error) {
      console.error('Error al crear el servicio:', error.response || error.message); // Añadir console.log para ver el error
      setError(error.response?.data?.message || 'Error al crear el servicio');
      setSuccess(null);
    }
  };

  const handlePrecioServicioCheckedChange = (event) => {
    setPrecioServicioChecked(event.target.checked);
  };

  const handleDescripcionCheckedChange = (event) => {
    setDescripcionChecked(event.target.checked);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <Typography variant="h4" gutterBottom>
          Añadir Servicio
        </Typography>
        <form onSubmit={handleCrearServicio}>
          <TextField
            label="Nombre del Servicio"
            variant="outlined"
           
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="Tipo de Servicio"
            variant="outlined"
           
            value={tipoDeServicio}
            onChange={(e) => setTipoDeServicio(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="Descripcion del Servicio"
            variant="outlined"
           
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            
            sx={{ 
              mb: 2,
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

<Typography variant="h4" gutterBottom>
          Precio del Servicio
        </Typography>

         

<Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={precioServicioChecked}
                onChange={handlePrecioServicioCheckedChange}
                color="primary"
              />
            }
            label={
             
           <TextField
            label="precio del Servicio"
            variant="outlined"
           
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            sx={{ 
              mb: 2,
              ml:2,
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
            
    
            }
              labelPlacement="start"
          />
          <Typography variant="body1" sx={{ ml: 55, mt:-6}}>
          A definir
        </Typography>
        </Box>
        <Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={descripcionChecked}
                onChange={handleDescripcionCheckedChange}
                color="primary"
              />
            }
            label={
<TextField
            label="% de seña"
            variant="outlined"
           
            value={seña}
            onChange={(e) => setSeña(e.target.value)}
            sx={{ 
              mb: 2,
              ml:2,
              mt:2,
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
            
            }
              labelPlacement="start"
          />
           <Typography variant="body1" sx={{ ml: 55, mt:-7}}>
          Sin seña
        </Typography>
        </Box>

<Typography variant="h4" gutterBottom sx={{ mt:4}}>
          Modalidad y Duracion 
        </Typography>

           <TextField
            label="Duracion del Servicio"
            variant="outlined"
           
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            sx={{ 
              mb: 2,
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
            label="Modalidad del Servicio"
            variant="outlined"
           
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            sx={{ 
              mb: 2,
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

<Typography variant="h4" gutterBottom>
          Profecional del  Servicio
        </Typography>

        <TextField
            select
            label="Barberos"
            variant="outlined"
            fullWidth
            margin="normal"
            value={selectedBarberos}
            onChange={(e) => setSelectedBarberos(e.target.value)}
            SelectProps={{
              multiple: true,
            }}
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
          >
            {barberos.map((barbero) => (
              <MenuItem key={barbero.id} value={barbero.id}>
                {barbero.nombre} {barbero.apellido}
              </MenuItem>
            ))}
          </TextField>
          
          <Button type="submit" variant="contained" color="primary"
            sx={{ 
              mb:2,
              mt: 2, // Margen inferior
              backgroundColor: 'yellow', // Color de fondo del botón
              color: 'black', // Color del texto
              borderRadius: '25px', // Bordes redondeados
              display: 'block', // Para centrar el botón
               // M
               ml: 35, // Margen izquierdo
              width: '150px', // Ancho del botón ajustado al contenido
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
              }
            }}
          >
            Añadir
          </Button>

          <Button
  variant="contained"
  color="secondary"
  sx={{
    mb: 2,
    mt: -7,
     // Margen superior
    backgroundColor: 'yellow', // Color de fondo del botón
    color: 'black', // Color del texto
    borderRadius: '25px', // Bordes redondeados
    display: 'block', // Para centrar el botón
    ml: 12, // Margen izquierdo para separar los botones
    width: '150px', // Ancho del botón ajustado al contenido
    '& .MuiOutlinedInput-root': {
      borderRadius: '20px', // Bordes más redondeados
    },
  }}
  onClick={() => navigate('/servicios')} // Redirige a la página de servicios
>
  Cancelar
</Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearServicio1;