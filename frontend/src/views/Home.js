import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../index.css';
import ProductCard from '../components/Card'; // Asegúrate de que la ruta sea correcta
import { Link } from 'react-router-dom';
import CardTshirt from '../components/CardTshirt';

function Products() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Reemplaza 'http://localhost:8000/product?product_id=1' con la URL de tu API
    axios.get('http://127.0.0.1:8000/product?product_id=1')
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, []);

  return (
    <div className="background flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-black-500 mb-4">Morphic Threads</h1>
      {product ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link to={`/product/${product.id}`}>
            <ProductCard key={product.id} product={product} />,
            <CardTshirt key={product.id} product={product}  />
           
          </Link>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
}

export default Products;