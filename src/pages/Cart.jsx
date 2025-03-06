import { useContext } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { ApiContext } from "../Context/ApiContext";
import api from "../api";

const Cart = () => {
  const { cart, fetchProducts, setCart } = useContext(ApiContext);

  // Función para proceder a la compra, reduciendo el stock por cada unidad
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para proceder a la compra");
      return;
    }
    try {
      for (let item of cart) {
        const quantity = item.quantity || 1;
        for (let i = 0; i < quantity; i++) {
          await api.put(
            `/products/${item.id}/reduce-stock`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }
      }
      alert("Compra exitosa");
      // Vaciar el carrito después de la compra
      setCart([]);
      // Actualizar la lista de productos para reflejar el stock actualizado
      fetchProducts();
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Error al procesar la compra");
    }
  };

  // Función para eliminar un producto individual del carrito
  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  // Función para limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Container>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío</p>
      ) : (
        <>
          <ListGroup>
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <img
                  src={
                    item.image_url
                      ? `${import.meta.env.VITE_BACKEND_URL}${item.image_url}`
                      : '/fallback-image.jpg'
                  }
                  alt={item.title}
                  width="50"
                />
                {item.title} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}
                <Button variant="danger" size="sm" onClick={() => removeItem(item.id)} className="ms-2">
                  Eliminar
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="success" className="mt-3" onClick={handleCheckout}>
            Proceder a compra
          </Button>
          <Button variant="secondary" className="mt-3 ms-2" onClick={clearCart}>
            Limpiar Carrito
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
