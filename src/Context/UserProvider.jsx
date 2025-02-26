import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }, []);

  const validateToken = useCallback(async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/validate', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setToken(token);
        setUser(data.user);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (error) {
      console.error('Error al validar el token:', error);
      logout();
    }
  }, [logout]);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      validateToken(storedToken);
    }
  }, [validateToken]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.token) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: data.error || 'Error en la autenticación.' };
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
      return { success: false, error: 'Error en la conexión con el servidor.' };
    }
  }, []);

  const contextValue = useMemo(() => ({
    token,
    user,
    isAuthenticated,
    login,
    logout,
  }), [token, user, isAuthenticated, login, logout]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;