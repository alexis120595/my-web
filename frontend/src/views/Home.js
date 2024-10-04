import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  MenuItem, ListItemIcon, ListItemText, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions} from '@mui/material';
import Calendario from '../components/Calendario';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useParams } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FaceIcon from '@mui/icons-material/Face';
import BarberoCard from '../components/BarberoCard'




const Home = () => {
  
  const { Id } = useParams();
  const [servicios, setServicios] = useState([]);
  const [barberos, setBarberos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [selectedServicio, setSelectedServicio] = useState('');
  const [selectedBarbero, setSelectedBarbero] = useState('');
  const [selectedHorario, setSelectedHorario] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [openHorarioDialog, setOpenHorarioDialog] = useState(false);
  const [openServicioDialog, setOpenServicioDialog] = useState(false);
  const [openBarberoDialog, setOpenBarberoDialog] = useState(false);

  initMercadoPago('APP_USR-b9c96612-c5c7-4108-9960-746706eafd35');

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/empresa/${Id}/servicios`);
        setServicios(response.data);
      } catch (error) {
        console.error('Error fetching servicios:', error);
      }
    };

    if (Id) {
      fetchServicios();
    }
  }, [Id]);


  useEffect(() => {

    
    // Solicitud para obtener los servicios
    axios.get('http://127.0.0.1:8000/servicios')
      .then(response => {
        setServicios(response.data);
      })
      .catch(error => {
        console.error('Error fetching servicios:', error);
      });

    // Solicitud para obtener los barberos
    axios.get('http://127.0.0.1:8000/barberos')
      .then(response => {
        setBarberos(response.data);
      })
      .catch(error => {
        console.error('Error fetching barberos:', error);
      });

    // Solicitud para obtener los horarios
    axios.get('http://127.0.0.1:8000/horarios')
      .then(response => {
        setHorarios(response.data);
      })
      .catch(error => {
        console.error('Error fetching horarios:', error);
      });
  }, []);



  useEffect(() => {
    if (selectedServicio) {
      // Solicitud para obtener un servicio específico junto con los barberos relacionados
      axios.get(`http://127.0.0.1:8000/servicios/${selectedServicio}`)
        .then(response => {
          setBarberos(response.data.barberos);
        })
        .catch(error => {
          console.error('Error fetching barberos:', error);
        });
    }
  }, [selectedServicio]);

  useEffect(() => {
    if (selectedBarbero) {
      // Solicitud para obtener un barbero específico junto con los horarios relacionados
      axios.get(`http://127.0.0.1:8000/barberos/${selectedBarbero}`)
        .then(response => {
          setHorarios(response.data.horarios);
        })
        .catch(error => {
          console.error('Error fetching horarios:', error);
        });
    }
  }, [selectedBarbero]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica que todos los campos requeridos estén seleccionados
    if (!selectedServicio || !selectedBarbero || !selectedHorario || !selectedDate) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const formData = {
      servicio_id: selectedServicio,
      barbero_id: selectedBarbero,
      horario_id: selectedHorario,
      fecha: selectedDate.toISOString().split('T')[0], // Asegúrate de que la fecha esté en el formato correcto
    };

    console.log('Formulario enviado', formData);

    axios.post('http://127.0.0.1:8000/reservas', formData)
      .then(response => {
        console.log('Formulario enviado', response.data);
        // Puedes manejar la respuesta aquí, como mostrar un mensaje de éxito
        axios.put(`http://127.0.0.1:8000/horarios/${selectedHorario}`, { estado: false })
        .then(response => {
          console.log('Horario actualizado', response.data);
          // Actualizar la lista de horarios en el estado
          setHorarios(prevHorarios => prevHorarios.map(horario => 
            horario.id === selectedHorario ? { ...horario, estado: false } : horario
          ));
        })
        .catch(error => {
          console.error('Error actualizando el horario:', error);
        });
      })
      .catch(error => {
        console.error('Error enviando el formulario:', error);
        // Puedes manejar el error aquí, como mostrar un mensaje de error
      });
  };

  const handleCreatePreference = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/create_preference', {
        title: 'Reserva de servicio',
        quantity: 1,
        unit_price: 500, // Ajusta el precio según tu lógica
       
      });
      setPreferenceId(response.data.id);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };

  const handleOpenHorarioDialog = () => {
    setOpenHorarioDialog(true);
  };

  const handleCloseHorarioDialog = () => {
    setOpenHorarioDialog(false);
  };

  const handleSelectHorario = (horarioId) => {
    setSelectedHorario(horarioId);
    handleCloseHorarioDialog();
  };

  const handleOpenServicioDialog = () => {
    setOpenServicioDialog(true);
  };

  const handleCloseServicioDialog = () => {
    setOpenServicioDialog(false);
  };

  const handleSelectServicio = (servicioId) => {
    setSelectedServicio(servicioId);
    handleCloseServicioDialog();
  };

  const handleOpenBarberoDialog = () => {
    setOpenBarberoDialog(true);
  };

  const handleCloseBarberoDialog = () => {
    setOpenBarberoDialog(false);
  };

  const handleSelectBarbero = (barberoId) => {
    setSelectedBarbero(barberoId);
    handleCloseBarberoDialog();
  };

  return (
    <>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Reservar turno
        </Typography>
      </Box>

    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    
    <Button variant="outlined" onClick={handleOpenServicioDialog}  startIcon={<NotificationsIcon />} sx={{ mt: 2,  borderRadius: '20px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '300px', // Ancho del botón
    height: '55px', // Alto del botón
    '&:hover': {
      borderColor: 'black', // Mantener el color del borde negro al pasar el cursor
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo ligeramente oscuro al pasar el cursor
    },
  }} >
          
          {selectedServicio
            ? ` ${servicios.find(servicio => servicio.id === selectedServicio)?.nombre}`
            : 'Seleccionar Servicio'}
        </Button>
       

        <Dialog open={openServicioDialog} onClose={handleCloseServicioDialog}>
          <DialogTitle>Seleccionar Servicio</DialogTitle>
          <DialogContent>
            {Array.isArray(servicios) && servicios.map(servicio => (
              <MenuItem key={servicio.id} value={servicio.id}
                onClick={() => handleSelectServicio(servicio.id)}
                sx={{
                  border: '1px solid black',
                  borderRadius: '20px',
                  margin: '5px 0',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
             {servicio.nombre}
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseServicioDialog} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

       
        <Button variant="outlined" onClick={handleOpenBarberoDialog}  startIcon={<FaceIcon />} sx={{ mt: 2,  borderRadius: '20px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '300px', // Ancho del botón
    height: '55px', // Alto del botón
    '&:hover': {
      borderColor: 'black', // Mantener el color del borde negro al pasar el cursor
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo ligeramente oscuro al pasar el cursor
    },
   }}>
            {selectedBarbero
    ? `${barberos.find(barbero => barbero.id === selectedBarbero)?.nombre} ${barberos.find(barbero => barbero.id === selectedBarbero)?.apellido}`
    : 'Seleccionar Barbero'}
        </Button>
       
      
        <Dialog open={openBarberoDialog} onClose={handleCloseBarberoDialog}>
          <DialogTitle>Seleccionar Barbero</DialogTitle>
          <DialogContent>
            {barberos.map(barbero => (
              <MenuItem key={barbero.id} value={barbero.id}
                onClick={() => handleSelectBarbero(barbero.id)}
              
              >
                 
                <BarberoCard barbero={barbero} />
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBarberoDialog} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

      
      <Button variant="outlined" onClick={handleOpenHorarioDialog }  startIcon={<AccessTimeIcon />} sx={{ mt: 2,  borderRadius: '20px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '300px', // Ancho del botón
    height: '55px', // Alto del botón
    '&:hover': {
      borderColor: 'black', // Mantener el color del borde negro al pasar el cursor
      backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo ligeramente oscuro al pasar el cursor
    },
   }}>
           {selectedHorario
    ? `${horarios.find(horario => horario.id === selectedHorario)?.hora}`
    : 'Seleccionar Horario'}
        </Button>
        

        <Dialog open={openHorarioDialog} onClose={handleCloseHorarioDialog}>
          <DialogTitle>Seleccionar Horario</DialogTitle>
          <DialogContent>
            {horarios.map(horario => (
              <MenuItem key={horario.id} value={horario.id}
                onClick={() => handleSelectHorario(horario.id)}
                sx={{
                  border: '1px solid black',
                  borderRadius: '10px',
                  margin: '5px 0',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {horario.hora} {horario.estado ? 'Disponible' : 'No disponible'}
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseHorarioDialog} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

     
     
        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate}   />
      

      <Button type="submit" variant="contained" color="primary" onClick={handleCreatePreference}  sx={{ width: '300px', mt: 4 }}>Reservar</Button>
      
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}

    </form>
    </>
  );
};

export default Home;