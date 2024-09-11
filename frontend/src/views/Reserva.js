import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const Reserva = ({ }) => {
  const navigate = useNavigate();

  const handleNavigateToDetalle = () => {
    navigate(`/detalle`); // Navega a la vista de detalle con el ID de la reserva
  };

  return (
    <div>
      <h1>Reserva</h1>
      <Button type="button" variant="contained" color="secondary" onClick={handleNavigateToDetalle}>
        Ver Detalle de la Reserva
      </Button>
    </div>
  );
};

export default Reserva;