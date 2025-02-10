import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // Se espera que el objeto product tenga: id, title, description, price, image_url
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            className="card-img-top" 
            alt={product.title} 
            style={{ objectFit: "cover", height: "200px" }} 
          />
        ) : (
          <div className="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style={{ height: "200px" }}>
            Sin imagen
          </div>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{product.description.substring(0, 100)}...</p>
          <p className="card-text fw-bold">${product.price}</p>
          <Link to={`/products/${product.id}`} className="mt-auto btn btn-primary">Ver Detalle</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;