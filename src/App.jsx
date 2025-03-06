import "./App.css";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import PublishProduct from "./pages/PublishProduct";
import Cart from "./pages/Cart";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import UserProvider from "./Context/UserProvider";
import ApiProvider from "./Context/ApiProvider";
import ProductProvider from "./Context/ProductProvider";
import Favoritos from "./pages/Favorites";
import MyProducts from "./pages/MyProducts";
//import History from "./pages/History";

function App() {
  return (
    <UserProvider>
      <ApiProvider>
        <ProductProvider>
          <Nav />
          <main className="container my-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/productos" element={<ProductList />} />
              <Route path="/productos/:id" element={<ProductDetail />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/favoritos" element={<Favoritos />} />
              <Route path="/publish" element={<ProtectedRoute><PublishProduct /></ProtectedRoute>} />
              <Route path="/perfil" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/mis-productos" element={<ProtectedRoute><MyProducts /></ProtectedRoute>} />
              {/* <Route path="/historial" element={<ProtectedRoute><History /></ProtectedRoute>} /> */}
              <Route path="/politica" element={<PoliticaPrivacidad />} />
            </Routes>
          </main>
          <Footer />
        </ProductProvider>
      </ApiProvider>
    </UserProvider>
  );
}

export default App;
