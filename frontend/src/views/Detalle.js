import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CircularProgress, Box, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const Detalle = () => {
  const [reservas, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { Id } = useParams();

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
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
      <Card sx={{ minWidth: 300, borderRadius: '20px', boxShadow: 3, backgroundColor: '#f0f0f0' }}>
        <CardContent>
          <Typography variant="h5" component="div">
            Mi reserva
          </Typography>
          {reservas ? (
            <>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Servicio:</strong> {reservas.servicio_id}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Barbero:</strong> {reservas.barbero_id}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Fecha:</strong> {reservas.fecha}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>Hora:</strong> {reservas.horario_id}
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
        onClick={() => navigate('/home/${Id}')}
        sx={{ borderRadius: '20px', margin: '10px' }}
      >
        Volver
      </Button>
      </Card>
     
    </Box>
  );
};

export default Detalle;


