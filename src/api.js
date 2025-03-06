import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Permite enviar credenciales (cookies, tokens, etc.)
});

console.log("API baseURL:", import.meta.env.VITE_API_URL); // Para confirmar la URL en la consola

export default api;
