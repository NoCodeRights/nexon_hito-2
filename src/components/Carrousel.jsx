import { Carousel } from "react-bootstrap";
import Mono from "../assets/imgs/mono.jpg";
import Remera from "../assets/imgs/remera.jpg";
import Remera1 from "../assets/imgs/remera1.jpg";

const Carrousel = () => {
    return (
        <div className="container mt-4">
            <Carousel fade>
                <Carousel.Item interval={1555} className="Carousel">
                    <img
                        className="d-block w-100 carousel-image"
                        src={Remera1}
                        alt="Imagen producto Short"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1555} className="Carousel">
                    <img
                        className="d-block w-100 carousel-image"
                        src={Remera}
                        alt="Imagen producto Remera"
                    />
                </Carousel.Item>
                <Carousel.Item interval={1555} className="Carousel">
                    <img
                        className="d-block w-100 carousel-image"
                        src={Mono}
                        alt="Imagen producto Mono"
                    />
                </Carousel.Item>
            </Carousel>
        </div>
    );
};

export default Carrousel;
