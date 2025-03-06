import { useContext } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { ApiContext } from "../Context/ApiContext";
import api from "../api";

const Cart = () => {
  const { cart, fetchProducts, setCart } = useContext(ApiContext);

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para proceder a la compra");
      return;
    }
    try {
      // Usamos Promise.all para ejecutar todas las solicitudes concurrentemente
      await Promise.all(
        cart.flatMap((item) =>
          // Para cada producto, se crean tantas promesas como cantidad tenga
          Array.from({ length: item.quantity || 1 }).map(() =>
            api.put(
              `/products/${item.id}/reduce-stock`,
              {},
              { headers: { Authorization: `Bearer ${token}` } }
            )
          )
        )
      );
      alert("Compra exitosa");
      setCart([]);       // Vaciar el carrito después de la compra
      fetchProducts();   // Actualizar la lista de productos (para ver el stock actualizado)
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Error al procesar la compra");
    }
  };

  // Función para eliminar un producto individual del carrito
  const removeItem = (id) => setCart(cart.filter((item) => item.id !== id));
  
  // Función para limpiar todo el carrito
  const clearCart = () => setCart([]);

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
                      : "/fallback-image.jpg"
                  }
                  alt={item.title}
                  width="50"
                />
                {item.title} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeItem(item.id)} 
                  className="ms-2"
                >
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
