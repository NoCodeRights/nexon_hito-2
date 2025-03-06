import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../Context/ApiContext';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import api from '../api'; // Axios configurado
import UserContext from '../Context/UserContext';
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const ProductCard = ({ product }) => {
  const { addToCart, fetchProducts } = useContext(ApiContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!product) {
    return <p>Producto no disponible</p>;
  }

  const { id, title, price, stock, image_url, user_id } = product;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("token");
  const isOwner = user && user.id === user_id;

  // Verificar si el producto está en favoritos al cargar la página
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === id));
  }, [id]);

  // Agregar o quitar de favoritos
  const toggleFavorite = () => {
    let storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(fav => fav.id !== id);
    } else {
      storedFavorites.push(product);
    }

    localStorage.setItem("favorites", JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Reducir stock (requiere token)
  const reduceStock = async () => {
    if (stock > 0) {
      try {
        await api.put(
          `/products/${id}/reduce-stock`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchProducts();
      } catch (error) {
        console.error("Error reduciendo stock:", error);
      }
    }
  };

  // Aumentar stock (requiere token)
  const increaseStock = async () => {
    try {
      await api.put(
        `/products/${id}/increase-stock`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error aumentando stock:", error);
    }
  };

  // Eliminar producto (requiere token)
  const deleteProduct = async () => {
    try {
      await api.delete(
        `/products/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // Comprar producto: agregar al carrito y redirigir
  const handleBuyNow = () => {
    addToCart(product);
    navigate('/carrito');
  };

  return (
    <Card style={{ width: '18rem' }} className="mb-3">
      <Card.Img
        variant="top"
        src={image_url && !imgError ? `${backendUrl}${image_url}` : '/fallback-image.jpg'}
        alt={title}
        onError={(e) => {
          console.error("Error cargando la imagen:", e.target.src);
          setImgError(true);
        }}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>Precio: ${Number(price)}</Card.Text>
        <Card.Text>Stock disponible: {stock > 0 ? stock : 'Sin stock'}</Card.Text>

        {/* Botón de favoritos */}
        <Button 
          variant="outline-danger"
          className="mb-2"
          onClick={toggleFavorite}
        >
          {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />} Favorito
        </Button>

        {/* Si el usuario es el dueño, mostrar opciones de gestión */}
        {isOwner ? (
          <>
            <Button variant="warning" className="mt-2" onClick={reduceStock} disabled={stock <= 0}>
              Reducir stock
            </Button>
            <Button variant="info" className="mt-2" onClick={increaseStock}>
              Aumentar stock
            </Button>
            <Button variant="danger" className="mt-2" onClick={deleteProduct}>
              Eliminar producto
            </Button>
          </>
        ) : (
          <>
            <Button variant="primary" onClick={() => addToCart(product)} disabled={stock <= 0}>
              {stock > 0 ? 'Agregar al carrito' : 'Sin stock'}
            </Button>
            <Button variant="success" className="mt-2" onClick={handleBuyNow} disabled={stock <= 0}>
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
