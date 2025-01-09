// # Bloque que define el componente EditarProfesional para editar profesionales (barberos) en el sistema.
// # Obtiene el ID del profesional con useParams y lo utiliza para cargar los datos (nombre, apellido, email, sucursal, servicios, horarios) desde la API.
// # Muestra una lista de sucursales y servicios cargados desde la base de datos, permitiendo seleccionar/actualizar la sucursal y servicios asociados.
// # handleSubmit envía la información actualizada al servidor mediante un PUT en /barberos/:id, tras lo cual redirige a '/personal'.
// # También se maneja un estado local para permisos y horarios, y se aplica un filtrado de servicios mediante handleSearch.
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, IconButton, Switch} from '@mui/material';
import HorariosEmpleado from '../components/HorariosEmpleado';
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
// estados iniciales que se utilizan en el formulario
const EditarProfesional = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [sucursales, setSucursales] = useState([]); 
  const [servicios, setServicios] = useState([]);
  const [todosServicios, setTodosServicios] = useState([]); 
  const empresaId = localStorage.getItem('empresaId'); 
  const [horarios, setHorarios] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  // estado local para permisos de profesionales
  const [permisos, setPermisos] = useState({
    permiso1: false,
    permiso2: false,
    permiso3: false,
    permiso4: false,
    permiso5: false,
  });
// useEffect para cargar los datos del profesional y las sucursales al montar el componente
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
// función para cargar las sucursales de la empresa
    const fetchSucursales = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/sucursales`);
        setSucursales(response.data);
      } catch (error) {
        console.error('Error fetching sucursales:', error);
      }
    };
// función para cargar los servicios de la empresa
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
// función para buscar servicios por nombre
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
// función para enviar los datos actualizados al servidor
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
// función para cancelar la edición y volver a la vista de personal
  const handleCancel = () => {
    navigate('/personal');
  };
// funciones para manejar los cambios en los campos del formulario
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
          {/* # Campo de texto para modificar el email del profesional */}
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
                color: 'black', 
              },
              '& .MuiInputLabel-root': {
      fontFamily: 'Poppins', 
      fontSize: '14px',      
      color: '#3A3A3A',     
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
          {/* # Selector de sucursal */}
          <FormControl variant="outlined" sx={{ mt: 2, width: '360px', height:'50px', marginBottom: '24px',}}>
            <InputLabel id="sucursal-label"
            sx={{
              fontFamily: 'Poppins', 
              fontSize: '14px',    
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
                color: 'black', 
                fontFamily: 'Poppins', 
                fontSize: '14px',     
              
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
          {/* # Mensaje que muestra la sucursal seleccionada */}
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
            {/* # Lista de permisos con checkboxes */}
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
                      color: 'white', 
                      '&.Mui-checked': {
                        color: 'yellow', 
                      },
                    }}
                    
                  />
                }
                label="Opción reservar online"
                sx={{ 
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', 
                    fontSize: '14px',    
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
                      color:'white', 
                      '&.Mui-checked': {
                        color: 'yellow', 
                      },
                    }}
                  />
                }
                label="Agendar turnos en su agenda"
                sx={{ mr: 1,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', 
                    fontSize: '14px',   
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
                      color: 'white', 
                      '&.Mui-checked': {
                        color: 'yellow',
                      },
                    }}
                  />
                }
                label="Editar turnos en su agenda"
                sx={{ mr: 3,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', 
                    fontSize: '14px',    
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
                      color: 'white', 
                      '&.Mui-checked': {
                        color: 'yellow', 
                      },
                    }}
                  />
                }
                label="Ver datos de clientes"
                sx={{ mr: 9,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', 
                    fontSize: '14px',    
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
                      
                      color: 'white', 
                      '&.Mui-checked': {
                        color: 'yellow', 
                      },
                    }}
                  />
                }
                label="Recibir señas en su MP"
                sx={{ mr: 6,
                  '& .MuiTypography-root': {
                    fontFamily: 'Inter', 
                    fontSize: '14px',   
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
            
              {/* # Componente para gestionar los horarios del profesional */}
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
            {/* # Barra de búsqueda para filtrar servicios */}
            <SearchBar onSearch={handleSearch} 
          
            />
          </Box>
           {/* # Lista de servicios con checkboxes para seleccionar los servicios que presta el profesional */}
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
                        color: 'yellow', 
                      },
                    }}
                  />
                }
                label={servicio.nombre}
                sx={{
                  '& .MuiTypography-root': {
                    fontFamily: 'Poppins', 
                    fontSize: '16px', 
                    color: '#666666', 
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
          {/* # Botones para guardar cambios o cancelar */}
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
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: '#FFD000', 
      textTransform: 'none', 
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
      fontFamily: 'Poppins', 
      fontSize: '16px', 
      color: 'black', 
      textTransform: 'none', 
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