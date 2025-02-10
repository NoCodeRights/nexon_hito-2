import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Comprobar si hay un usuario autenticado en el localStorage
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, []);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <Navbar expand="lg" className="Navbar">
      <Container fluid className="NavbarContainer">
        <Navbar.Brand as={NavLink} to="/" className="Brand">
          NEXON
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-white ms-auto"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/productos">Productos</Nav.Link>
            <Nav.Link as={NavLink} to="/carrito">Carrito</Nav.Link>

            {/* Enlace a "Publicar Producto" visible solo si el usuario está autenticado */}
            {isAuthenticated && (
              <Nav.Link as={NavLink} to="/publish">Publicar Producto</Nav.Link>
            )}

            <Nav.Item
              className="custom-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              {/* Si está autenticado, "Mi cuenta" lleva a un perfil; si no, a login */}
              <Nav.Link as={NavLink} to={isAuthenticated ? "/profile" : "/login"} className="nav-link">
                Mi cuenta
              </Nav.Link>

              <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                {!isAuthenticated ? (
                  <>
                    <NavLink className="dropdown-item" to="/login">Iniciar Sesión</NavLink>
                    <NavLink className="dropdown-item" to="/register">Registrarse</NavLink>
                  </>
                ) : (
                  <>
                    <NavLink className="dropdown-item" to="/profile">Perfil</NavLink>
                    <button className="dropdown-item" onClick={handleLogout} style={{ border: "none", background: "none", cursor: "pointer" }}>
                      Cerrar Sesión
                    </button>
                  </>
                )}
              </div>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;