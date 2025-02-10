// Esta página es usada como ejemplo con simulaciones de llamadas a la API. Quizás se borre en el futuro.
import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Simulación de llamada a la API
  useEffect(() => {
    const sampleProducts = [
      { id: 1, title: 'Producto 1', description: 'Descripción del producto 1', price: 100, image_url: 'https://via.placeholder.com/300' },
      { id: 2, title: 'Producto 2', description: 'Descripción del producto 2', price: 200, image_url: 'https://via.placeholder.com/300' },
      { id: 3, title: 'Producto 3', description: 'Descripción del producto 3', price: 300, image_url: 'https://via.placeholder.com/300' }
    ];
    setProducts(sampleProducts);
  }, []);

  return (
    <div className="container">
      <h2>Listado de Productos</h2>
      <div className="row">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;