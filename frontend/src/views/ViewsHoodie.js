import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardHoodieBlack from '../components/CardHoodieBlack';
import CardHoodieWhite from '../components/CardHoodieWhite';

const Home = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/product?product_id=${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
            });
    }, [id]);

    return (
        <div>
            <h1>Producto con ID {id}</h1>
            {product ? (
                <>
                    <CardHoodieBlack product={product} />,
                    <CardHoodieWhite product={product} />,
                    <CardHoodieBlack product={product} />,
                    <CardHoodieWhite product={product} />
                 
                </>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default Home;