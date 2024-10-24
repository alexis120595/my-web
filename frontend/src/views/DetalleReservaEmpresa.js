import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert, Dialog,  DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DetalleReservaEmpresa = () => {
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  

  useEffect(() => {
    const fetchUltimaReserva = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/reservas/ultima');
        setReserva(response.data);
      } catch (error) {
        setError('Error fetching ultima reserva');
      } finally {
        setLoading(false);
      }
    };

    fetchUltimaReserva();
  }, []);

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
      <Card sx={{ minWidth: 300, borderRadius: '20px', boxShadow: 3, backgroundColor: '#f0f0f0' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Mi reserva
          </Typography>
          {reservas ? (
            <>
             <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Empresa:</strong> {reservas.empresa}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Dirección:</strong> {reservas.ubicacion}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Servicio:</strong> {reservas.servicio}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Precio:</strong> ${reservas.precio}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Barbero:</strong> {reservas.barbero}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Fecha:</strong> {reservas.fecha}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Hora:</strong> {reservas.horario}
              </Typography>

             
            </>
          ) : (
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              No se encontró la reserva.
            </Typography>
          )}
        </CardContent>
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/home')}
        sx={{ borderRadius: '20px', margin: '10px', backgroundColor: 'yellow',
          color: 'black', }}
      >
        Editar 
      </Button>

      <Button
                variant="contained"
                color="secondary"
                onClick={handleAnularClick}
                sx={{ borderRadius: '20px', margin: '10px', backgroundColor: 'yellow',
                  color: 'black', }}
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
          <Button onClick={handleCloseDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmAnular} color="secondary" autoFocus>
            Anular
          </Button>
        </DialogActions>
      </Dialog>
     
    </Box>
  );
};

export default DetalleReservaEmpresa;