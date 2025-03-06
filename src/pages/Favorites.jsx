import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { FaHeart } from "react-icons/fa";
import { Button } from "react-bootstrap";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(fav => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container">
      <h2>Mis Favoritos</h2>
      <div className="row">
        {favorites.length > 0 ? (
          favorites.map(product => (
            <div key={product.id} className="col-md-4">
              <ProductCard product={product} />
              <Button 
                variant="danger" 
                onClick={() => removeFavorite(product.id)}
                className="mt-2"
              >
                <FaHeart color="white" /> Quitar
              </Button>
            </div>
          ))
        ) : (
          <p>No tienes productos en favoritos.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
