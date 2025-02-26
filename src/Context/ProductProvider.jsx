import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { ProductContext } from "./ProductContext"; 
import PropTypes from "prop-types";

const API_URL = "http://localhost:5000/api/products";

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = useCallback(async () => {
    try {
      console.log("Fetching products..."); // Debugging
      const response = await axios.get(`${API_URL}?timestamp=${Date.now()}`, {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const providerValue = useMemo(() => ({ products, fetchProducts }), [products, fetchProducts]);

  return (
    <ProductContext.Provider value={providerValue}>
      {children}
    </ProductContext.Provider>
  );
};

ProductProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductProvider;
