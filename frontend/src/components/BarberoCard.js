import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const BarberoCard = ({ barbero }) => {
  return (
    <Card
      sx={{
        border: '1px solid black', // Borde negro
        borderRadius: '10px', // Bordes redondeados
        margin: '5px', // Margen entre opciones
        padding: '10px', // Ajusta el padding
        width: '200px', // Ancho fijo
        height: '100px', // Altura fija
        display: 'flex', // Flexbox para centrar el contenido
      
        justifyContent: 'center', // Centrar horizontalmente
        alignItems: 'center', // Centrar verticalmente
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo al pasar el mouse
        },
      }}
    >
      <CardContent>
        <Typography variant="h6">{barbero.nombre} {barbero.apellido}</Typography>
      </CardContent>
    </Card>
  );
};

export default BarberoCard;