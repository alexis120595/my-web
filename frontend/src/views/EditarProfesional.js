import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, IconButton, Switch} from '@mui/material';
import HorariosEmpleado from '../components/HorariosEmpleado';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';

const EditarProfesional = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [sucursales, setSucursales] = useState([]); // Inicializa sucursales como un array vacío
  const [servicios, setServicios] = useState([]);
  const [todosServicios, setTodosServicios] = useState([]); // Estado para almacenar todos los servicios disponibles
  const empresaId = localStorage.getItem('empresaId'); // Obtener el ID de la empresa desde el almacenamiento local
  const [horarios, setHorarios] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');
  
  const [permisos, setPermisos] = useState({
    permiso1: false,
    permiso2: false,
    permiso3: false,
    permiso4: false,
    permiso5: false,
  });

  useEffect(() => {
    const fetchBarbero = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/barberos/${id}`);
        const barbero = response.data;
        console.log('Barbero obtenido:', barbero);
        setNombre(barbero.nombre);
        setApellido(barbero.apellido);
        setEmail(barbero.email);
        setSucursal(barbero.sucursal_id);
        setServicios(barbero.servicios.map(servicio => servicio.id));
        setHorarios(barbero.horarios);
        console.log('Horarios asignados al estado:', barbero.horarios);
      } catch (error) {
        console.error('Error fetching barbero:', error);
      }
    };

    const fetchSucursales = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/sucursales`);
        setSucursales(response.data);
      } catch (error) {
        console.error('Error fetching sucursales:', error);
      }
    };

    const fetchServicios = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/servicios`);
        setTodosServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    fetchBarbero();
    fetchSucursales();
    fetchServicios();
  }, [id, empresaId]);

  const handleSearch = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/servicios/buscar?nombre=${query}`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error searching servicios:', error);
    }
  };

  const handleHorariosChange = (nuevosHorarios) => {
    setHorarios(nuevosHorarios);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBarbero = {
     
      email,
      sucursal_id: sucursal,
      servicio_id: servicios,
      horarios,
    };

    try {
      await axios.put(`http://localhost:8000/barberos/${id}`, updatedBarbero);
      navigate('/personal');
    } catch (error) {
      console.error('Error updating barbero:', error);
    }
  };

  const handleCancel = () => {
    navigate('/personal');
  };

  const handleSucursalChange = (event) => {
    setSucursal(event.target.value);
  };

  const handleServicioChange = (event) => {
    const servicioId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setServicios([...servicios, servicioId]);
    } else {
      setServicios(servicios.filter(id => id !== servicioId));
    }
  };

  const handlePermisoChange = (event) => {
    setPermisos({
      ...permisos,
      [event.target.name]: event.target.checked,
    });
  };

  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  const [diasActivos, setDiasActivos] = useState({
    Lun: true,
    Mar: true,
    Mié: true,
    Jue: true,
    Vie: true,
    Sáb: true,
    Dom: true,
  });

 
  const handleEditServicio = (servicioId) => {
    // Lógica para editar el servicio
    console.log(`Editar servicio con ID: ${servicioId}`);
  };

  return (
    <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
   
  }}
