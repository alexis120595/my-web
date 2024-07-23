

import React from 'react';
import { Card, CardContent, Typography, CardMedia  } from '@mui/material';

function ProductCard({ product }) {

    const defaultImageUrl = "https://via.placeholder.com/300x200"; // URL de imagen predeterminada
  return (
    <Card  sx={{ width: 300, height: 400, margin: 2 }}>
        <CardMedia
            component="img"
            height="200"
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