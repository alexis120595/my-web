// # Este componente maneja la lógica para reservar turnos y administrar la interacción del usuario:
// # 1. Carga servicios, barberos y horarios desde la API usando axios.
// # 2. Permite seleccionar servicio, barbero, fecha y horario para la reserva.
// # 3. Integra Mercado Pago (initMercadoPago, Wallet) para el proceso de pago.
// # 4. Controla diálogos para confirmar selección de servicio, barbero y horario.
// # 5. Muestra una vista previa antes de confirmar la reserva y proceder al pago.
// # 6. Maneja estados y validaciones para asegurar que se tengan todos los datos requeridos.

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
  
  // estados para manejar los datos de la reserva
  //cuando se seleciona un servicio, barbero, horario y fecha
  //estado de mercado pago para manejar el proceso de pago
  //estados para manejar las ventanas emergentes de selección de servicio, barbero y horario
  //estados para almacenar el id de la empresa, el usuario 
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
  
const [mostrarVistaPrevia, setMostrarVistaPrevia] = useState(true);
const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { clienteId } = location.state || {};
  const storedUserId = localStorage.getItem('userId');
  const initialUserId = clienteId || storedUserId;
  const [userId, setUserId] = useState(initialUserId);
  const [empresaId, setEmpresaId] = useState(null);

  
  
  
  // Inicializar Mercado Pago con la clave de inicio
  initMercadoPago(process.env.REACT_APP_MERCADO_PAGO_INIT_KEY);;
//función para manejar la lógica de la reserva
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
// # Este useEffect se ejecuta siempre que cambien selectedServicio, selectedBarbero o selectedHorario.
// # Llama a las funciones correspondientes para obtener y actualizar los datos del servicio (nombre),
// # del barbero (nombre y horarios disponibles) y del horario (hora), manteniendo la información sincronizada.
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

// # Este useEffect verifica si la URL contiene un parámetro 'status=success'. 
// # Si existe, muestra un modal de éxito (setShowSuccessModal). 
// # Luego remueve el parámetro para evitar que permanezca en la URL, 
// # actualizando la misma sin recargar la página.
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
// ruta que trae los servicios de la empresa
  const fetchServicios = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/servicios`);
      setServicios(response.data);
    } catch (error) {
      console.error('Error fetching servicios:', error);
    }
  };
//ruta que trae los barberos de la empresa
  const fetchBarberos = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}/barberos`);
      setBarberos(response.data);
    } catch (error) {
      console.error('Error fetching barberos:', error);
    }
  };
// ruta que trae los horarios de los barberos
  const fetchHorariosByBarbero = async (barberoId) => {
    try {
      const response = await axios.get(`http://localhost:8000/horarios/barbero/${barberoId}`);
      setHorarios(response.data);
    } catch (error) {
      console.error('Error fetching horarios:', error);
    }
  };
// ruta que trae el nombre del servicio
  const fetchServicioNombre = async (servicioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/servicios/${servicioId}`);
      setServicioNombre(response.data.nombre);
      setBarberosRelacionados(response.data.barberos);
    } catch (error) {
      console.error('Error fetching servicio nombre:', error);
    }
  };
// ruta que trae el nombre del barbero
  const fetchBarberoNombre = async (barberoId) => {
    try {
      const response = await axios.get(`http://localhost:8000/barberos/${barberoId}`);
      setBarberoNombre(response.data.nombre);
    } catch (error) {
      console.error('Error fetching barbero nombre:', error);
    }
  };
// ruta que trae la hora espesifica 
  const fetchHorarioHora = async (horarioId) => {
    try {
      const response = await axios.get(`http://localhost:8000/horarios/${horarioId}`);
      setHorarioHora(response.data.hora);
    } catch (error) {
      console.error('Error fetching horario hora:', error);
    }
  };
// ruta que trae la empresa, que se muestra en la vista previa y el detalle de la reserva
  const fetchEmpresa = async (empresaId) => {
    try {
      const response = await axios.get(`http://localhost:8000/empresa/${empresaId}`);
      setEmpresa(response.data);
    } catch (error) {
      console.error('Error fetching empresa:', error);
    }
  };

 
