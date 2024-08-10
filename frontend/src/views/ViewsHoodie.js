import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CardHoodieBlack1 from '../components/detail/hoodie black/CardHoodieBlack1';
import CardHoodieBlack2 from '../components/detail/hoodie black/CardHoodieBlack2';
import CardHoodieBlack3 from '../components/detail/hoodie black/CardHoodieBlack3';
import CardHoodieBlack4 from '../components/detail/hoodie black/CardHoodieBlack4';
import '../index.css';


const ViewsHoodie = () => {
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
        <div className="background flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-white text-3xl">Producto con ID {id}</h1>
            {product ? (
                <>
                    <CardHoodieBlack1 product={product} />,
                    <CardHoodieBlack2 product={product} />,
                    <CardHoodieBlack3 product={product} />,
                    <CardHoodieBlack4 product={product} />
                 
                </>
            ) : (
                <p>Cargando producto...</p>
            )}
        </div>
    );
};

export default ViewsHoodie;