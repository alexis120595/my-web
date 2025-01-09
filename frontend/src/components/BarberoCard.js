// Archivo que muestra la tarjeta de un barbero en la pantalla de selección de barberos
import React from 'react';
import { Card, CardContent, Typography, Box} from '@mui/material';

const BarberoCard = ({ barbero }) => {
  return (
    
    <Card
      sx={{
        border: '1px solid black', 
        borderRadius: '15px', 
        margin: '5px', 
        padding: '10px', 
        width: '165px', 
        height: '188px', 
        display: 'flex', 
      
        justifyContent: 'center',
        alignItems: 'center', 
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.1)', 
        },
      }}
    >
      {/* Contenido de la tarjeta */}
      <CardContent>
      <Box
          sx={{
            width: '127px', 
            height: '99px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

      <Box
          component="img"
          sx={{
            height: 68,
            width: 68,
            borderRadius: '50%', 
           
            
          }} 
          alt={`${barbero.nombre} ${barbero.apellido}`}
          src={barbero.imagen_url} 
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

        >
          {barbero.nombre} {barbero.apellido} </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BarberoCard;