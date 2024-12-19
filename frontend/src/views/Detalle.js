import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert, Dialog, DialogActions,DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';

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
        alignItems: 'center',
        
      }}
    >
      <Box
        sx={{
          width: '549px',
          height: '673px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#504D4D',
          borderRadius: '20px',
        }}
      >
        <Card sx={{ 
            width: { xs: '350px', sm: '403px' }, // Ancho completo en pantallas pequeñas, 403px en pantallas medianas y grandes
            height: { xs: 'auto', sm: '542px' },
          borderRadius: '15px', boxShadow: 3, backgroundColor: '#414141' }}>
          <CardContent>
            <Typography variant="h5" component="div"
            sx={{ color: 'white', fontFamily:'Poppins', fontSize:'24px', marginTop: '24px', marginBottom: '24px' }}
            >
              Mi turno reservado
            </Typography>
            {reservas ? (
  <>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Empresa:</strong> {reservas.empresa}
    </Typography>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Dirección:</strong> {reservas.ubicacion}
    </Typography>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Servicio:</strong> {reservas.servicio}
    </Typography>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Precio:</strong> ${reservas.precio}
    </Typography>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Barbero:</strong> {reservas.barbero}
    </Typography>
    <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Fecha:</strong> {reservas.fecha}
    </Typography>
    <Typography sx={{ marginBottom: '32px', color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
      <strong>Hora:</strong> {reservas.horario}
    </Typography>
  </>
) : (
  <Typography sx={{ mb: 1.5, color: 'white', fontFamily: 'Poppins', fontSize: '16px' }}>
    No se encontró la reserva.
  </Typography>
)}
          </CardContent>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/home')}
            sx={{
              fontFamily:'Poppins',
              fontSize:'14px',
              textTransform: 'none',
              width: { xs: '140px', sm: '168px' },
              height: '43px',
              borderRadius: '30px',
              margin: '10px',
              backgroundColor: '#414141',
              color: 'white',
              borderColor: 'white',
              border: '2px solid white', // Añadir borde blanco
              '&:hover': {
                backgroundColor: '#414141', // Cambiar el color de fondo al pasar el cursor
                borderColor: 'white', // Mantener el borde blanco al pasar el cursor
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
              width: { xs: '140px', sm: '168px' },
              height: '43px',
              borderRadius: '30px',
              margin: '10px',
              backgroundColor: '#FF8272',
              color: 'white',
              fontFamily:'Poppins',
              fontSize:'16px',
              textTransform: 'none',
             
              '&:hover': {
                backgroundColor: 'red', // Cambiar el color de fondo al pasar el cursor
                borderColor: 'white', // Mantener el borde blanco al pasar el cursor
              },
            }}
          >
            Anular
          </Button>
        </Card>
  
        <Snackbar
          open={!!successMessage}
          autoHideDuration={2000}
          onClose={() => setSuccessMessage('')}
        >
          <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
          </Alert>
        </Snackbar>
  
        <Dialog open={openDialog} onClose={handleCloseDialog}
        
        PaperProps={{
          sx: {
            width: '321px', // Ancho personalizado
            height: '240px', // Alto personalizado
            borderRadius: '28px', // Bordes redondeados
          },
        }}>
          <DialogTitle
          sx={{ color: '#1D1B20', fontFamily: 'Poppins', fontSize: '24px' }}
          >Anular turno</DialogTitle>
          <DialogContent sx={{ width: '250px' }}>
            <DialogContentText
            sx={{ color: '#49454F', fontFamily: 'Poppins', fontSize: '14px' }}
            >
              Estás a punto de anular el turno, una vez anulado no podrás recuperarlo. ¿Estás seguro que deseas anular el turno?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary"
             sx={{ color: '#666666', fontFamily: 'Poppins', fontSize: '14px',  textTransform: 'none', marginBottom:'13px' }}>
              Cancelar
            </Button>
            <Button onClick={handleCancelClick} 
             sx={{ color: '#EB2424', fontFamily: 'Poppins', fontSize: '14px',  textTransform: 'none', marginBottom: '13px', marginRight: '30px' }}
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


