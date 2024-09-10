import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Reserva = () => {
  const location = useLocation();
  const [reserva, setReserva] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const reservaId = searchParams.get('reserva_id');

    // Fetch reserva details using reservaId
    axios.get(`http://127.0.0.1:8000/reservas/${reservaId}`)
      .then(response => {
        setReserva(response.data);
      })
      .catch(error => {
        console.error('Error fetching reserva details:', error);
      });
  }, [location.search]);

  if (!reserva) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Reserva Exitosa</h1>
      <p>Detalles de la Reserva:</p>
      <ul>
        <li>Servicio: {reserva.servicio}</li>
        <li>Barbero: {reserva.barbero}</li>
        <li>Fecha: {new Date(reserva.fecha).toLocaleDateString()}</li>
        <li>Hora: {reserva.hora}</li>
      </ul>
    </div>
  );
};

export default Reserva;