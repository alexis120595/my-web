import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';

const AñadirProfesional = ({ sucursales }) => {
  const [email, setEmail] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log('Email:', email);
    console.log('Sucursal:', sucursal);
  };

  const handleCancel = () => {
    // Aquí puedes manejar la acción de cancelar, por ejemplo, limpiando los campos del formulario
    setEmail('');
    setSucursal('');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                borderRadius: '20px', // Bordes redondeados
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
          <Typography variant="body1" sx={{ mt: 1 }}>
            {sucursal ? `Sucursal seleccionada: ${sucursal}` : 'No se ha seleccionado ninguna sucursal'}
          </Typography>
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Seleccionar Sucursal</DialogTitle>
        <DialogContent>
          <List>
            {((sucursal) => (
              <ListItem button onClick={() => handleSucursalSelect(sucursal)} key={sucursal}>
                <ListItemText primary={sucursal} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AñadirProfesional;