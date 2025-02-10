import React from 'react';
import { Link } from 'react-router-dom';

const Cart = () => {
  return (
    <div className="container my-4">
      <h2>Carrito de Compras</h2>
      <p>Tu carrito está vacío.</p>
      <Link to="/productos" className="btn btn-primary">Ver Productos</Link>
    </div>
  );
};

export default Cart;
