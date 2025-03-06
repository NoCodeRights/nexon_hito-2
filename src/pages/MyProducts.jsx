import { useContext, useEffect, useState } from "react";
import { ApiContext } from "../Context/ApiContext";
import UserContext from "../Context/UserContext";
import { Container, Card, Button } from "react-bootstrap";
import api from "../api";

const MyProducts = () => {
  const { user } = useContext(UserContext);
  const [myProducts, setMyProducts] = useState([]);

  const fetchMyProducts = async () => {
    try {
      const response = await api.get("/products");
      const allProducts = response.data;
      const filtered = allProducts.filter(product => product.user_id === user.id);
      setMyProducts(filtered);
    } catch (error) {
      console.error("Error al obtener mis productos:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyProducts();
    }
  }, [user]);

  return (
    <Container>
      <h2>Mis Productos</h2>
      {myProducts.length === 0 ? (
        <p>No has subido ningún producto.</p>
      ) : (
        myProducts.map(product => (
          <Card key={product.id} className="mb-3">
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>Precio: ${Number(product.price)}</Card.Text>
              <Card.Text>Stock: {product.stock}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
};

export default MyProducts;
