import React from 'react';
import { Card, CardContent, Typography, CardMedia} from '@mui/material';
import exampleImage from '../assets/remera.jpg'; // Importa la imagen desde la carpeta assets
function ProductCard({ product }) {
  const defaultImageUrl = exampleImage; // Usa la imagen importada como URL de imagen predeterminada

  return (
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
        <Typography variant="body2" color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Stock: {product.stock}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ProductCard;