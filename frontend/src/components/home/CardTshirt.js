import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import image2 from '../../assets/remera.jpg'; // Asegúrate de que la ruta sea correcta

function CardTshirt() {
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Reemplaza 'http://localhost:8000/product?product_id=3' con la URL de tu API
    axios.get('http://127.0.0.1:8000/product?product_id=3')
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, []);

  const handleClick = () => {
    if (product) {
      navigate(`/product/${product.id}`); // Redirige a la página del producto específico
    }
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      {product ? (
        <Card sx={{ width: 300, height: 400, margin: 2 }}>
          <CardMedia
            component="img"
            sx={{ height: '85%' }}
            image={image2} // Usar la imagen importada
            alt={product.name}
          />
          <CardContent>
            <Typography variant="h5" component="div">
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.description}
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
}

export default CardTshirt;