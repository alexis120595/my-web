// # Vista que maneja el detalle de una reserva exitosa, obteniendo información de la reserva y permitiendo cancelarla.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button, Snackbar,Alert } from '@mui/material';
import { useNavigate, useParams} from 'react-router-dom';

const Detalle = () => {
    // # Obtiene el ID de la reserva desde los parámetros de ruta
  const { id } = useParams();
  // # Define estados para la reserva, el cargando, el error y el mensaje de éxito
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  
  // #  obtiene la información de la reserva al montar el componente
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

    // # Maneja la lógica para cancelar la reserva y muestra un mensaje de éxito al hacerlo
  const handleCancelClick = async () => {
    try {
      // Llamada a la API para eliminar la reserva
      await axios.delete(`http://127.0.0.1:8000/reservas/${reservas.id}`);
      // Navegar a la página de inicio después de cancelar la reserva
      setSuccessMessage('Reserva eliminada de forma exitosa');
      // Redirigir a la página de inicio después de 2 segundos
      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      console.error('Error al cancelar la reserva:', error);
      setError('Error al cancelar la reserva');
    }
  };

  // # Muestra un indicador de carga si los datos aún no se han obtenido
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

   // # Muestra un mensaje de error en caso de que ocurra un problema al obtener la reserva
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }
  // #  muestra los datos de la reserva y botones para volver y cancelar
  return (
    // # Sección principal de la vista que muestra la información de la reserva y permite cancelarla.
// # Incluye un Card con detalles de la reserva, dos botones (Volver y Cancelar)
// # y un Snackbar para mostrar mensajes de éxito.
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px', mt:10}}>
      <Card sx={{ minWidth: 300, borderRadius: '20px', boxShadow: 3, backgroundColor: '#f0f0f0' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Mi reserva
          </Typography>
            {/* # Verifica si la información de la reserva existe */}
          {reservas ? (
            <>
              {/* # Muestra detalles específicos como Empresa, Dirección, Servicio, etc. */}
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
             // # Muestra un mensaje si no hay información de la reserva
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              No se encontró la reserva.
            </Typography>
          )}
        </CardContent>
            {/* # Botón que redirige al usuario al home */}
        <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/home')}
        sx={{ borderRadius: '20px', margin: '10px', backgroundColor: 'yellow',
          color: 'black', }}
      >
        Volver
      </Button>
       {/* # Botón para cancelar la reserva (usa handleCancelClick) */}
      <Button
                variant="contained"
                color="secondary"
                onClick={handleCancelClick}
                sx={{ borderRadius: '20px', margin: '10px', backgroundColor: 'yellow',
                  color: 'black', }}
              >
                Cancelar
              </Button>
      </Card>
      {/* # Snackbar que muestra un mensaje de éxito al cancelar la reserva */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={2000}
        onClose={() => setSuccessMessage('')}
      >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>
      
    </Box>
  );
};

export default Detalle;