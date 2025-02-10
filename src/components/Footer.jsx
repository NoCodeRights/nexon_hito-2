import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="Footer">
        <div className="Redes">
            <FontAwesomeIcon icon={ faFacebook } target="_blank" className="Icon"/>
            <FontAwesomeIcon icon={ faInstagram } target="_blank" className="Icon"/>
            <FontAwesomeIcon icon={ faWhatsapp } target="_blank" className="Icon"/>
        </div>
        <p>&copy; {new Date().getFullYear()} Nexon. Todos los derechos reservados.</p>
        <div className="LinksUtiles">
            <Link to="/">Home</Link>
            <Link to="/productos">Productos</Link>
            <Link to="/perfil">Perfil</Link>
            <Link to="/carrito">Carrito</Link>
            <Link to="/politica">Politica de privacidad</Link>
        </div>
        </div>
    )
}

export default Footer;