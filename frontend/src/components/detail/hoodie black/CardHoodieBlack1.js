import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import defaultImage1 from '../../../assets/buzo1.jpg'; // Importa la imagen desde la carpeta assets

function CardHoodieBlack1({ product }) {
    // Validación de las propiedades del producto
    const { imageUrl, name } = product;

    return (
        <div>
            <Card sx={{ width: 300, height: 400, margin: 2 }}>
                <CardMedia
                    component="img"
                    sx={{ height: '85%' }} // Ajusta la altura de la imagen
                    image={imageUrl || defaultImage1}
                    alt={name || 'Producto sin nombre'}
                />
                <CardContent>
                    <Typography variant="h5" component="div">
                        {name || 'Producto sin nombre'}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

// Definir PropTypes para el componente
CardHoodieBlack1.propTypes = {
    product: PropTypes.shape({
        imageUrl: PropTypes.string,
        name: PropTypes.string
    })
};

// Proveer valores por defecto para las propiedades
CardHoodieBlack1.defaultProps = {
    product: {
        imageUrl: defaultImage1,
        name: 'Producto sin nombre'
    }
};

export default CardHoodieBlack1;