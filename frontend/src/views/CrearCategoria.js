import React, {useState}from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel } from '@mui/material';

const CrearCategoria = () => {

    const [nombreCategoria, setNombreCategoria] = useState('');
    const [permisos, setPermisos] = useState({
      permiso1: false,
      permiso2: false,
      permiso3: false,
      permiso4: false,
      permiso5: false,
    });

    const handlePermisoChange = (event) => {
      setPermisos({
        ...permisos,
        [event.target.name]: event.target.checked,
      });
    };
  

    const handleSubmit = (event) => {
      event.preventDefault();
      // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
      console.log('Nombre de la Categoría:', nombreCategoria);
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
  <FormControlLabel
              control={
                <Checkbox
                  checked={permisos.permiso1}
                  onChange={handlePermisoChange}
                  name="permiso1"
                 
                />
              }
              label="Opcion reservar online"
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
              sx={{ mr: 1}}
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
              sx={{ mr: 3}}
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
              sx={{ mr:9}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={permisos.permiso5}
                  onChange={handlePermisoChange}
                  name="permiso5"
                />
              }
              label="Resivir señas en su MP"
              sx={{ mr: 6}}
            />
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
    </Box>
  </Box>
    );
};

export default CrearCategoria;