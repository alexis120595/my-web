// vista para añadir un profesional a una sucursal
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';

const AñadirProfesional = ({ sucursales }) => {
  // Definimos los estados para el email, la sucursal y el estado de las ventana modal
  const [email, setEmail] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [open, setOpen] = useState(false);

 // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Email:', email);
    console.log('Sucursal:', sucursal);
  };

 // Función para manejar el cancelar
  const handleCancel = () => {
  
    setEmail('');
    setSucursal('');
  };
// Función para manejar el abrir la ventana modal
  const handleClickOpen = () => {
    setOpen(true);
  };
// Función para manejar el cerrar la ventana modal
  const handleClose = () => {
    setOpen(false);
  };
// Función para manejar la selección de la sucursal
  const handleSucursalSelect = (sucursal) => {
    setSucursal(sucursal);
    handleClose();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt: 15 }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center">
          Añadir Profesional
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 4}}>
    Ingresa la direccion de email del profesional
  </Typography>
  <Typography variant="body1" align="center" sx={{ ml:2}}>
    para enviarle una invitacion y sumarlo a tu
  </Typography>
  <Typography variant="body1" align="center" sx={{  mr:3}}>
    listado de profesionales disponibles.
  </Typography>
</Box>
        {/* Formulario para añadir un profesional */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              mt: 2,
              width: '300px',
              '& .MuiOutlinedInput-root': {
                borderRadius: '20px', 
              },
            }}
          />

<Typography variant="h4" component="h1" align="center">
          Selecionar sucursal
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 3}}>
    Selecciona la sucursal donde el profesional
  </Typography>
  <Typography variant="body1" align="center" sx={{ mr:15}}>
    prestara sus servicios.
  </Typography>
 
</Box>
          {/* Botón para seleccionar la sucursal */}
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{
              mt: 2,
              width: '300px',
              borderRadius: '20px',
            }}
          >
            Seleccionar Sucursal
          </Button>
          {/* Texto para mostrar la sucursal seleccionada */}
          <Typography variant="body1" sx={{ mt: 1 }}>
            {sucursal ? `Sucursal seleccionada: ${sucursal}` : 'No se ha seleccionado ninguna sucursal'}
          </Typography>
          {/* Botón para cancelar  */}
          <Box display="flex" justifyContent="space-between" width="300px" mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                width: '45%',
                '&:hover': {
                  backgroundColor: 'darkyellow',
                },
              }}
            >
              Cancelar
            </Button>
            {/* Botón para añadir el profesional */}
            <Button
              type="button"
              variant="contained"
              sx={{
                backgroundColor: 'grey',
                color: 'white',
                borderRadius: '20px',
                width: '45%',
                '&:hover': {
                  backgroundColor: 'darkgrey',
                },
              }}
              onClick={handleCancel}
            >
              Añadir
            </Button>
          </Box>
        </form>
      </Box>
      {/* Ventana modal para seleccionar la sucursal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccionar Sucursal</DialogTitle>
        <DialogContent>
          {/* Lista de sucursales */}
          <List>
            {((sucursal) => (
              <ListItem button onClick={() => handleSucursalSelect(sucursal)} key={sucursal}>
                <ListItemText primary={sucursal} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          {/* Botón para cerrar la ventana modal */}
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AñadirProfesional;