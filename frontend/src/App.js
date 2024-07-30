import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';
import ProductCard from './components/Card'; // Asegúrate de que la ruta sea correcta
import SearchBar from './components/SearchBar'; // Importa el componente SearchBar

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Reemplaza 'http://localhost:8000/products' con la URL de tu API
    axios.get('http://127.0.0.1:8000/products')
      .then(response => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSearch = (query) => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <div className="background flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-black-500 mb-4">Morphic Threads</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>Cargando productos...</p>
      )}
    </div>
  );
}

export default Products;