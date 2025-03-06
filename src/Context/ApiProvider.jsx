import { useState, useEffect, useMemo, useCallback } from "react";
import { ApiContext } from "./ApiContext";
import PropTypes from "prop-types";
import api from "../api"; // 🔹 Importamos axios configurado

const ApiProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");
      console.log("Respuesta de la API:", response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = useCallback((product) => {
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

  const handlePurchase = useCallback(async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }, []);

  const value = useMemo(() => ({ products, cart, addToCart, handlePurchase }), [products, cart, addToCart, handlePurchase]);

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ApiProvider;