>
    <Box display="flex" flexDirection="column" alignItems="center"  sx={{ mt: 70,
width: '360px',
height: '2080px',

     }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center"
        sx={{
          fontFamily: 'Poppins',
          fontSize: '24px',
          mr: 28,
        }}>
           Profesional
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="body1" align="center" sx={{ mr: 15,
             fontFamily: 'Poppins',
             fontSize: '16px',
           }}>
            Email del profesional disponible
          </Typography>
        </Box>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
         
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mt: 2,
             marginBottom: '24px',
              height: '50px',
              width: '360px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '25px',
                backgroundColor: 'white'
              },
             
              '& input': {
                color: 'black', // Color del texto que se escribe
              },
              '& .MuiInputLabel-root': {
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '14px',      // Tamaño de fuente 14px
      color: '#3A3A3A',      // Color gris
    },
            }}
          />
          <Typography variant="h4" component="h1" align="center" sx={{ mr: 34,
              fontFamily: 'Poppins',
              fontSize: '20px',
            }}>
             
            Sucursal
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr: 8,
              fontFamily: 'Poppins',
              fontSize: '16px',
             }}>
              Sucursal donde el profesional se encuentra
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 23,
              fontFamily: 'Poppins',
              fontSize: '16px',
             }}>
              prestando sus servicios.
            </Typography>
          </Box>
          <FormControl variant="outlined" sx={{ mt: 2, width: '360px', height:'50px', marginBottom: '24px',}}>
            <InputLabel id="sucursal-label"
            sx={{
              fontFamily: 'Poppins', // Aplica la fuente Poppins
              fontSize: '14px',      // Tamaño de fuente 14px
              color: '#3A3A3A',
            }}
            >Seleccionar Sucursal</InputLabel>
            <Select
              labelId="sucursal-label"
              value={sucursal}
              onChange={handleSucursalChange}
              label="Seleccionar Sucursal"
              sx={{
              
                borderRadius: '25px',
                backgroundColor: 'white',
              '& input': {
                color: 'black', // Color del texto que se escribe
                fontFamily: 'Poppins', // Aplica la fuente Poppins
                fontSize: '14px',      // Tamaño de fuente 14px
              
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
          <Typography variant="body1" >
            {sucursal ? `Sucursal seleccionada: ${sucursal}` : 'No se ha seleccionado ninguna sucursal'}
          </Typography>

          <Typography variant="h4" component="h1" align="center" sx={{ mr: 33, mt: 5,
            fontFamily: 'Poppins',
            fontSize: '20px',
           }}>
            Permisos
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr: 17, mb: 3,
              fontFamily: 'Poppins',
              fontSize: '16px',
             }}>
              Otorgar permisos al profesional
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="left"
              sx={{
                marginBottom: '24px',
                borderRadius: '8px',
                backgroundColor: '#2E2F33',
                padding: 1,
                width: '360px',
                height: '200px',
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso1}
                    onChange={handlePermisoChange}
                    name="permiso1"
                    sx={{
                      color: 'white', // Cambiar el color a amarillo cuando está seleccionado
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                    
                  />
                }
                label="Opción reservar online"
                sx={{ 
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', // Aplica la fuente Inter
                    fontSize: '14px',    // Tamaño de fuente 14px
                  },
                 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso2}
                    onChange={handlePermisoChange}
                    name="permiso2"
                    sx={{
                      color:'white', // Cambiar el color a amarillo cuando está seleccionado
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                  />
                }
                label="Agendar turnos en su agenda"
                sx={{ mr: 1,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', // Aplica la fuente Inter
                    fontSize: '14px',    // Tamaño de fuente 14px
                  },
                 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso3}
                    onChange={handlePermisoChange}
                    name="permiso3"
                    sx={{
                      color: 'white', // Cambiar el color a amarillo cuando está seleccionado
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                  />
                }
                label="Editar turnos en su agenda"
                sx={{ mr: 3,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', // Aplica la fuente Inter
                    fontSize: '14px',    // Tamaño de fuente 14px
                  },
                 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso4}
                    onChange={handlePermisoChange}
                    name="permiso4"
                    sx={{
                      color: 'white', // Cambiar el color a amarillo cuando está seleccionado
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                  />
                }
                label="Ver datos de clientes"
                sx={{ mr: 9,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', // Aplica la fuente Inter
                    fontSize: '14px',    // Tamaño de fuente 14px
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso5}
                    onChange={handlePermisoChange}
                    name="permiso5"
                    sx={{
                      
                      color: 'white', // Cambiar el color a amarillo cuando está seleccionado
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                  />
                }
                label="Recibir señas en su MP"
                sx={{ mr: 6,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', // Aplica la fuente Inter
                    fontSize: '14px',    // Tamaño de fuente 14px
                  },
                 }}
              />
            </Box>
          </Box>
          <Typography variant="h4" component="h1" align="center" sx={{ mr: 22, 
            fontFamily: 'Poppins',
            fontSize: '20px',
          }}>
            Horarios de atención
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr: 20,
              fontFamily: 'Poppins',
              fontSize: '12px',
              
             }}>
              Utiliza el botón "todos" para aplicar el
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 17,
              fontFamily: 'Poppins',
              fontSize: '12px',
             }}>
            
              mismo horario a todos los items. Y el botón
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 22, mb: 3,
              fontFamily: 'Poppins',
              fontSize: '12px',
             }}>
           
              más para agregar otro rango horario
            </Typography>
            
          
             <HorariosEmpleado  onHorariosChange={handleHorariosChange} />


          </Box>
          <Typography variant="h4" component="h1" align="center" sx={{ mr: 33, mt: 2,
            fontFamily: 'Poppins',
            fontSize: '20px',
           }}>
            Servicios
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr : 11,
              fontFamily: 'Poppins',
              fontSize: '16px',
             }}>
              Selecciona los servicios que presta este
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 7,
              fontFamily: 'Poppins',
              fontSize: '16px',
             }}>
            
              profesional. Utiliza el buscador y los filtros
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 18, mb: 3,
              fontFamily: 'Poppins',
              fontSize: '16px',
    
            }}>
              para encontrarlos rápidamente
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" 
          sx={{  ml:5, width: '400px' }}
          >
            <SearchBar onSearch={handleSearch} 
          
            />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            {todosServicios.map((servicio) => (
              
              <Box
                key={servicio.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '15px',
                  padding: 1,
                  mb: 2,
                  width: '359px',
                  height: '63px',
                  backgroundColor: 'white',

      
                }}
              >
                <FormControlLabel
                control={
                  <Checkbox
                    checked={servicios.includes(servicio.id)}
                    onChange={handleServicioChange}
                    value={servicio.id}
                    sx={{
                      '&.Mui-checked': {
                        color: 'yellow', // Cambiar el color a amarillo cuando está seleccionado
                      },
                    }}
                  />
                }
                label={servicio.nombre}
                sx={{
                  '& .MuiTypography-root': {
                    fontFamily: 'Poppins', // Aplica la fuente Poppins
                    fontSize: '16px', // Tamaño de fuente 14px
                    color: '#666666', // Cambiar el color del texto a negro
                  },
                }}
              />
              <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditServicio(servicio.id)}
                  sx={{
                    color: 'black',
                    backgroundColor: '#FFD000',
                    borderRadius: '50%',
                    ml: 26,
                  }}
                >
                  <EditIcon />
                </IconButton>
            
          </Box>
        ))}
          </Box>
          <Box display="flex" justifyContent="space-between" width="300px" mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'transparent',
                border: '3px solid #FFD000',
                color: '#FFD000',
                borderRadius: '30px',
                mb:3,
                width: '166px',
                height:'43px',
                mr: 3,
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
              <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: '#FFD000', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Guardar
  </Typography>
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: '#FF8272',
                color: 'black',
                borderRadius: '30px',
                mb:3,
                width: '166px',
                height:'43px',
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
              onClick={handleCancel}
            >
              <Typography
    sx={{
      fontFamily: 'Poppins', // Aplica la fuente Poppins
      fontSize: '16px', // Tamaño de fuente 16px
      color: 'black', // Asegura que el color del texto sea consistente
      textTransform: 'none', // Evita que el texto se ponga en mayúsculas automáticamente
    }}
  >
    Cancelar
  </Typography>
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  </Box>
  );
};

export default EditarProfesional;