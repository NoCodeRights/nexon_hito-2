import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../Context/ApiContext';
import { Card, Button, Form } from 'react-bootstrap';
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
  const [editMode, setEditMode] = useState(false);
  // Estados para edición (solo para el dueño)
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedStock, setEditedStock] = useState(product.stock);
  const [editedImage, setEditedImage] = useState(null);
  const [expanded, setExpanded] = useState(false);

  if (!product) {
    return <p>Producto no disponible</p>;
  }

  const { id, title, price, stock, image_url, user_id, description } = product;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  if (!backendUrl) {
    console.error("VITE_BACKEND_URL no está definido en las variables de entorno");
  }

  const token = localStorage.getItem("token");
  const isOwner = user && user.id === user_id;

  // Cargar favoritos usando una clave específica si el usuario está autenticado
  useEffect(() => {
    const favKey = user ? `favorites_${user.id}` : "favorites";
    const storedFavorites = JSON.parse(localStorage.getItem(favKey)) || [];
    setIsFavorite(storedFavorites.some(fav => fav.id === id));
  }, [id, user]);

  // Toggle para favoritos
  const toggleFavorite = () => {
    const favKey = user ? `favorites_${user.id}` : "favorites";
    let storedFavorites = JSON.parse(localStorage.getItem(favKey)) || [];
    if (isFavorite) {
      storedFavorites = storedFavorites.filter(fav => fav.id !== id);
    } else {
      storedFavorites.push(product);
    }
    localStorage.setItem(favKey, JSON.stringify(storedFavorites));
    setIsFavorite(!isFavorite);
  };

  // Función para actualizar stock (reduce o aumenta) – acción protegida
  const updateStock = async (action) => {
    try {
      await api.put(
        `/products/${id}/${action}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts();
    } catch (error) {
      console.error(`Error ${action === "reduce-stock" ? "reduciendo" : "aumentando"} stock:`, error);
    }
  };

  // Función para actualizar producto (editar precio, stock y/o imagen)
  const updateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("price", editedPrice);
      formData.append("stock", editedStock);
      if (editedImage) {
        formData.append("image", editedImage);
      }
      
      const response = await api.put(`/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Producto actualizado:", response.data);
      setEditMode(false);
      fetchProducts();
    } catch (error) {
      console.error("Error actualizando producto:", error);
    }
  };

  // Función para eliminar producto (acción protegida)
  const deleteProduct = async () => {
    console.log("Se ha presionado el botón eliminar para el producto", id);
    try {
      await api.delete(`/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchProducts();
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };

  // Función para comprar: agregar al carrito y redirigir
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
        {/* Botón para mostrar/ocultar la descripción */}
        {expanded && <Card.Text>{description}</Card.Text>}
        <Button variant="link" onClick={() => setExpanded(!expanded)}>
          {expanded ? "Ver menos" : "Ver más"}
        </Button>
        
        {editMode && isOwner ? (
          <>
            <Form.Group className="mb-2">
              <Form.Label>Precio</Form.Label>
              <Form.Control 
                type="number" 
                value={editedPrice} 
                onChange={(e) => setEditedPrice(e.target.value)} 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control 
                type="number" 
                value={editedStock} 
                onChange={(e) => setEditedStock(e.target.value)} 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Imagen</Form.Label>
              <Form.Control 
                type="file" 
                onChange={(e) => setEditedImage(e.target.files[0])} 
              />
            </Form.Group>
            <Button variant="primary" onClick={updateProduct}>
              Guardar cambios
            </Button>
            <Button variant="secondary" onClick={() => setEditMode(false)} className="ms-2">
              Cancelar
            </Button>
          </>
        ) : isOwner ? (
          <>
            <Card.Text>Precio: ${Number(price)}</Card.Text>
            <Card.Text>Stock disponible: {stock > 0 ? stock : 'Sin stock'}</Card.Text>
            <Button variant="warning" className="mt-2" onClick={() => updateStock("reduce-stock")} disabled={stock <= 0}>
              Reducir stock
            </Button>
            <Button variant="info" className="mt-2" onClick={() => updateStock("increase-stock")}>
              Aumentar stock
            </Button>
            <Button variant="danger" className="mt-2" onClick={deleteProduct}>
              Eliminar producto
            </Button>
            <Button variant="outline-primary" className="mt-2" onClick={() => setEditMode(true)}>
              Editar producto
            </Button>
          </>
        ) : (
          <>
            <Card.Text>Precio: ${Number(price)}</Card.Text>
            <Card.Text>Stock disponible: {stock > 0 ? stock : 'Sin stock'}</Card.Text>
            <Button variant="outline-danger" className="mb-2" onClick={toggleFavorite}>
              {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />} Favorito
            </Button>
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
    description: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
