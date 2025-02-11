import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import PublishProduct from './pages/PublishProduct';
import Cart from './pages/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import Carrousel from './components/Carrousel';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';

function App() {
  // Estado de autenticación simulado. 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {/* Pasa el estado de autenticación al Navbar */}
      <Header isAuthenticated={isAuthenticated} />
      <main className="container my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/carrito" element={<Cart />} />
          {/* Ruta protegida: solo accesible si el usuario está autenticado */}
          <Route 
            path="/publish" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <PublishProduct />
              </ProtectedRoute>
            }
          />
          {/* Ruta protegida para perfil */}
          <Route 
            path="/perfil" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/politica" element={<PoliticaPrivacidad />} />
          {/* Se puede agregar una ruta para "logout" que limpie la autenticación */}
          {/* <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated} />} /> */}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
