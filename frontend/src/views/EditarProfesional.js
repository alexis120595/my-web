import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Dialog, DialogTitle, DialogContent, 
    DialogActions, List, ListItem, ListItemText, Checkbox, FormControlLabel} from '@mui/material';
import HorariosEmpresa from '../components/HorariosEmpresa';
import SearchBar from '../components/SearchBar';
import Servicios from '../components/Servicios';

const EditarProfesional = ({ sucursales }) => {
  const [email, setEmail] = useState('');
  const [sucursal, setSucursal] = useState('');
  const [open, setOpen] = useState(false);
  const [permisos, setPermisos] = useState({
    permiso1: false,
    permiso2: false,
    permiso3: false,
    permiso4: false,
    permiso5: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log('Email:', email);
    console.log('Sucursal:', sucursal);
    console.log('Permisos:', permisos);
  };

  const handleCancel = () => {
    // Aquí puedes manejar la acción de cancelar, por ejemplo, limpiando los campos del formulario
    setEmail('');
    setSucursal('');
    setPermisos({
        permiso1: false,
        permiso2: false,
        permiso3: false,
        permiso4: false,
        permiso5: false,
      });
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

  const handlePermisoChange = (event) => {
    setPermisos({
      ...permisos,
      [event.target.name]: event.target.checked,
    });
  };

  const onHorariosChange = (newHorarios) => {
    // Aquí puedes manejar el cambio de horarios
    console.log('Horarios:', newHorarios);
  };


  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt:100 }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center">
          Editar Profesional
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr: 5}}>
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
                borderRadius: '20px', // Bordes redondeados
              },
            }}
          />

<Typography variant="h4" component="h1" align="center"  sx={{ mr: 18}}>
          Sucursal
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 3}}>
    Sucursal donde el profesional se encuantra
  </Typography>
  <Typography variant="body1" align="center" sx={{ mr:14}}>
    prestando sus servicios.
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

          <Typography variant="h4" component="h1" align="center"  sx={{ mr: 18, mt:5}}>
          Permisos 
        </Typography>

        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1,}}>
  <Typography variant="body1" align="center" sx={{ mr: 7, mb:3}}>
    Otorgar permisos al profesional
  </Typography>
  <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 1,
        borderRadius: '20px', // Bordes redondeados
        backgroundColor: 'lightgrey', // Color de fondo gris
        padding: 2, // Espaciado interno
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
 
</Box>

<Typography variant="h4" component="h1" align="center"  sx={{ ml:5 , mt:5}}>
          Horarios de atencion  
        </Typography>

<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ mr:1}}>
    Utiliza el boton "todos" para aplicar el  
  </Typography>

  <Typography variant="body1" align="center" sx={{ ml: 5}}>
    mismo horario a todos los itemns. Y el boton 
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 2, mb:3}}>
    mas para agregar otro rango horario 
  </Typography>

  <HorariosEmpresa onHorariosChange={onHorariosChange} />

</Box>

<Typography variant="h4" component="h1" align="center"  sx={{ mr:16 , mt:2}}>
          Servicios 
        </Typography>

<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml:2}}>
    Seleciona los servicios que presta este 
  </Typography>

  <Typography variant="body1" align="center" sx={{ ml: 5}}>
    profesional. Utiliza el buscador y los filtros
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr:5 , mb:3}}>
    para encontrarlos rapidamente
  </Typography>

    


</Box>
<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
<SearchBar />
</Box>

<Servicios />


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
              Eliminar
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

export default EditarProfesional;