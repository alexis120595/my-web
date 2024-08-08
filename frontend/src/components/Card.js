import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image1 from '../assets/cover.jpg';


function ProductCard({ product }) {
  const navigate = useNavigate();
  

  const handleClick = () => {
    navigate(`/product/${product.id}`); // Redirige a la página del producto específico
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <Card sx={{ width: 300, height: 400, margin: 2 }}>
        <CardMedia
          component="img"
          sx={{ height: '85%' }}
          image={image1}
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