import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../Context/ApiContext';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '../api'; // Importamos API para peticiones al backend
import UserContext from '../Context/UserContext';

const ProductCard = ({ product }) => {
  const { addToCart, fetchProducts } = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!product) {
    return <p>Producto no disponible</p>;
  }

  const { id, title, price, stock, image_url, user_id } = product;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const isOwner = user && user.id === user_id; // Si el usuario autenticado es el dueño

  // Reducir stock del producto
  const reduceStock = async () => {
    if (stock > 0) {
      try {
        await api.put(`/products/${id}/reduce-stock`);
        fetchProducts();
      } catch (error) {
        console.error("Error reduciendo stock:", error);
      }
    }
  };

  // Aumentar stock del producto
  const increaseStock = async () => {
    try {
      await api.put(`/products/${id}/increase-stock`);
      fetchProducts();
    } catch (error) {
      console.error("Error aumentando stock:", error);
    }
  };

  // Eliminar producto
  const deleteProduct = async () => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // Comprar producto (lo agrega al carrito y redirige)
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/carrito');
  };

  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img
        variant="top"
        src={image_url ? `${backendUrl}${image_url}` : '/fallback-image.jpg'}
        alt={title}
        onError={(e) => {
          console.error("Error cargando la imagen:", e.target.src);
          e.target.src = '/fallback-image.jpg';
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Precio: ${Number(price)}</Card.Text>
        <Card.Text>Stock disponible: {stock > 0 ? stock : 'Sin stock'}</Card.Text>

        {/* Si el usuario es el dueño, mostrar botones de gestión */}
        {isOwner ? (
          <>
            <Button
              variant="warning"
              className="mt-2"
              onClick={reduceStock}
              disabled={stock <= 0}
            >
              Reducir stock
            </Button>
            <Button
              variant="info"
              className="mt-2"
              onClick={increaseStock}
            >
              Aumentar stock
            </Button>
            <Button
              variant="danger"
              className="mt-2"
              onClick={deleteProduct}
            >
              Eliminar producto
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="primary"
              onClick={() => addToCart(product)}
              disabled={stock <= 0}
            >
              {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </Button>
            <Button
              variant="success"
              className="mt-2"
              onClick={handleBuyNow}
              disabled={stock <= 0}
            >
              Comprar ahora
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    stock: PropTypes.number.isRequired,
    image_url: PropTypes.string,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
