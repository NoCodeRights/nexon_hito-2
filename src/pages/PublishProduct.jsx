import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import api from "../api";
import { ProductContext } from "../Context/ProductContext";

const PublishProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("nuevo");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { fetchProducts } = useContext(ProductContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para publicar un producto.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("condition", condition);
    formData.append("stock", stock);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      console.log("Producto publicado:", response.data);
      alert("Producto publicado con éxito");
      // Actualiza la lista de productos
      fetchProducts();
      // Redirige a la página de productos
      navigate("/productos");
      // Limpia el formulario
      setTitle("");
      setDescription("");
      setPrice("");
      setCondition("nuevo");
      setStock("");
      setImage(null);
    } catch (err) {
      console.error("Error al publicar el producto:", err);
      setError("Hubo un error al publicar el producto. Inténtalo de nuevo.");
    }
  };

  return (
    <Container>
      <h2>Publicar Producto</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title" className="mb-3">
          <Form.Label>Título</Form.Label>
          <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="condition" className="mb-3">
          <Form.Label>Estado del Producto</Form.Label>
          <Form.Control as="select" value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="stock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
        </Form.Group>
        <Form.Group controlId="image" className="mb-3">
          <Form.Label>Imagen</Form.Label>
          <Form.Control type="file" onChange={(e) => setImage(e.target.files[0])} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          Publicar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default PublishProduct;
