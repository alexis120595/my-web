import React, { useState, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography, Checkbox, FormControlLabel,MenuItem,  Card, CardContent, CardMedia, IconButton } from '@mui/material';
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

  const handleSelectBarbero = (barberoId) => {
    setSelectedBarberos((prevSelected) =>
      prevSelected.includes(barberoId)
        ? prevSelected.filter((id) => id !== barberoId)
        : [...prevSelected, barberoId]
    );
  };


  return (
    <Container maxWidth="sm"
    sx={{width: '364px',
      height: '1270px',
    }}
    >
      <Box mt={5} textAlign="left">
        <Typography variant="h4" gutterBottom  sx={{
          fontFamily: 'Poppins',
          fontSize: '24px',
          marginBottom: '24px',
        }}>
          Añadir Servicio
        </Typography>
        <form onSubmit={handleCrearServicio}>
          <TextField
            label="Nombre del Servicio"
            variant="outlined"
           
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{ 
              marginBottom: '16px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />

<TextField
            label="Tipo de Servicio"
            variant="outlined"
           
            value={tipoDeServicio}
            onChange={(e) => setTipoDeServicio(e.target.value)}
            sx={{ 
              marginBottom: '16px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />

<TextField
            label="Descripcion del Servicio"
            variant="outlined"
           
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            
            sx={{ 
              marginBottom: '24px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />

<Typography variant="h4" gutterBottom
sx={{ 
  fontFamily: 'Poppins',
  fontSize: '24px',
  marginBottom: '24px',
}}
>
          Precio del Servicio
        </Typography>

<Box mb={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={precioServicioChecked}
                onChange={handlePrecioServicioCheckedChange}
                color="primary"
                sx={{mr:20,
                  width:"18px",
                  height:"18px",
                  marginLeft:'17px',
                  color:"white",
                  '&.Mui-checked': {
      color: "yellow", // Cambiar el color a amarillo cuando está seleccionado
    },
  
                }}
              />
            }
            label={
             
           <TextField
            label="precio del Servicio"
            variant="outlined"
           
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            sx={{ 
              marginBottom:'16px',
              
              height:"50px",
              width:"244px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />
            
    
            }
              labelPlacement="start"
          />
          <Typography variant="body1" sx={{ ml: 40, mt:-6,
            fontSize: '14px',
            fontFamily: 'Poppins',
          }}>
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

                sx={{
                  width:"18px",
                  height:"18px",
                  marginLeft:'17px',
                  color:"white",
                  '&.Mui-checked': {
      color: "yellow", // Cambiar el color a amarillo cuando está seleccionado
    },
  
                }}
              />
            }
            label={
<TextField
            label="% de seña"
            variant="outlined"
           
            value={seña}
            onChange={(e) => setSeña(e.target.value)}
            sx={{ 
              marginBottom:'24px',
              
              height:"50px",
              width:"244px",
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />
            
            }
              labelPlacement="start"
          />
           <Typography variant="body1" sx={{ ml: 40, mt:-7,
            fontSize: '14px',
            fontFamily: 'Poppins',
           }}>
          Sin seña
        </Typography>
        </Box>

<Typography variant="h4" gutterBottom sx={{ mt:4, 
  fontFamily: 'Poppins',
  fontSize: '20px',
  marginBottom: '19px',
}}>
          Modalidad y Duracion 
        </Typography>

           <TextField
            label="Duracion del Servicio"
            variant="outlined"
           
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            sx={{ 
              marginBottom: '19px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />

<TextField
            label="Modalidad del Servicio"
            variant="outlined"
           
            value={modalidad}
            onChange={(e) => setModalidad(e.target.value)}
            sx={{ 
              marginBottom: '24px',
              height:"50px",
              width: { xs: '330px', sm: '361px' },
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes más redondeados
                backgroundColor: 'white', // Color de fondo del input
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
                fontFamily: 'Poppins',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
            }} 
          />

<Typography variant="h4" gutterBottom sx={{
  fontFamily: 'Poppins',
  fontSize: '20px',
  marginBottom: '24px',
}}>
          Seleccionar Profecional
        </Typography>

       

        <Box display="grid"
  gridTemplateColumns="repeat(2, 1fr)"
  gap='27px'
  justifyContent="center">
            {barberos.map((barbero) => (
              <Card key={barbero.id} 
              sx={{
                width: '165px',
                height: '188px',
                borderRadius: '15px', // Bordes redondeados
                backgroundColor: 'white', // Color de fondo
                display: 'flex', // Para que los elementos estén en fila
                alignItems: 'center', // Para centrar los elementos verticalmente
                flexDirection:'column',
                justifyContent: 'center', // Para centrar los elementos horizontalmente
                marginBottom: '44px', // Espacio entre las tarjetas
              }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    height: 68,
                    width: 68,
                    borderRadius: '50%', // Hacer la imagen redonda
                    marginBottom: '10px', // Espacio entre la imagen y el nombre
                    marginTop: '20px', // Espacio entre la imagen y el borde superior
                   
                  }}
                  image={barbero.imagen_url} // Asegúrate de que la URL de la foto esté disponible en el objeto barbero
                  alt={`${barbero.nombre} ${barbero.apellido}`}
                />
                <CardContent  sx={{ padding: 0, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h5" component="div"
                  sx={{
                    fontFamily: 'Poppins',
                    fontSize: '12px',
                    marginBottom: '10px',
                 
                  }}
                  >
                    {barbero.nombre} {barbero.apellido}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleSelectBarbero(barbero.id)}
                    sx={{
                       backgroundColor: selectedBarberos.includes(barbero.id) ? 'gray' : 'white',
                        color: '#3A3A3A',
                        border: '2px solid #3A3A3A',
                        borderRadius: '30px',
                          '&:hover': {
                          backgroundColor: 'lightgray',
                         },
                         width: '109px',
                         height: '33px',
                         textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
                         
                 }}
              >
 <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px',       // Tamaño de fuente 14px
      color: '#3A3A3A',      // Asegura que el color del texto sea consistente
    }}
  >
    {selectedBarberos.includes(barbero.id) ? 'Seleccionado' : 'Seleccionar'}
  </Typography>
</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
          
          <Box>
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      mt: 2,
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
    
        
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        sx={{
          backgroundColor: 'transparent',
          color: '#FFD000',
          borderRadius: '25px',
          border: '3px solid #FFD000',
          width: '166px',
          height: '43px',
          textTransform: 'none',
          
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
        onClick={() => navigate('/servicios-disponibles')}
      >
        <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px' }}>
          Cancelar
        </Typography>
      </Button>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
       
        marginLeft: '10px',
      }}
    >
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          backgroundColor: '#FFD000',
          color: 'black',
          borderRadius: '25px',
          width: '166px',
          height: '43px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'gray',
          },
        }}
      >
        <Typography sx={{ fontFamily: 'Poppins', fontSize: '16px' }}>
          Añadir
        </Typography>
      </Button>
    </Box>
  </Box>
</Box>

        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default CrearServicio1;