// Verifica que todos los campos requeridos estén seleccionados
  const handleSubmit = (event) => {
    event.preventDefault();


    if (!selectedServicio || !selectedBarbero || !selectedHorario || !selectedDate || !userId || !empresaId) {
      console.error('Todos los campos son requeridos');
      return;
    }
// # Crea un objeto con la información necesaria para la reserva:
// # (servicio_id, barbero_id, horario_id, fecha, user_id y empresa_id).
// # Convierte la fecha a formato YYYY-MM-DD (split('T')[0]) para enviarla correctamente al backend.
    const formData = {
      servicio_id: selectedServicio,
      barbero_id: selectedBarbero,
      horario_id: selectedHorario,
      fecha: selectedDate.toISOString().split('T')[0], 
      user_id: userId,
      empresa_id: empresaId
    };

    console.log('Formulario enviado', formData);

    // Enviar el formulario al backend para crear la reserva
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
// # Esta función crea una preferencia de pago en Mercado Pago con los datos de la reserva.
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
// Abre la ventana de los horarios
  const handleOpenHorarioDialog = () => {
    setOpenHorarioDialog(true);
  };
// Cierra la ventana de los horarios
  const handleCloseHorarioDialog = () => {
    setOpenHorarioDialog(false);
  };
// Selecciona el horario y lo cierra
  const handleSelectHorario = (horarioId) => {
    setSelectedHorario(horarioId);
    setHorarioSeleccionado(true); 
    handleCloseHorarioDialog();
  };
// Abre la ventana de los servicios
  const handleOpenServicioDialog = () => {
    setOpenServicioDialog(true);
  };
// Cierra la ventana de los servicios
  const handleCloseServicioDialog = () => {
    setOpenServicioDialog(false);
  };
// Selecciona el servicio y lo cierra
  const handleSelectServicio = (servicioId) => {
    setSelectedServicio(servicioId);
    handleCloseServicioDialog();
  };
// Abre la ventana de los barberos
  const handleOpenBarberoDialog = () => {
    setOpenBarberoDialog(true);
  };
// Cierra la ventana de los barberos
  const handleCloseBarberoDialog = () => {
    setOpenBarberoDialog(false);
  };
// Selecciona el barbero y lo cierra
  const handleSelectBarbero = (barberoId) => {
    setSelectedBarbero(barberoId);
    handleCloseBarberoDialog();
  };
// Abre la vista previa de la reserva
  const handleToggleExpand = (id) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [id]: !prevExpanded[id],
    }));
  };
// Abre la vista previa de la reserva
  const handleOpenPreviewDialog = () => {
    const selectedServicioObj = servicios.find(servicio => servicio.id === selectedServicio);
    const selectedBarberoObj = barberos.find(barbero => barbero.id === selectedBarbero);
    const selectedHorarioObj = horarios.find(horario => horario.id === selectedHorario);
// Crea un objeto con los datos de la reserva para mostrar en la vista previa
    setReserva({
      servicio: selectedServicioObj,
      barbero: selectedBarberoObj,
      horario: selectedHorarioObj,
      fecha: selectedDate,
      empresa: empresa,
    });
    // Abre la ventana de vista previa
    setOpenPreviewDialog(true);
  };
 // Cierra la vista previa de la reserva
  const handleClosePreviewDialog = () => {
    setOpenPreviewDialog(false);
  };
