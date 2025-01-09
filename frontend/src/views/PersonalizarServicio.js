// # Vista que permite personalizar un servicio, incluyendo el valor cobrado y los días en que se presta el servicio.
import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Checkbox, FormControlLabel} from '@mui/material';


const PersonalizarServicio = ({  }) => {
  const [email, setEmail] = useState('');
  
  // # Estado para manejar los días seleccionados
  const [dias, setDias] = useState({
    dia1: false,
    dia2: false,
    dia3: false,
    dia4: false,
    dia5: false,
    dia6: false,
    dia7: false,
  });
 // # Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviando los datos a una API
    console.log('Email:', email);
  
    console.log('Dias:', dias);
  };
 // Aquí puedes manejar la acción de cancelar, por ejemplo, limpiando los campos del formulario
  const handleCancel = () => {
   
    setEmail('');
  
    setDias({
        dia1: false,
        dia2: false,
        dia3: false,
        dia4: false,
        dia5: false,
        dia6: false,
        dia7: false,
      });
  };

 // # Maneja el cambio de estado de los checkboxes de los días

  const handleDiasChange = (event) => {
    setDias({
      ...dias,
      [event.target.name]: event.target.checked,
    });
  };




  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" sx={{ mt: 20 }}>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="50%">
        <Typography variant="h4" component="h1" align="center">
          Personalizar servicio
        </Typography>
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1 }}>
  <Typography variant="body1" align="center" sx={{ ml: 1, mt:2}}>
    Ingresa el valor que el profesional cobrara
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 15}}>
    por prestar este servicio 
  </Typography>

</Box>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Ingresar valor $"
            type="text"
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

        {/* # Sección para seleccionar los días que el profesional prestará el servicio */}
         <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" sx={{ mt: 1,  backgroundColor: 'lightgrey',
    borderRadius: '10px',
    padding: '20px', }}>
  <Typography variant="body1" align="center" sx={{ mr: 1}}>
    Seleccionar los dias que el profesional
  </Typography>

  <Typography variant="body1" align="center" sx={{ mr: 16, mb:3}}>
    prestara este servicio
  </Typography>
  <FormControlLabel
              control={
                <Checkbox
                  checked={dias.dia1}
                  onChange={handleDiasChange}
                  name="dia1"
                 
                />
              }
              label="Lun  "
              sx={{ mr: 22 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={dias.dia2}
                onChange={handleDiasChange}
                name="dia2"
               
              />
            }
            label="Mar  "
            sx={{ mr: 22 }}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={dias.dia3}
                onChange={handleDiasChange}
                name="dia3"
               
              />
            }
            label="Mie"
            sx={{ mr: 22}}
            />
            <FormControlLabel
              control={
                <Checkbox
                checked={dias.dia4}
                onChange={handleDiasChange}
                name="dia4"
               
              />
            }
            label="Jue "
            sx={{ mr: 22}}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={dias.dia5}
                  onChange={handleDiasChange}
                  name="dia5"
                 
                />
              }
              label="Vie "
              sx={{ mr: 22}}
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={dias.dia6}
                  onChange={handleDiasChange}
                  name="dia6"
                 
                />
              }
              label="Sab  "
              sx={{ mr: 22}}
            />
             <FormControlLabel
              control={
                <Checkbox
                  checked={dias.dia7}
                  onChange={handleDiasChange}
                  name="dia7"
                 
                />
              }
              label="Dom "
              sx={{ mr: 21}}
            />
 
</Box>


          {/* # Botón para guardar los cambios */}
          <Box display="flex" justifyContent="space-between" width="300px" mt={2}>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: 'yellow',
                color: 'black',
                borderRadius: '20px',
                width: '100%',
                '&:hover': {
                  backgroundColor: 'darkyellow',
                },
              }}
            >
              Guardar
            </Button>

          </Box>
        </form>
      </Box>
     
    </Box>
  );
};

export default PersonalizarServicio;