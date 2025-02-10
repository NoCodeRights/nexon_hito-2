import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loggedUser = localStorage.getItem("user");
        if (!loggedUser) {
            navigate("/login"); // Redirige si no hay sesión activa
        } else {
            setUser(JSON.parse(loggedUser)); // Guarda los datos del usuario
        }
    }, [navigate]);

    return (
        <div className="container mt-5">
            <h2>Perfil</h2>
            {user ? (
                <div>
                    <p><strong>Nombre:</strong> {user.name}</p>
                    <p><strong>Correo:</strong> {user.email}</p>
                    {/* Aquí se puede agregar más info del usuario */}
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
}

export default Profile;