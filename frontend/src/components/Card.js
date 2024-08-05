import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import exampleImage from '../assets/remera.jpg'; // Importa la imagen desde la carpeta assets

function ProductCard({ product }) {
  const navigate = useNavigate(); // Usa el hook useNavigate
  const defaultImageUrl = exampleImage; // Usa la imagen importada como URL de imagen predeterminada

  const handleClick = () => {
    navigate('/viewshoodie'); // Redirige a /viewshoodie al hacer clic
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card sx={{ width: 300, height: 400, margin: 2 }}>
        <CardMedia
          component="img"
          sx={{ height: '85%' }} // Ajusta la altura de la imagen
          image={product.imageUrl || defaultImageUrl}
          alt={product.name}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {product.name}
          </Typography> 
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductCard;