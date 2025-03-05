import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "https://nexon-hito-3.onrender.com/api/products";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError('Error al obtener los detalles del producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      {product ? (
        <>
          <h2>{product.title}</h2>
          <img src={product.image_url} alt={product.title} className="img-fluid mb-3" />
          <p>{product.description}</p>
          <p className="fw-bold">Precio: ${product.price}</p>
        </>
      ) : (
        <div>Producto no encontrado</div>
      )}
    </div>
  );
};

export default ProductDetail;