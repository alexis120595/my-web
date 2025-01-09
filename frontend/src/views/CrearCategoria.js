// vista para crear una nueva categoría
import React, {useState, useEffect}from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel,  List, ListItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CrearCategoria = () => {
    // Estados para guardar el nombre de la categoría, los servicios y la empresa
    const [nombreCategoria, setNombreCategoria] = useState('');
    const [servicios, setServicios] = useState([]);
    const [selectedServicios, setSelectedServicios] = useState([]);
    const [empresaId, setEmpresaId] = useState(null);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    // Obtener el id de la empresa del local storage y cargar los servicios
    useEffect(() => {
      const storedEmpresaId = localStorage.getItem('empresaId');
      if (storedEmpresaId) {
        setEmpresaId(parseInt(storedEmpresaId, 10));
      }
      fetchServicios();
    }, []);
  // Función para cargar los servicios desde la API 
    const fetchServicios = async () => {
      try {
        const response = await axios.get('http://localhost:8000/servicios');
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };
  // Función para manejar el cambio de los servicios seleccionados
    const handleServicioChange = (event) => {
      const servicioId = parseInt(event.target.value, 10);
      if (event.target.checked) {
        setSelectedServicios([...selectedServicios, servicioId]);
      } else {
        setSelectedServicios(selectedServicios.filter(id => id !== servicioId));
      }
    };
  // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
      event.preventDefault();
      const nuevaCategoria = {
        nombre: nombreCategoria,
        empresa_id: empresaId,
        servicios_ids: selectedServicios,
      };
      // Enviar la nueva categoría a la API
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
      borderRadius: '20px', 

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
      {/* Formulario para crear una nueva categoría */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Campos para el nombre de la categoría */}
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
                fontFamily:'Poppins',
                fontStyle: 'regular',
                fontSize: '14px',
              },
              '& .MuiInputAdornment-root': {
                color: 'white', 
              },
              marginBottom: '24px',
            }}
          />
 <Box display="flex" flexDirection="column"  justifyContent="flex-start"
  alignItems="flex-start" sx={{ mt: 1,   borderRadius: '8px', 
        backgroundColor: '#2E2F33', 
       width: '360px', height: '180px', 
       overflow: 'auto', 
      
        
        }}>
              {/* Lista de servicios */}
              <List  >
              {servicios.map((servicio) => (
                <ListItem key={servicio.id}
                sx={{
              
                 
                  marginLeft: '-140px',
                }}
                >
                  {/* Checkbox para seleccionar los servicios */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServicios.includes(servicio.id)}
                        onChange={handleServicioChange}
                        value={servicio.id}
                        sx={{ml:19,
                          color: 'white', 
                          '&.Mui-checked': {
      color: "#FFD000", 
    },
                        }}
                      />
                    }
                    label={servicio.nombre}
                    sx={{
                      
                      '& .MuiTypography-root': {
                        fontFamily: 'Inter', 
                        fontSize: '14px', 
                      },
                    }}
                  />
                </ListItem>
              ))}
            </List>
  
        </Box>
 
              {/* Botón para crear la categoría */}
          <Button type="submit" variant="contained" color="primary"  sx={{
              mt: '44px',
              width: '356px', 
              height: '43px', 
              backgroundColor: '#FFD000', 
              color: 'black', 
          
              borderRadius: '30px', 
              '&:hover': {
                backgroundColor: 'darkyellow', 
              },
            }}>
            <Typography
    sx={{
       textTransform:'none',
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: '#000000', 
    }}
  >
    Crear
  </Typography>
          </Button>
        </form>
        {/* Mensajes de éxito o error al crear la categoría */}
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
    </Box>

  </Box>

  </Box>


    );
};

export default CrearCategoria;