import React, {useState}from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';

const CrearCategoria = () => {

    const [nombreCategoria, setNombreCategoria] = useState('');

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