import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Reemplaza 'http://localhost:8000/products' con la URL de tu API
    axios.get('http://127.0.0.1:8000/products')
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.id}
            {product.name} -
             {product.price} -
              {product.stock}

            
             </li>
          ))}
        </ul>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}

export default Products;