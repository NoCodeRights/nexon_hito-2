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

  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img
        variant="top"
        src={image_url ? `http://localhost:5000${image_url}` : '/fallback-image.jpg'}
        alt={title}
        onError={(e) => {
          console.log("Error cargando la imagen:", image_url); // Debugging
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
          disabled={stock <= 0} // Asegúrate de que el botón esté deshabilitado si el stock es 0 o menor
        >
          {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
        </Button>

        <Button
          variant="success"
          className="mt-2"
          onClick={() => handlePurchase(id)}
          disabled={stock <= 0} // Asegúrate de que el botón esté deshabilitado si el stock es 0 o menor
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

