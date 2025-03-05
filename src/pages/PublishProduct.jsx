import { useState, useContext } from "react";
import axios from "axios";
import { ProductContext } from "../Context/ProductContext";

const API_URL = import.meta.env.VITE_API_URL + "/products";

const PublishProduct = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [condition, setCondition] = useState("nuevo");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null); // Cambiamos a una sola imagen
  const { fetchProducts } = useContext(ProductContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para publicar un producto.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("price", price);
    data.append("condition", condition);
    data.append("stock", stock);
    data.append("image", image); // Asegúrate de que el campo se llame "image"

    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      console.log("Producto publicado:", response.data);
      alert("Producto publicado con éxito");

      // Llama a fetchProducts para actualizar la lista de productos
      fetchProducts();

      // Limpia el formulario después de publicar
      setTitle("");
      setDescription("");
      setPrice("");
      setCondition("nuevo");
      setStock("");
      setImage(null);
    } catch (error) {
      console.error("Error al publicar el producto:", error);
      alert("Hubo un error al publicar el producto. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="container">
      <h2>Publicar Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="condition" className="form-label">
            Estado del Producto
          </label>
          <select
            className="form-select"
            id="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            required
          >
            <option value="nuevo">Nuevo</option>
            <option value="usado">Usado</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            className="form-control"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])} // Asegúrate de usar "image" como nombre del campo
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Publicar Producto
        </button>
      </form>
    </div>
  );
};

export default PublishProduct;
