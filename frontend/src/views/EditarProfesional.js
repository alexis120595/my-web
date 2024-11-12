import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import HorariosEmpresa from '../components/HorariosEmpresa';
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
        setNombre(barbero.nombre);
        setApellido(barbero.apellido);
        setEmail(barbero.email);
        setSucursal(barbero.sucursal_id);
        setServicios(barbero.servicios.map(servicio => servicio.id));
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedBarbero = {
     
      email,
      sucursal_id: sucursal,
      servicio_id: servicios,
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

  const onHorariosChange = (newHorarios) => {
    console.log('Horarios:', newHorarios);
  };

  const handleEditServicio = (servicioId) => {
    // Lógica para editar el servicio
    console.log(`Editar servicio con ID: ${servicioId}`);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt: 100 }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center">
          Editar Profesional
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
          <Typography variant="body1" align="center" sx={{ mr: 5 }}>
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
              mb: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px',
              },
            }}
          />
          <Typography variant="h4" component="h1" align="center" sx={{ mr: 18 }}>
            Sucursal
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ ml: 3 }}>
              Sucursal donde el profesional se encuentra
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 14 }}>
              prestando sus servicios.
            </Typography>
          </Box>
          <FormControl variant="outlined" sx={{ mt: 2, width: '300px' }}>
            <InputLabel id="sucursal-label">Seleccionar Sucursal</InputLabel>
            <Select
              labelId="sucursal-label"
              value={sucursal}
              onChange={handleSucursalChange}
              label="Seleccionar Sucursal"
              sx={{
                borderRadius: '20px',
              }}
            >
              {sucursales.map((sucursal) => (
                <MenuItem key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="body1" sx={{ mt: 1 }}>
            {sucursal ? `Sucursal seleccionada: ${sucursal}` : 'No se ha seleccionado ninguna sucursal'}
          </Typography>

          <Typography variant="h4" component="h1" align="center" sx={{ mr: 18, mt: 5 }}>
            Permisos
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr: 7, mb: 3 }}>
              Otorgar permisos al profesional
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 1,
                borderRadius: '20px',
                backgroundColor: 'lightgrey',
                padding: 2,
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso1}
                    onChange={handlePermisoChange}
                    name="permiso1"
                  />
                }
                label="Opción reservar online"
                sx={{ mr: 7 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso2}
                    onChange={handlePermisoChange}
                    name="permiso2"
                  />
                }
                label="Agendar turnos en su agenda"
                sx={{ mr: 1 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso3}
                    onChange={handlePermisoChange}
                    name="permiso3"
                  />
                }
                label="Editar turnos en su agenda"
                sx={{ mr: 3 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso4}
                    onChange={handlePermisoChange}
                    name="permiso4"
                  />
                }
                label="Ver datos de clientes"
                sx={{ mr: 9 }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={permisos.permiso5}
                    onChange={handlePermisoChange}
                    name="permiso5"
                  />
                }
                label="Recibir señas en su MP"
                sx={{ mr: 6 }}
              />
            </Box>
          </Box>
          <Typography variant="h4" component="h1" align="center" sx={{ ml: 5, mt: 5 }}>
            Horarios de atención
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ mr: 1 }}>
              Utiliza el botón "todos" para aplicar el
            </Typography>
            <Typography variant="body1" align="center" sx={{ ml: 5 }}>
              mismo horario a todos los items. Y el botón
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 2, mb: 3 }}>
              más para agregar otro rango horario
            </Typography>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 1, ml:5 }}>
            <HorariosEmpresa onHorariosChange={onHorariosChange} />
          </Box>
          </Box>
          <Typography variant="h4" component="h1" align="center" sx={{ mr: 16, mt: 2 }}>
            Servicios
          </Typography>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            <Typography variant="body1" align="center" sx={{ ml: 2 }}>
              Selecciona los servicios que presta este
            </Typography>
            <Typography variant="body1" align="center" sx={{ ml: 5 }}>
              profesional. Utiliza el buscador y los filtros
            </Typography>
            <Typography variant="body1" align="center" sx={{ mr: 5, mb: 3 }}>
              para encontrarlos rápidamente
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center" 
          sx={{  ml:15, width: '400px' }}
          >
            <SearchBar onSearch={() => {}} 
            />
          </Box>
          <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
            {todosServicios.map((servicio) => (
              
              <Box
                key={servicio.id}
                sx={{
                  border: '1px solid #ccc',
                  borderRadius: '20px',
                  padding: 1,
                  mb: 1,
                  width: '300px',
                }}
              >
                <FormControlLabel
                control={
                  <Checkbox
                    checked={servicios.includes(servicio.id)}
                    onChange={handleServicioChange}
                    value={servicio.id}
                  />
                }
                label={servicio.nombre}
              />
              <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => handleEditServicio(servicio.id)}
                  sx={{
                    color: 'black',
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    ml: 18,
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
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                mb:3,
                width: '45%',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                mb:3,
                width: '45%',
                '&:hover': {
                  backgroundColor: 'red',
                },
              }}
              onClick={handleCancel}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default EditarProfesional;