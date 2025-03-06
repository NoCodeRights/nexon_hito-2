import { useContext } from "react";
import { Container, Button, ListGroup } from "react-bootstrap";
import { ApiContext } from "../Context/ApiContext";
import api from "../api";

const Cart = () => {
  const { cart, fetchProducts, setCart } = useContext(ApiContext);

  const handleCheckout = async () => {
    try {
      // Por cada producto en el carrito, reducimos el stock en 1 por unidad comprada.
      for (let item of cart) {
        for (let i = 0; i < item.quantity; i++) {
          await api.put(`/products/${item.id}/reduce-stock`);
        }
      }
      alert("Compra exitosa");
      // Vaciar el carrito después de la compra.
      setCart([]);
      // Actualizar la lista de productos para reflejar el stock actualizado.
      fetchProducts();
    } catch (error) {
      console.error("Error al procesar la compra:", error);
      alert("Error al procesar la compra");
    }
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
                  src={item.image_url ? `${import.meta.env.VITE_BACKEND_URL}${item.image_url}` : '/fallback-image.jpg'}
                  alt={item.title}
                  width="50"
                />
                {item.title} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="success" className="mt-3" onClick={handleCheckout}>
            Proceder a compra
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;
