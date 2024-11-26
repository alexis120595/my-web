import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  MenuItem, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Collapse} from '@mui/material';
import Calendario from '../components/Calendario';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FaceIcon from '@mui/icons-material/Face';
import BarberoCard from '../components/BarberoCard';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const Home = () => {
  
  
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
  const [expanded, setExpanded] = useState({});
  const [openBarberoDialog, setOpenBarberoDialog] = useState(false);
  const [servicioNombre, setServicioNombre] = useState('');
  const [barberoNombre, setBarberoNombre] = useState('');
  const [horarioHora, setHorarioHora] = useState('');
  const [barberosRelacionados, setBarberosRelacionados] = useState([]);
  const [reserva, setReserva] = useState(null);
  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);
  const [empresa, setEmpresa] = useState(null);
  const [horarioSeleccionado, setHorarioSeleccionado] = useState(false);
  // Añade este estado en tu componente
const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const { clienteId } = location.state || {};
  const storedUserId = localStorage.getItem('userId');
  const initialUserId = clienteId || storedUserId;
  const [userId, setUserId] = useState(initialUserId);
  const [empresaId, setEmpresaId] = useState(null);

  
  
  
  
  initMercadoPago('APP_USR-b9c96612-c5c7-4108-9960-746706eafd35');

  useEffect(() => {
    const empresaIdFromStorage = localStorage.getItem('empresaId');
    
    if (empresaIdFromStorage) {
      setEmpresaId(empresaIdFromStorage); 
      fetchServicios(empresaIdFromStorage);
      fetchBarberos(empresaIdFromStorage);
      fetchEmpresa(empresaIdFromStorage);
    } else {
      console.error('No se encontró el ID de la empresa en el almacenamiento local');
    }

  }, []);

  useEffect(() => {
    if (selectedServicio) {
      fetchServicioNombre(selectedServicio);
     
    }
    if (selectedBarbero) {
      fetchBarberoNombre(selectedBarbero);
      fetchHorariosByBarbero(selectedBarbero);
    }
    if (selectedHorario) {
      fetchHorarioHora(selectedHorario);
    }
  }, [selectedServicio, selectedBarbero, selectedHorario]);

  const fetchServicios = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/servicios`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error fetching servicios:', error);
    }
  };

  const fetchBarberos = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error fetching barberos:', error);
    }
  };

  const fetchHorariosByBarbero = async (barberoId) => {
    try {
      const response = await axios.get(`http://localhost:8000/horarios/barbero/${barberoId}`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error fetching horarios:', error);
    }
  };

  const fetchServicioNombre = async (servicioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/servicios/${servicioId}`);
      setServicioNombre(response.data.nombre);
      setBarberosRelacionados(response.data.barberos);
    } catch (error) {
      console.error('Error fetching servicio nombre:', error);
    }
  };

  const fetchBarberoNombre = async (barberoId) => {
    try {
      const response = await axios.get(`http://localhost:8000/barberos/${barberoId}`);
      setBarberoNombre(response.data.nombre);
    } catch (error) {
      console.error('Error fetching barbero nombre:', error);
    }
  };

  const fetchHorarioHora = async (horarioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/horarios/${horarioId}`);
      setHorarioHora(response.data.hora);
    } catch (error) {
      console.error('Error fetching horario hora:', error);
    }
  };

  const fetchEmpresa = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}`);
      setEmpresa(response.data);
    } catch (error) {
      console.error('Error fetching empresa:', error);
    }
  };

 

  const handleSubmit = (event) => {
    event.preventDefault();

    // Verifica que todos los campos requeridos estén seleccionados
    if (!selectedServicio || !selectedBarbero || !selectedHorario || !selectedDate || !userId || !empresaId) {
      console.error('Todos los campos son requeridos');
      return;
    }

    const formData = {
      servicio_id: selectedServicio,
      barbero_id: selectedBarbero,
      horario_id: selectedHorario,
      fecha: selectedDate.toISOString().split('T')[0], // Asegúrate de que la fecha esté en el formato correcto
      user_id: userId,
      empresa_id: empresaId
    };

    console.log('Formulario enviado', formData);

    
    axios.post('http://127.0.0.1:8000/reservas', formData)
      .then(response => {
        console.log('Formulario enviado', response.data);

        localStorage.setItem('lastReservaId', response.data.id);
        

       
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

  const handleCreatePreference = async (reservaId) => {
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
    setHorarioSeleccionado(true); 
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

  const handleToggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };

  const handleOpenPreviewDialog = () => {
    const selectedServicioObj = servicios.find(servicio => servicio.id === selectedServicio);
    const selectedBarberoObj = barberos.find(barbero => barbero.id === selectedBarbero);
    const selectedHorarioObj = horarios.find(horario => horario.id === selectedHorario);

    setReserva({
      servicio: selectedServicioObj,
      barbero: selectedBarberoObj,
      horario: selectedHorarioObj,
      fecha: selectedDate,
      empresa: empresa,
    });

    setOpenPreviewDialog(true);
  };

  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };

  const handleConfirmarReserva = async () => {
    try {
      // Aquí puedes agregar la lógica para crear la reserva y proceder al pago
      // Por ejemplo, enviar los datos de la reserva al backend y redirigir al pago
      console.log('Reserva confirmada:', reserva);
      setMostrarVistaPrevia(false);
      setOpenPreviewDialog(false);
      // Redirigir al pago
    
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
    }
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
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
   
  }} >
          
          {selectedServicio ? ` ${servicioNombre}` : 'Seleccionar Servicio'}
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
                  position: 'relative',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Typography variant="h6">{servicio.nombre}</Typography>
        <Typography variant="body2"> {servicio.duracion}</Typography>
        <Typography variant="body2"> ${servicio.precio}</Typography>
        <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(servicio.id);
                  }}
                  sx={{
                    position: 'absolute', // Posición absoluta para mover el icono
                    top: 5, // Alinearlo en la parte superior
                    right: 5, // Alinearlo a la derecha
                    backgroundColor: 'yellow', // Fondo amarillo
                    color: 'black', // Color
                    '&:hover': {
                      backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
                    },
                  }}
                >
                  <InfoIcon />
                </IconButton>
                <Collapse in={expanded[servicio.id]} timeout="auto" unmountOnExit>
                  <Typography variant="body2">{servicio.descripcion}</Typography>
                </Collapse>
        
      </Box>
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseServicioDialog} color="primary"
            sx={{color:"black", 
              mr:4,
              backgroundColor: 'yellow', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '150px', // Ancho del botón
              height: '30px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

       
        <Button variant="outlined" onClick={handleOpenBarberoDialog}  startIcon={<FaceIcon />} sx={{ mt: 2,  borderRadius: '20px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '300px', // Ancho del botón
    height: '55px', // Alto del botón
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
   
   }}>
        {selectedBarbero ? `${barberoNombre}` : 'Seleccionar Barbero'}
        </Button>
       
      
        <Dialog open={openBarberoDialog} onClose={handleCloseBarberoDialog}>
          <DialogTitle>Seleccionar Barbero</DialogTitle>
          <DialogContent>
            {barberosRelacionados.map(barbero => (
              <MenuItem key={barbero.id} value={barbero.id}
                onClick={() => handleSelectBarbero(barbero.id)}
              
              >
                 
                <BarberoCard barbero={barbero} />
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBarberoDialog} color="primary"
             sx={{color:"black", 
              mr:4,
              backgroundColor: 'yellow', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '150px', // Ancho del botón
              height: '30px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>

        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate}   />

      
      <Button variant="outlined" onClick={handleOpenHorarioDialog }  startIcon={<AccessTimeIcon />} sx={{ mt: 2,  borderRadius: '20px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '300px', // Ancho del botón
    height: '55px', // Alto del botón
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
   }}>
          {selectedHorario ? `${horarioHora}` : 'Seleccionar Horario'}
        </Button>
        

        <Dialog open={openHorarioDialog} onClose={handleCloseHorarioDialog}>
          <DialogTitle>Seleccionar Horario</DialogTitle>
          <DialogContent
           sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}
          >
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
            <Button onClick={handleCloseHorarioDialog} color="primary"
             sx={{color:"black", 
              mr:12,
              backgroundColor: 'yellow', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '150px', // Ancho del botón
              height: '30px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
        {horarioSeleccionado &&  mostrarVistaPrevia && (
        <Button variant="contained" color="primary" onClick={handleOpenPreviewDialog} sx={{ mt: 2,   backgroundColor: 'yellow', // Fondo amarillo
          color: 'black', // Color del texto negro para mejor contraste
          '&:hover': {
            backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
          }, }}>
          Ver Vista Previa
        </Button>
      )}

        <Dialog open={openPreviewDialog} onClose={handleClosePreviewDialog}>
          <DialogTitle>Vista Previa de la Reserva</DialogTitle>
          <DialogContent>
            {reserva && (
              <Box>
                 <Typography variant="body1">Empresa: {reserva.empresa.nombre}</Typography>
                 <Typography variant="body1">Ubicación: {reserva.empresa.ubicacion}</Typography>
                <Typography variant="body1">Servicio: {reserva.servicio.nombre}</Typography>
                <Typography variant="body1">Precio: ${reserva.servicio.precio}</Typography>
                <Typography variant="body1">Barbero: {reserva.barbero.nombre}</Typography>
                <Typography variant="body1">Horario: {reserva.horario.hora}</Typography>
                <Typography variant="body1">Fecha: {reserva.fecha.toLocaleDateString()}</Typography>
               
                
              </Box>
            )}


          </DialogContent>
          <DialogActions>
          <Typography variant="body2" sx={{ mb: 2, color: 'black' }}>
      Para poder reservar el tuno debera dejar una seña 
    </Typography>
            <Button onClick={handleClosePreviewDialog} color="primary"
             sx={{color:"black", 
              mr:5,
              backgroundColor: 'yellow', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '150px', // Ancho del botón
              height: '30px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Volver
            </Button>
           
            <Button onClick={handleConfirmarReserva} color="primary"
             sx={{color:"black", 
              mr:15,
              backgroundColor: 'yellow', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '150px', // Ancho del botón
              height: '30px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Reservar
            </Button>
            
          </DialogActions>
        </Dialog>

        <Typography variant="body1" align="center" sx={{ mt: 4, color: 'white' }}>
        Para reservar un turno deberás dejar una seña
      </Typography>

      <Button type="submit" variant="contained" color="primary" onClick={handleCreatePreference}  sx={{ width: '300px', mt: 4, backgroundColor: 'yellow',
    color: 'black', 
    '&:hover': {
      backgroundColor: 'lightyellow', // Fondo amarillo más claro al pasar el cursor
    },}}>Reservar</Button>
      
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}

    </form>
    </>
  );
};

export default Home;