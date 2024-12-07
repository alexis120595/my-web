import React from 'react';
import { Card, CardContent, Typography, Box} from '@mui/material';

const BarberoCard = ({ barbero }) => {
  return (
    <Card
      sx={{
        border: '1px solid black', // Borde negro
        borderRadius: '15px', // Bordes redondeados
        margin: '5px', // Margen entre opciones
        padding: '10px', // Ajusta el padding
        width: '165px', // Ancho fijo
        height: '188px', // Altura fija
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
          sx={{
            width: '127px', // Ancho del contenedor
            height: '99px', // Alto del contenedor
            display: 'flex', // Flexbox para centrar el contenido
            flexDirection: 'column', // Colocar los elementos en columna
            justifyContent: 'center', // Centrar verticalmente
            alignItems: 'center', // Centrar horizontalmente
          }}
        >

      <Box
          component="img"
          sx={{
            height: 68,
            width: 68,
            borderRadius: '50%', // Hacer la imagen redonda
           
            
          }}
          alt={`${barbero.nombre} ${barbero.apellido}`}
          src={barbero.imagen_url} // URL de la imagen del barbero
        />
        <Typography variant="h6"
         sx={{
          width: '127px',
          height: '25px',
          fontFamily: 'Poppins',
          fontSize: '12px',
          textAlign: 'center',
          color: '#666666',
        }}
        >{barbero.nombre} {barbero.apellido} </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarberoCard;