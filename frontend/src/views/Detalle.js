import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';
import BusinessIcon from '@mui/icons-material/Business';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Detalle = () => {
  const { id } = useParams();
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchReserva = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/reservas/${id}`);
        setReserva(response.data);
      } catch (error) {
        setError('Error fetching ultima reserva');
      } finally {
        setLoading(false);
      }
    };

    fetchReserva();
  }, [id]);

  const handleAnularClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCancelClick = async () => {
    try {
      // Llamada a la API para cancelar la reserva (actualizar estado a "Cancelada")
      await axios.put(`http://127.0.0.1:8000/reservas/${id}/cancelar`);
      // Mostrar mensaje de éxito
      setSuccessMessage('Reserva cancelada de forma exitosa');
      // Cerrar el diálogo
      setOpenDialog(false);
      // Redirigir a la página de inicio después de 2 segundos
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error canceling reservation:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Alinear al inicio verticalmente
        width: '100%',
        minHeight: '100%', // Usar minHeight en lugar de height
        padding: { xs: 2, sm: 4 }, // Padding responsivo
       
      }}
    >
      <Box
        sx={{
          width: { xs: '100%', sm: '550px' }, // Ancho responsivo
          height: { xs: 'auto', sm: '673px' },
          backgroundColor: '#504D4D',
          borderRadius: '20px',
          boxShadow: 3,
          padding: { xs: 2, sm: 4 }, // Padding interno responsivo
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card sx={{
          width: { xs: '100%', sm: '403px' }, // Ancho responsivo: 100% en pantallas pequeñas, 403px en pantallas medianas y grandes
          height: { xs: 'auto', sm: '542px' },
          borderRadius: '15px',
          boxShadow: 3,
          backgroundColor: '#414141',
          padding: 2,
        }}>
          <CardContent>
            <Typography variant="h5" component="div"
              sx={{
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '24px',
                marginTop: '24px',
                marginBottom: '24px',
                textAlign: 'center', // Centrar el título
              }}
            >
              Mi turno reservado
            </Typography>
            {reservas ? (
              <>
                {/* Empresa */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <BusinessIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Empresa:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.empresa}
                  </Typography>
                </Box>

                {/* Dirección */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationOnIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Dirección:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.ubicacion}
                  </Typography>
                </Box>

                {/* Servicio */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <NotificationsIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Servicio:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.servicio}
                  </Typography>
                </Box>

                {/* Precio */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <MonetizationOnIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Precio:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    ${reservas.precio}
                  </Typography>
                </Box>

                {/* Barbero */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <PersonIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Barbero:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.barbero}
                  </Typography>
                </Box>

                {/* Fecha */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EventIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Fecha:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.fecha}
                  </Typography>
                </Box>

                {/* Hora */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, width: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon sx={{ color: 'white', mr: 1 }} />
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                    <strong>Hora:</strong>
                  </Typography>
                  </Box>
                  <Typography sx={{ color: 'white', fontFamily: 'Poppins', fontSize: '16px', textAlign: 'right' }}>
                    {reservas.horario}
                  </Typography>
                </Box>
              </>
            ) : (
              <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
                No se encontró la reserva.
              </Typography>
            )}
          </CardContent>

          {/* Botones */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', marginTop: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/home')}
              sx={{
                fontFamily: 'Poppins',
                fontSize: '14px',
                textTransform: 'none',
                width: { xs: '140px', sm: '168px' },
                height: '43px',
                borderRadius: '30px',
                margin: '10px',
                backgroundColor: '#414141',
                color: 'white',
                border: '2px solid white', // Añadir borde blanco
                '&:hover': {
                  backgroundColor: '#414141', // Mantener el fondo al hacer hover
                  borderColor: 'white',
                },
              }}
            >
              Editar
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={handleAnularClick}
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                textTransform: 'none',
                width: { xs: '140px', sm: '168px' },
                height: '43px',
                borderRadius: '30px',
                margin: '10px',
                backgroundColor: '#FF8272',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'red', // Cambiar al hover
                  borderColor: 'white',
                },
              }}
            >
              Anular
            </Button>
          </Box>
        </Card>

        {/* Snackbar */}
        <Snackbar
          open={!!successMessage}
          autoHideDuration={2000}
          onClose={() => setSuccessMessage('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>

        {/* Dialog para Confirmar Anulación */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          PaperProps={{
            sx: {
              width: '321px', // Ancho personalizado
              height: '240px', // Alto personalizado
              borderRadius: '28px', // Bordes redondeados
            },
          }}
        >
          <DialogTitle
            sx={{ color: '#1D1B20', fontFamily: 'Poppins', fontSize: '24px' }}
          >
            Anular turno
          </DialogTitle>
          <DialogContent sx={{ width: '250px' }}>
            <DialogContentText
              sx={{ color: '#49454F', fontFamily: 'Poppins', fontSize: '14px' }}
            >
              Estás a punto de anular el turno, una vez anulado no podrás recuperarlo. ¿Estás seguro que deseas anular el turno?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              sx={{
                color: '#666666',
                fontFamily: 'Poppins',
                fontSize: '14px',
                textTransform: 'none',
                marginBottom: '13px',
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCancelClick}
              sx={{
                color: '#EB2424',
                fontFamily: 'Poppins',
                fontSize: '14px',
                textTransform: 'none',
                marginBottom: '13px',
                marginRight: '30px',
              }}
            >
              Anular
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}
export default Detalle;


