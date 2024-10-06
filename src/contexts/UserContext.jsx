import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const [profile, setProfile] = useState(null);  // Estado para almacenar el perfil

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setToken(response.data.token);
      setEmail(response.data.email);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el inicio de sesión');
    }
  };

  const register = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', { email, password });
      setToken(response.data.token);
      setEmail(response.data.email);
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Error en el registro');
    }
  };

  const logout = () => {
    setToken(null);
    setEmail(null);
    setProfile(null);  // Limpiar el perfil al cerrar sesión
  };

  const getProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(response.data);  // Almacenar el perfil en el estado
    } catch (error) {
      throw new Error('Error al obtener el perfil del usuario');
    }
  };

  return (
    <UserContext.Provider value={{ token, email, profile, login, register, logout, getProfile }}>
      {children}
    </UserContext.Provider>
  );
};
