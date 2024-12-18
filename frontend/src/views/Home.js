import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  MenuItem, Button, Typography, Box, Dialog, DialogTitle, DialogContent, DialogActions, Collapse, Container, Grid} from '@mui/material';
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
const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const status = searchParams.get('status');

    if (status === 'success') {
      setShowSuccessModal(true);
      searchParams.delete('status');
      const newRelativePathQuery = window.location.pathname + '?' + searchParams.toString();
      window.history.replaceState(null, '', newRelativePathQuery);
    }
  }, []);

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
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, // Ancho 100% en pantallas pequeñas, 360px en pantallas medianas y grandes
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, // Padding 2 en pantallas pequeñas, 0 en pantallas medianas y grandes
      marginTop: { xs: 2, sm: 5 }, // Margen superior 2 en pantallas pequeñas, 5 en pantallas medianas y grandes
    }}>
    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom:"24px" }}>
        <Typography variant="h4" component="h1" gutterBottom
         sx={{
          fontFamily: 'Poppins', // Fuente Poppins
          fontSize: '24px', // Tamaño de la fuente
          width: '360px', // Ancho del texto
          height: '32px', // Alto del texto
        }}
        >
          Reservar turno
        </Typography>
      </Box>

    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    
    <Button variant="outlined" onClick={handleOpenServicioDialog}  startIcon={<NotificationsIcon />} sx={{ mt: 2,  borderRadius: '25px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    height: '50px',
    width:"362px",
    marginBottom:"24px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
    display: 'flex', // Asegura que el contenido del botón esté alineado correctamente
    alignItems: 'center', // Centra verticalmente el contenido del botón
    justifyContent: 'flex-start', // Alinea el contenido del botón a la izquierda
    textAlign: 'left',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '14px', // Tamaño de fuente 14px
    color: '#666666', // Color del texto
    textTransform:'none',
   
  }} >
          
          {selectedServicio ? ` ${servicioNombre}` : 'Seleccionar Servicio'}
        </Button>
       

        <Dialog open={openServicioDialog} onClose={handleCloseServicioDialog}
         fullWidth
         maxWidth="sm" // Puedes usar "xs", "sm", "md", "lg", "xl"
         PaperProps={{
           sx: {
            width: { xs: '100%',  }, // Ancho responsivo: 100% en pantallas pequeñas, 549px en pantallas medianas y grandes
            height: 'auto', // Altura automática
             borderRadius: '20px',
             backgroundColor: '#504D4D',
             padding: { xs: 2, sm: 3 },
           },
         }}
        >

          <Box
    sx={{
      width: '100%', // Ancho ajustado al 100%
      height: 'auto',
      margin: '0 auto', // Centrar el contenedor horizontalmente
      marginTop: { xs: 2, sm: '80px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Distribuye el espacio entre los elementos
      alignItems: 'center', // Centra los elementos horizontalmente
    }}
  >
    <DialogTitle

                sx={{
                  color: 'white',
                  textAlign: 'left',
                  marginBottom: '24px',
                  fontSize: '24px',
                  fontFamily: 'Poppins',
}}
          >Seleccionar servicio</DialogTitle>
          <DialogContent>

        
            {Array.isArray(servicios) && servicios.map(servicio => (
              <MenuItem key={servicio.id} value={servicio.id}
                onClick={() => handleSelectServicio(servicio.id)}
                sx={{
                  width: { xs: '310px', sm: '360px' },
                
                  backgroundColor: 'white', 
                  border: '1px solid black',
                  borderRadius: '15px',
                  margin: '5px 0',
                  position: 'relative',
                  marginBottom: '16px',
                  '&:hover': {
                    backgroundColor: 'white', // Mantiene el fondo blanco al pasar el cursor
                  },
               
                }}
              >
              <Box 

              sx={{ display: 'flex',
               flexDirection: 'column',
                alignItems: 'flex-start',
                 width: '100%',
                  }}>
        <Typography variant="h6" 
        sx={{ color: '#666666', fontSize: '16px',   fontFamily: 'Poppins', }} 
        >{servicio.nombre}</Typography>
        <Typography variant="body2"
        sx={{ color: '#3A3A3A',  fontSize: '12px',   fontFamily: 'Poppins', }}
        > {servicio.duracion}</Typography>
        <Typography variant="body2"
        sx={{ color: '#3A3A3A',  fontSize: '16px',   fontFamily: 'Poppins', }}
        > ${servicio.precio}</Typography>
        <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(servicio.id);
                  }}
                  sx={{
                    width: "40px",
                    height: "40px",
                    position: 'absolute', // Posición absoluta para mover el icono
                    top: 20, // Alinearlo en la parte superior
                    right:20, // Alinearlo a la derecha
                    backgroundColor: '#FFD000', // Fondo amarillo
                    color: 'black', // Color
                    '&:hover': {
                      backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
                    },
                  }}
                >
                  <InfoIcon
                  sx={{ width: 23, height: 23 }}
                  />
                </IconButton >
                <Collapse in={expanded[servicio.id]} timeout="auto" unmountOnExit>
                  <Typography variant="body2"
                  sx={{ color: '#3A3A3A',
                      fontSize: '12px',
                      fontFamily: 'Poppins', }}
                  >{servicio.descripcion}</Typography>
                </Collapse>
        
      </Box>
              </MenuItem>
            ))}
            

          </DialogContent>
          <DialogActions
           sx={{
            padding: 0, // Elimina el padding para ajustar al tamaño del contenedor
            width: '100%', // Asegura que las acciones ocupen el ancho completo
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <Button onClick={handleCloseServicioDialog} color="primary"
            sx={{color:"black", 
              mr:4,
              backgroundColor: '#FFD000', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '360px', // Ancho del botón
              height: '43px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontFamily: 'Poppins',
              marginBottom: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
          </Box>
        </Dialog>

        

       
        <Button variant="outlined" onClick={handleOpenBarberoDialog}  startIcon={<FaceIcon />} sx={{ mt: 2,  borderRadius: '25px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '362px', // Ancho del botón
    height: '50px', // Alto del botón
    marginBottom:"24px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
    display: 'flex', // Asegura que el contenido del botón esté alineado correctamente
    alignItems: 'center', // Centra verticalmente el contenido del botón
    justifyContent: 'flex-start', // Alinea el contenido del botón a la izquierda
    textAlign: 'left',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '14px', // Tamaño de fuente 14px
    color: '#666666', // Color del texto
    textTransform:'none',
   
   }}>
        {selectedBarbero ? `${barberoNombre}` : 'Seleccionar Barbero'}
        </Button>
       
      
        <Dialog open={openBarberoDialog} onClose={handleCloseBarberoDialog}
         fullWidth
         maxWidth="md" // Puedes usar "xs", "sm", "md", "lg", "xl"
         PaperProps={{
           sx: {
             width: '549px', // Ancho personalizado
             height: '671px', // Alto personalizado
             borderRadius: '20px',
             backgroundColor: '#504D4D',
           },
         }}
        >
      <Box
    sx={{
      width: '357px',
      height: '519px',
      margin: '0 auto', // Centrar el contenedor horizontalmente
      marginTop:'80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Distribuye el espacio entre los elementos
      alignItems: 'center', // Centra los elementos horizontalmente
    }}
  >

          <DialogTitle
           sx={{
            color: 'white',
            textAlign: 'center',
            marginBottom: '24px',
            fontSize: '24px',
            fontFamily: 'Poppins',
}}
          >Seleccionar profesional</DialogTitle>
          <DialogContent>
          <Grid container spacing={2}>
            {barberosRelacionados.map(barbero => (
                <Grid item xs={12} sm={6} key={barbero.id}>
              <MenuItem key={barbero.id} value={barbero.id}
                onClick={() => handleSelectBarbero(barbero.id)}
              
              >
                 
                <BarberoCard barbero={barbero} />
              </MenuItem>
              </Grid>
            ))}
             </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseBarberoDialog} color="primary"
             sx={{color:"black", 
              mr:4,
              backgroundColor: '#FFD000', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: { xs: '320px', sm: '357px' },
              height: '43px', // Alto del botón
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
               <Typography
      sx={{
        width: '80px', // Ancho del texto
        height: '24px', // Alto del texto
        fontSize: '16px', // Tamaño de la fuente
        textAlign: 'center', // Centrar el texto
        fontFamily: 'Poppins', // Tipo de fuente
      }}
    >
      Continuar
    </Typography>
            </Button>
          </DialogActions>
          </Box>
        </Dialog>

        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
       
        />

      
      <Button variant="outlined" onClick={handleOpenHorarioDialog }  startIcon={<AccessTimeIcon />} sx={{ mt: 2,  borderRadius: '25px', // Bordes redondeados
    borderColor: 'black', // Color del borde negro
    color: 'black', // Color del texto negro
    width: '362px', // Ancho del botón
    height: '50px', // Alto del botón
    marginBottom:"32px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', // Mantener el fondo blanco al pasar el cursor
      borderColor: 'black', // Mantener el borde negro al pasar el cursor
    },
    display: 'flex', // Asegura que el contenido del botón esté alineado correctamente
    alignItems: 'center', // Centra verticalmente el contenido del botón
    justifyContent: 'flex-start', // Alinea el contenido del botón a la izquierda
    textAlign: 'left',
    fontFamily: 'Poppins', // Aplica la fuente Poppins
    fontSize: '14px', // Tamaño de fuente 14px
    color: '#666666', // Color del texto
    textTransform:'none',
   }}>
          {selectedHorario ? `${horarioHora}` : 'Seleccionar Horario'}
        </Button>
        

        <Dialog open={openHorarioDialog} onClose={handleCloseHorarioDialog}
         fullWidth
         maxWidth="md" // Puedes usar "xs", "sm", "md", "lg", "xl"
         PaperProps={{
           sx: {
             width: '549px', // Ancho personalizado
             height: '673px', // Alto personalizado
             borderRadius: '20px',
             backgroundColor: '#504D4D',
           },
         }}
        >

<Box
    sx={{
      width: '360px',
      height: '404px',
      margin: '0 auto', // Centrar el contenedor horizontalmente
      marginTop:'80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', // Distribuye el espacio entre los elementos
      alignItems: 'center', // Centra los elementos horizontalmente
    }}
  >
          <DialogTitle
          sx={{
            color: 'white',
            textAlign: 'left',
            marginBottom: '24px',
            fontSize: '24px',
            fontFamily: 'Poppins',
}}
          >Seleccionar Horario</DialogTitle>
          <DialogContent
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr 1fr', // 2 columnas en pantallas pequeñas
                sm: '1fr 1fr 1fr' // 3 columnas en pantallas medianas y grandes
              },
              gap: '10px',
            }}
          >
            
            {horarios.map(horario => (
              <MenuItem key={horario.id} value={horario.id}
                onClick={() => handleSelectHorario(horario.id)}
                sx={{
                  width: '104px', // Ancho del botón
                  height: '47px',
                  border: '1px solid black',
                  fontFamily: 'Poppins',
                  fontSize: '14px',
                  borderRadius: '15px',

                  color: '#3A3A3A',
                  backgroundColor: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                {horario.hora} {horario.estado  }
              </MenuItem>
            ))}
          </DialogContent>
          <DialogActions
         
          >
            <Button onClick={handleCloseHorarioDialog} color="primary"
             sx={{color:"black", 
             
              backgroundColor: '#FFD000', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: { xs: '310px', sm: '358px' }, // Ancho del botón
              height: '43px', // Alto del botón
              display:'flex',
              fontFamily: 'Poppins',
              fontSize: '16px',
              alignItems: 'center',
              justifyContent: 'center',
             
              '&:hover': {
                backgroundColor: '#FFD700', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
          </Box>
        </Dialog>
        {horarioSeleccionado &&  mostrarVistaPrevia && (
        <Button variant="contained" color="primary" onClick={handleOpenPreviewDialog} sx={{ mt: 2, 
            backgroundColor: '#FFD000', // Fondo amarillo
          color: 'black', // Color del texto negro para mejor contraste
          width:'361px',
          height:'43px',
          borderRadius:'30px',
          fontFamily:'Poppins',
          fontSize:'16px',
          }}>
          Ver Vista Previa
        </Button>
      )}

        <Dialog open={openPreviewDialog} onClose={handleClosePreviewDialog}
         PaperProps={{
          sx: {
            width: '403px', // Ancho personalizado
            height: '437px', // Alto personalizado
            borderRadius: '20px', // Bordes redondeados
            backgroundColor: '#414141', 
          },
        }}
        >
          <DialogTitle sx={{ color: 'white',   fontFamily: 'Poppins', // Fuente Poppins
      fontSize: '24px',
       }}>Mi reserva</DialogTitle>
          <DialogContent>
            {reserva && (
              <Box
             
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px', // Añadir separación entre los elementos
               
              }}
              >
                 <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Empresa: {reserva.empresa.nombre}</Typography>
                 <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Ubicación: {reserva.empresa.ubicacion}</Typography>
                <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Servicio: {reserva.servicio.nombre}</Typography>
                <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Precio: ${reserva.servicio.precio}</Typography>
                <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Barbero: {reserva.barbero.nombre}</Typography>
                <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Horario: {reserva.horario.hora}</Typography>
                <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>Fecha: {reserva.fecha.toLocaleDateString()}</Typography>
               
                
              </Box>
            )}


          </DialogContent>
          <DialogActions>
          
            <Button onClick={handleClosePreviewDialog} color="primary"
             sx={{color:"white", 
              mr:5,
              backgroundColor: '#414141', // Fondo amarillo
              border: '1px solid white',
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '168px', // Ancho del botón
              height: '43px', // Alto del botón
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'center',
              
              
            }}>
              Volver
            </Button>
           
            <Button onClick={handleConfirmarReserva} color="primary"
             sx={{color:"black", 
              
              backgroundColor: '#FFD000', // Fondo amarillo
              borderRadius: '30px', // Bordes redondeados para hacer un círculo
              width: '168px', // Ancho del botón
              height: '43px', // Alto del botón
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD000', // Fondo amarillo oscuro al pasar el cursor
              },
            }}>
              Reservar
            </Button>
            
          </DialogActions>
        </Dialog>

        <Typography variant="body1" align="center" sx={{  color: 'white', fontFamily:'Poppins', fontSize:'12px' }}>
        Para poder  reservar un turno deberás dejar una seña
      </Typography>

      <Button type="submit" variant="contained" color="primary" onClick={handleCreatePreference}  sx={{ width: '360px', height:"43px", mt: 2, backgroundColor: '#FFD000',
    borderRadius: '30px', // Bordes redondeados
    color: 'black', 
    fontFamily: 'Poppins', // Fuente Poppins
    fontSize: '16px', // Tamaño de la fuente
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'lightyellow', // Fondo amarillo más claro al pasar el cursor
    },}}>Reservar</Button>
      
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}

    </form>
    <Dialog open={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <DialogTitle>Reserva creada con éxito</DialogTitle>
        <DialogContent>
          <Typography>Ve al apartado de Mis turnos, para ver el detalle de la reserva.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSuccessModal(false)} color="primary"
           sx={{
            color:"black", 
            backgroundColor: 'yellow',
            borderRadius: '30px',
            '&:hover': {
              backgroundColor: '#FFD700',
            },
          }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Home;