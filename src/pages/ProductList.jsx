import { useContext, useEffect } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductCard from "../components/ProductCard";
import Carrousel from '../components/Carrousel';

const ProductList = () => {
  const { products, fetchProducts } = useContext(ProductContext);

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products.length]);

  return (
    <div className="container">
      <Carrousel/>
      <h2>Lista de Productos</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
