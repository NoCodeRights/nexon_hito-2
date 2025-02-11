import Carousel from 'react-bootstrap/Carousel';
import Mono from "../assets/imgs/mono.jpg";
import Remera from "../assets/imgs/remera.jpg";
import Remera1 from "../assets/imgs/remera1.jpg";
import Short from "../assets/imgs/short.jpg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from 'react';

const ProductCard = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    }, []);

    const toggleFavorite = (product) => {
        let updatedFavorites;

        if (favorites.some((fav) => fav.id === product.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
        } else {
            updatedFavorites = [...favorites, product];
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Guardar en localStorage
    };

    // Definir un producto de ejemplo
    const product = { id: 1, name: "Remera", image: Remera1 };
    

    return (
        <>
            
            <Card style={{ width: '18rem' }} className="ProductCards">
                <Card.Img variant="top" src={product.image} alt={`Foto producto ${product.name}`} />
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the cards content.
                    </Card.Text>
                    <Button variant="primary">Comprar</Button>
                    <Button variant="light" onClick={() => toggleFavorite(product)} style={{ marginLeft: "10px" }}>
                        {favorites.some((fav) => fav.id === product.id) ? (
                            <FaHeart color="red" />
                        ) : (
                            <FaRegHeart color="gray" />
                        )}
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default ProductCard;