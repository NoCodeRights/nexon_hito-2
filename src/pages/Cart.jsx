import { useContext } from 'react';
import { ApiContext } from '../Context/ApiContext';
import {  ListGroup } from 'react-bootstrap';

const Cart = () => {
  const { cart } = useContext(ApiContext);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ListGroup>
        {cart.map((item) => (
          <ListGroup.Item key={item.id}>
            <img src={item.image} alt={item.title} width="50" />
            {item.title} - Cantidad: {item.quantity} - Precio: ${item.price * item.quantity}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Cart;
