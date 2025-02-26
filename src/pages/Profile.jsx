import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from '../Context/UserContext';

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="container mt-5">
      <h2>Perfil</h2>
      {user ? (
        <div>
          <p><strong>Nombre:</strong> {user.name}</p>
          <p><strong>Correo:</strong> {user.email}</p>
          <button onClick={handleLogout} className="btn btn-danger">
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Profile;