// Confirma la reserva y cierra la vista previa
  const handleConfirmarReserva = async () => {
    try {
   
      console.log('Reserva confirmada:', reserva);
      setMostrarVistaPrevia(false);
      setOpenPreviewDialog(false);

    
    } catch (error) {
      console.error('Error al confirmar la reserva:', error);
    }
  };

  return (
    <Container
    sx={{
      width: { xs: '100%', sm: '360px' }, 
      height: 'auto',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: { xs: 2, sm: 0 }, 
      marginTop: { xs: 2, sm: 5 }, 
    }}>
    <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginBottom:"24px" }}>
        <Typography variant="h4" component="h1" gutterBottom
         sx={{
          fontFamily: 'Poppins', 
          fontSize: '24px', 
          width: '360px', 
          height: '32px', 
        }}
        >
          Reservar turno
        </Typography>
      </Box>
 {/* # Formulario principal para manejar selección de servicio, barbero, fecha y horario */}
 
    <form onSubmit={handleSubmit}  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
    {/* # Botón para mostrar diálogo de selección de servicio */}
    <Button variant="outlined" onClick={handleOpenServicioDialog}  startIcon={<NotificationsIcon />} sx={{ mt: 2,  borderRadius: '25px', 
    borderColor: 'black', 
    color: 'black', 
    height: '50px',
    width:"362px",
    marginBottom:"24px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', 
      borderColor: 'black', 
    },
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    textAlign: 'left',
    fontFamily: 'Poppins', 
    fontSize: '14px', 
    color: '#666666', 
    textTransform:'none',
   
  }} >
          
          {selectedServicio ? ` ${servicioNombre}` : 'Seleccionar Servicio'}
        </Button>
       
        {/* # Diálogo para mostrar los diferentes servicios disponibles */}
        <Dialog open={openServicioDialog} onClose={handleCloseServicioDialog}
         fullWidth
         maxWidth="sm" 
         PaperProps={{
           sx: {
            width: { xs: '100%',  }, 
            height: 'auto', 
             borderRadius: '20px',
             backgroundColor: '#504D4D',
             padding: { xs: 2, sm: 3 },
           },
         }}
        >

          <Box
    sx={{
      width: '100%', 
      height: 'auto',
      margin: '0 auto', 
      marginTop: { xs: 2, sm: '80px' },
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      alignItems: 'center', 
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

             {/* # Se itera sobre los servicios para listarlos como ítems seleccionables */}
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
                    backgroundColor: 'white', 
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
          {/* # Botón info que expande descripción del servicio */}
        <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleExpand(servicio.id);
                  }}
                  sx={{
                    width: "40px",
                    height: "40px",
                    position: 'absolute', 
                    top: 20, 
                    right:20, 
                    backgroundColor: '#FFD000', 
                    color: 'black', 
                    '&:hover': {
                      backgroundColor: '#FFD700', 
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
            padding: 0, 
            width: '100%', 
            display: 'flex',
            justifyContent: 'center',
          }}
          >
             {/* # Botón para cerrar el diálogo y continuar */}
            <Button onClick={handleCloseServicioDialog} color="primary"
            sx={{color:"black", 
              mr:4,
              backgroundColor: '#FFD000', 
              borderRadius: '30px', 
              width: '360px', 
              height: '43px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              fontFamily: 'Poppins',
              marginBottom: 2,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#FFD700', 
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
          </Box>
        </Dialog>



          {/* # Botón para mostrar diálogo de selección de barbero */}
        <Button variant="outlined" onClick={handleOpenBarberoDialog}  startIcon={<FaceIcon />} sx={{ mt: 2,  borderRadius: '25px', // Bordes redondeados
    borderColor: 'black', 
    color: 'black', 
    width: '362px', 
    height: '50px', 
    marginBottom:"24px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', 
      borderColor: 'black', 
    },
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    textAlign: 'left',
    fontFamily: 'Poppins', 
    fontSize: '14px', 
    color: '#666666', 
    textTransform:'none',
   
   }}>
        {selectedBarbero ? `${barberoNombre}` : 'Seleccionar Barbero'}
        </Button>
       
          {/* # Diálogo para mostrar los barberos disponibles para el servicio */}
        <Dialog open={openBarberoDialog} onClose={handleCloseBarberoDialog}
         fullWidth
         maxWidth="md" 
         PaperProps={{
           sx: {
             width: '549px', 
             height: '671px', 
             borderRadius: '20px',
             backgroundColor: '#504D4D',
           },
         }}
        >
      <Box
    sx={{
      width: '357px',
      height: '519px',
      margin: '0 auto', 
      marginTop:'80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center', 
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
             {/* # Se itera sobre barberosRelacionados para mostrarlos en la lista */}
            {barberosRelacionados.map(barbero => (
               
              <MenuItem key={barbero.id} value={barbero.id}
                onClick={() => handleSelectBarbero(barbero.id)}
              
              >
                 
                <BarberoCard barbero={barbero} />
              </MenuItem>
            ))}
             
          </DialogContent>
          <DialogActions>
             {/* # Botón para cerrar el diálogo y continuar */}
            <Button onClick={handleCloseBarberoDialog} color="primary"
             sx={{color:"black", 
              mr:4,
              backgroundColor: '#FFD000', 
              borderRadius: '30px', 
              width: { xs: '320px', sm: '357px' },
              height: '43px', 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD700', 
              },
            }}>
               <Typography
      sx={{
        width: '80px', 
        height: '24px', 
        fontSize: '16px', 
        textAlign: 'center', 
        fontFamily: 'Poppins', 
      }}
    >
      Continuar
    </Typography>
            </Button>
          </DialogActions>
          </Box>
        </Dialog>
         {/* # Componente Calendario para elegir la fecha de la reserva */}
        <Calendario selectedDate={selectedDate} setSelectedDate={setSelectedDate} 
       
        />

        {/* # Botón para abrir el diálogo de selección de horario */}
      <Button variant="outlined" onClick={handleOpenHorarioDialog }  startIcon={<AccessTimeIcon />} sx={{ mt: 2,  borderRadius: '25px', 
    borderColor: 'black', 
    color: 'black', 
    width: '362px', 
    height: '50px', 
    marginBottom:"32px",
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white', 
      borderColor: 'black', 
    },
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'flex-start', 
    textAlign: 'left',
    fontFamily: 'Poppins', 
    fontSize: '14px', 
    color: '#666666', 
    textTransform:'none',
   }}>
          {selectedHorario ? `${horarioHora}` : 'Seleccionar Horario'}
        </Button>
        
        {/* # Diálogo para mostrar horarios disponibles */}
        <Dialog open={openHorarioDialog} onClose={handleCloseHorarioDialog}
         fullWidth
         maxWidth="md" 
         PaperProps={{
           sx: {
             width: '549px', 
             height: '673px', 
             borderRadius: '20px',
             backgroundColor: '#504D4D',
           },
         }}
        >

<Box
    sx={{
      width: '360px',
      height: '404px',
      margin: '0 auto', 
      marginTop:'80px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      alignItems: 'center', 
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
                xs: '1fr 1fr', 
                sm: '1fr 1fr 1fr' 
              },
              gap: '10px',
            }}
          >
            {/* # Lista de horarios disponibles con su estado */}
            {horarios.map(horario => (
              <MenuItem key={horario.id} value={horario.id}
                onClick={() => handleSelectHorario(horario.id)}
                sx={{
                  width: '104px', 
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
             {/* # Botón para continuar y cerrar el diálogo */}
            <Button onClick={handleCloseHorarioDialog} color="primary"
             sx={{color:"black", 
             
              backgroundColor: '#FFD000', 
              borderRadius: '30px', 
              width: { xs: '310px', sm: '358px' }, 
              height: '43px',
              display:'flex',
              fontFamily: 'Poppins',
              fontSize: '16px',
              alignItems: 'center',
              justifyContent: 'center',
             
              '&:hover': {
                backgroundColor: '#FFD700', 
              },
            }}>
              Continuar
            </Button>
          </DialogActions>
          </Box>
        </Dialog>
        {/* # Si se seleccionó un horario y está habilitada la vista previa, muestra botón para abrirla */}
        {horarioSeleccionado &&  mostrarVistaPrevia && (
        <Button variant="contained" color="primary" onClick={handleOpenPreviewDialog} sx={{ mt: 2, 
            backgroundColor: '#FFD000', 
          color: 'black', 
          width:'361px',
          height:'43px',
          borderRadius:'30px',
          fontFamily:'Poppins',
          fontSize:'16px',
          }}>
          Ver Vista Previa
        </Button>
      )}
        {/* # Diálogo para la vista previa de la reserva */}
        <Dialog open={openPreviewDialog} onClose={handleClosePreviewDialog}
         PaperProps={{
          sx: {
            width: '403px', 
            height: '437px', 
            borderRadius: '20px', 
            backgroundColor: '#414141', 
          },
        }}
        >
          <DialogTitle sx={{ color: 'white',   fontFamily: 'Poppins', 
      fontSize: '24px',
       }}>Mi reserva</DialogTitle>
          <DialogContent>
            {reserva && (
              <Box
             
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px', 
               
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
                {/* # Botón para volver atrás sin confirmar */}
            <Button onClick={handleClosePreviewDialog} color="primary"
             sx={{color:"white", 
              mr:5,
              backgroundColor: '#414141', 
              border: '1px solid white',
              borderRadius: '30px', 
              width: '168px', 
              height: '43px', 
              display: 'flex',
              alignItems: 'left',
              justifyContent: 'center',
              
              
            }}>
              Volver
            </Button>
           {/* # Botón para confirmar la reserva */}
            <Button onClick={handleConfirmarReserva} color="primary"
             sx={{color:"black", 
              
              backgroundColor: '#FFD000', 
              borderRadius: '30px', 
              width: '168px', 
              height: '43px', 
              display: 'flex',
              alignItems: 'right',
              justifyContent: 'center',
              '&:hover': {
                backgroundColor: '#FFD000', 
              },
            }}>
              Reservar
            </Button>
            
          </DialogActions>
        </Dialog>
           {/* # Mensaje informativo sobre la necesidad de dejar una seña */}
        <Typography variant="body1" align="center" sx={{  color: 'white', fontFamily:'Poppins', fontSize:'12px' }}>
        Para poder  reservar un turno deberás dejar una seña
      </Typography>
        {/* # Botón final para enviar reserva y generar preferencia en Mercado Pago */}
      <Button type="submit" variant="contained" color="primary" onClick={handleCreatePreference}  sx={{ width: '360px', height:"43px", mt: 2, backgroundColor: '#FFD000',
    borderRadius: '30px', 
    color: 'black', 
    fontFamily: 'Poppins', 
    fontSize: '16px', 
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'lightyellow', 
    },}}>Reservar
    
    </Button>
       {/* # Componente Wallet de Mercado Pago, se muestra si existe preferenceId */}
      {preferenceId && (
        <Wallet initialization={{ preferenceId }} />
      )}

    </form>
    {/* # Diálogo que indica éxito de la reserva */}
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