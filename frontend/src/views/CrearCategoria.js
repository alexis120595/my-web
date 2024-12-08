import React, {useState, useEffect}from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel,  List, ListItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearCategoria = () => {

    const [nombreCategoria, setNombreCategoria] = useState('');
    const [servicios, setServicios] = useState([]);
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [empresaId, setEmpresaId] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const storedEmpresaId = localStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(parseInt(storedEmpresaId, 10));
      }
      fetchServicios();
    }, []);
  
    const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/servicios');
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    const handleServicioChange = (event) => {
      const servicioId = parseInt(event.target.value, 10);
      if (event.target.checked) {
        setSelectedServicios([...selectedServicios, servicioId]);
      } else {
        setSelectedServicios(selectedServicios.filter(id => id !== servicioId));
      }
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const nuevaCategoria = {
        nombre: nombreCategoria,
        empresa_id: empresaId,
        servicios_ids: selectedServicios,
      };
  
      try {
        const response = await axios.post('http://localhost:8000/categorias', nuevaCategoria);
        console.log('Respuesta del servidor:', response.data);
        setSuccess('Categoría creada exitosamente');
        setError(null);
        // Limpiar los campos del formulario después de crear la categoría
        setNombreCategoria('');
        setSelectedServicios([]);
        navigate('/categorias');
      } catch (error) {
        console.error('Error al crear la categoría:', error.response || error.message);
        setError(error.response?.data?.message || 'Error al crear la categoría');
        setSuccess(null);
      }
    };
  
  return (
    <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
     
    }}
  >
    <Box
    sx={{backgroundColor:'#504D4D', height: '670px',
      width:'549px',
      borderRadius: '20px', // Bordes redondeados

    }}
    >

    <Box display="flex" flexDirection="column" justifyContent="center" height="50%">
      <Typography variant="h4" component="h1" align="center" sx={{mt:40, mr:25,
      fontFamily:'Poppins',
      fontStyle: 'regular',
      fontSize: '24px',

      }}>
        Crear Categoría
      </Typography>
      <Typography variant="body1" component="p" sx={{ mt: 2,
         fontFamily:'Poppins',
         fontStyle: 'regular',
         fontSize: '16px',
         mr:11,
       }} align="center">
        Elegi el nombre de tu nueva categoria y
        
      </Typography>
      <Typography variant="body1" component="p" sx={{ mt: 1, mr:14,
         fontFamily:'Poppins',
         fontStyle: 'regular',
         fontSize: '16px',
         marginBottom: '16px',
       }} align="center">
        
        
         seleciona los servicios de la misma.
      </Typography>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Nombre de la Categoría"
            variant="outlined"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            sx={{
              mt: 2,
              width: '360px',
              height: '50px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px', // Bordes redondeados
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
                fontFamily:'Poppins',
                fontStyle: 'regular',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', // Color del icono
              },
              marginBottom: '24px',
            }}
          />
 <Box display="flex" flexDirection="column"  justifyContent="flex-start"
  alignItems="flex-start" sx={{ mt: 1,   borderRadius: '8px', // Bordes redondeados
        backgroundColor: '#2E2F33', // Color de fondo gris
       width: '360px', height: '180px', // Ancho y alto de 300px
       overflow: 'auto', 
      
        
        }}>

              <List  >
              {servicios.map((servicio) => (
                <ListItem key={servicio.id}
                sx={{
              
                 
                  marginLeft: '-140px',
                }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServicios.includes(servicio.id)}
                        onChange={handleServicioChange}
                        value={servicio.id}
                        sx={{ml:19,
                          color: 'white', // Color del checkbox blanco
                          '&.Mui-checked': {
      color: "#FFD000", // Cambiar el color a amarillo cuando está seleccionado
    },
                        }}
                      />
                    }
                    label={servicio.nombre}
                    sx={{
                      
                      '& .MuiTypography-root': {
                        fontFamily: 'Inter', // Aplica la fuente Inter
                        fontSize: '14px', // Tamaño de fuente 14px
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
  
        </Box>
 
        
          <Button type="submit" variant="contained" color="primary"  sx={{
              mt: '44px',
              width: '356px', // Más ancho
              height: '43px', //
              backgroundColor: '#FFD000', // Color de fondo amarillo
              color: 'black', // Color de texto negro
          
              borderRadius: '30px', 
              '&:hover': {
                backgroundColor: 'darkyellow', // Color de fondo al pasar el mouse
              },
            }}>
            <Typography
    sx={{
       textTransform:'none',
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: '#000000', // Asegura que el color del texto sea consistente
    }}
  >
    Crear
  </Typography>
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
    </Box>

  </Box>

  </Box>


    );
};

export default CrearCategoria;