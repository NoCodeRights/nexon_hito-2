import { useContext } from 'react';
import { ApiContext } from '../Context/ApiContext';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
  const { addToCart, handlePurchase } = useContext(ApiContext);

  if (!product) {
    return <p>Producto no disponible</p>;
  }

  const { id, title, price, stock, image_url } = product;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        <Card.Text>Stock disponible: {stock > 0 ? stock : 'Agotado'}</Card.Text>

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
          onClick={() => handlePurchase(id)}
          disabled={stock <= 0}
        >
          Comprar ahora
        </Button>
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
  }).isRequired,
};

export default ProductCard;
