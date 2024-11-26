import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert, Dialog,  DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';

const DetalleReservaEmpresa = () => {
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const {id}= useParams();
  

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

  const handleConfirmAnular = async () => {
    try {
      // Llamada a la API para eliminar la reserva
      await axios.delete(`http://127.0.0.1:8000/reservas/${reservas.id}`);
      // Navegar a la página de inicio después de cancelar la reserva
      setSuccessMessage('Reserva eliminada de forma exitosa');
      // Redirigir a la página de inicio después de 2 segundos
      setOpenDialog(false);
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      setError('Error al cancelar la reserva');
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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', mt:10}}>
      <Card sx={{ minWidth: 300, borderRadius: '20px', boxShadow: 3, backgroundColor: 'grey' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ color: 'white' }}>
            Turno Reservado
          </Typography>
          {reservas ? (
            <>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Empresa:</strong> {reservas.empresa}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Dirección:</strong> {reservas.ubicacion}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Servicio:</strong> {reservas.servicio}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Precio:</strong> ${reservas.precio}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Barbero:</strong> {reservas.barbero}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Fecha:</strong> {reservas.fecha}
              </Typography>
              <Typography sx={{ mb: 1.5, color: 'white' }}>
                <strong>Hora:</strong> {reservas.horario}
              </Typography>
            </>
          ) : (
            <Typography sx={{ mb: 1.5, color: 'white' }}>
              No se encontró la reserva.
            </Typography>
          )}
        </CardContent>
        <Button
  variant="contained"
  color="primary"
  onClick={() => navigate('/home')}
  sx={{
    borderRadius: '20px',
    margin: '10px',
    backgroundColor: 'lightgrey',
    color: 'black',
    '&:hover': {
      backgroundColor: 'grey', // Cambia el fondo a gris al hacer hover
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
    borderRadius: '20px',
    margin: '10px',
    backgroundColor: 'red',
    color: 'black',
    '&:hover': {
      backgroundColor: 'gray', // Cambia el fondo a gris al hacer hover
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        
      >
        <DialogTitle>Anular turno</DialogTitle>
        <DialogContent sx={{width:'250px'}}>
          <DialogContentText>
        Estás a punto de anular el turno, una vez anulado no podras recuperarlo. ¿Estás seguro que deseas anular el turno?.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} 
           sx={{
           
            color: 'black', // Texto blanco
           
          }}
          >
            Cancelar
          </Button>
          <Button onClick={handleConfirmAnular} 
           sx={{
           
            color: 'red', // Texto blanco
           
          }}
          >
            Anular
          </Button>
        </DialogActions>
      </Dialog>
     
    </Box>
  );
};

export default DetalleReservaEmpresa;