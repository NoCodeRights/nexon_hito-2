import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ApiContext } from '../Context/ApiContext';
import UserContext from '../Context/UserContext';
function NavbarNav() {
  const [showDropdown, setShowDropdown] = useState(false);
  const { totalItems } = useContext(ApiContext);
  const { isAuthenticated, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="Navbar">
      <Container fluid className="NavbarContainer">
        <Navbar.Brand href="/" className="Brand">
          NEXON
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="border-white ms-auto"
        />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>

            <Nav.Item
              className="custom-dropdown"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <Nav.Link as={NavLink} to="#" className="nav-link">
                Mi cuenta
              </Nav.Link>

              <div className={`dropdown-menu ${showDropdown ? "show" : ""}`}>
                {isAuthenticated ? (
                  <>
                    <NavLink className="dropdown-item" to="/perfil">
                      Perfil
                    </NavLink>
                    <NavLink className="dropdown-item" to="/favoritos">
                      Favoritos
                    </NavLink>
                    <NavLink className="dropdown-item" to="/publish">
                      Publicar producto
                    </NavLink>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink className="dropdown-item" to="/login">
                      Iniciar Sesión
                    </NavLink>
                    <NavLink className="dropdown-item" to="/register">
                      Registrarse
                    </NavLink>
                  </>
                )}
              </div>
            </Nav.Item>

            <Nav.Link as={NavLink} to="/carrito" className="position-relative">
              Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarNav;