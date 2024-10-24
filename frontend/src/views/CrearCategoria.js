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
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh">
    <Box display="flex" flexDirection="column" justifyContent="center" height="50%">
      <Typography variant="h4" component="h1" align="center">
        Crear Categoría
      </Typography>
      <Typography variant="body1" component="p" sx={{ mt: 2 }} align="center">
        Elegi el nombre de tu nueva categoria y
        
      </Typography>
      <Typography variant="body1" component="p" sx={{ mt: 2 }} align="center">
        
        
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
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />
 <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1,   borderRadius: '20px', // Bordes redondeados
        backgroundColor: 'lightgrey', // Color de fondo gris
        padding: 2,  }}>

              <List>
              {servicios.map((servicio) => (
                <ListItem key={servicio.id}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedServicios.includes(servicio.id)}
                        onChange={handleServicioChange}
                        value={servicio.id}
                      />
                    }
                    label={servicio.nombre}
                  />
                </ListItem>
              ))}
            </List>
  
        </Box>
 
        
          <Button type="submit" variant="contained" color="primary"  sx={{
              mt: 2,
              width: '300px', // Más ancho
              backgroundColor: 'yellow', // Color de fondo amarillo
              color: 'black', // Color de texto negro
              borderRadius: '30px', 
              '&:hover': {
                backgroundColor: 'darkyellow', // Color de fondo al pasar el mouse
              },
            }}>
            Crear
          </Button>
        </form>
        {success && <Typography color="primary">{success}</Typography>}
        {error && <Typography color="error">{error}</Typography>}
    </Box>
  </Box>
    );
};

export default CrearCategoria;