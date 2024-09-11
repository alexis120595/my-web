import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Detalle = () => {
    const [reservas, setReserva] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
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
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    return (
      <div>
        <h1>Última Reserva</h1>
        {reservas ? (
          <div>
            <p><strong>Servicio:</strong> {reservas.servicio_id}</p>
            <p><strong>Barbero:</strong> {reservas.barbero_id}</p>
            <p><strong>Fecha:</strong> {reservas.fecha}</p>
            <p><strong>Hora:</strong> {reservas.horario_id}</p>
           
          </div>
        ) : (
          <div>No se encontró la reserva.</div>
        )}
      </div>
    );
  };

export default Detalle;


