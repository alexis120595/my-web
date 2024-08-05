import React from 'react';

import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import defaultImage from '../assets/cover.jpg'; // Importa la imagen desde la carpeta assets




function CardHoodieBlack({ product }) {

    

    return (
        <div>
        <Card sx={{ width: 300, height: 400, margin: 2 }}>
            <CardMedia
            component="img"
            sx={{ height: '85%' }} // Ajusta la altura de la imagen
            image={product.imageUrl || defaultImage}
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


export default CardHoodieBlack;