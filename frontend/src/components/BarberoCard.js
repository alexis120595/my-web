import React from 'react';
import { Card, CardContent, Typography, Box} from '@mui/material';

const BarberoCard = ({ barbero }) => {
  return (
    <Card
      sx={{
        border: '1px solid black', // Borde negro
        borderRadius: '10px', // Bordes redondeados
        margin: '5px', // Margen entre opciones
        padding: '10px', // Ajusta el padding
        width: '150px', // Ancho fijo
        height: '150px', // Altura fija
        display: 'flex', // Flexbox para centrar el contenido
      
        justifyContent: 'center', // Centrar horizontalmente
        alignItems: 'center', // Centrar verticalmente
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', // Fondo al pasar el mouse
        },
      }}
    >
      <CardContent>
      <Box
          component="img"
          sx={{
            height: 60,
            width: 60,
            borderRadius: '50%', // Hacer la imagen redonda
            mt: 1, // Margen inferior
            ml:4
          }}
          alt={`${barbero.nombre} ${barbero.apellido}`}
          src={barbero.imagen_url} // URL de la imagen del barbero
        />
        <Typography variant="h6">{barbero.nombre} {barbero.apellido} </Typography>
      </CardContent>
    </Card>
  );
};

export default BarberoCard;