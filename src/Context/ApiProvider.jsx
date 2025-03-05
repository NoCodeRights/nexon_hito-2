import { useState, useEffect, useMemo, useCallback } from "react";
import { ApiContext } from "./ApiContext";
import PropTypes from "prop-types";

const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/products`);
      const data = await response.json();

      console.log("Respuesta de la API:", data);

      if (!Array.isArray(data)) {
        throw new Error("La API no devolvió un array válido");
      }

      const productsWithStock = data.map((product) => ({
        ...product,
        stock: product.stock !== undefined ? product.stock : 1,
      }));

      setProducts(productsWithStock);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = useCallback((product) => {
    console.log(`Intentando agregar ${product.title}, Stock disponible: ${product.stock}`);

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        alert("Este producto ya está en el carrito.");
        return prevCart;
      } else if (product.stock > 0) {
        return [...prevCart, { ...product, quantity: 1 }];
      } else {
        alert("Este producto está agotado.");
        return prevCart;
      }
    });
  }, []);

  const handlePurchase = useCallback((productId) => {
    fetch(`${import.meta.env.VITE_API_URL}/products/${productId}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(`Producto ${productId} comprado y eliminado`);
        fetchProducts();
      })
      .catch((error) => console.error("Error al eliminar el producto:", error));
  }, []);

  const value = useMemo(() => ({ products, cart, addToCart, handlePurchase }), [products, cart, addToCart, handlePurchase]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
