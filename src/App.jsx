import { useContext } from 'react';
import { PizzaProvider } from './contexts/PizzaContext';
import { CartProvider } from './contexts/CartContext';
import { UserProvider, UserContext } from './contexts/UserContext';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './views/Home';
import Cart from './views/Cart';
import Pizza from './views/Pizza';
import Profile from './views/Profile';
import Register from './views/Register';
import Login from './views/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <UserProvider>
      <PizzaProvider>
        <CartProvider>
          <Router>
            <Header />
            <Navbar />
            <main className="py-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/register" element={<UserRedirect element={<Register />} />} />
                <Route path="/login" element={<UserRedirect element={<Login />} />} />
                <Route path="/pizza/:id" element={<Pizza />} />
                <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </CartProvider>
      </PizzaProvider>
    </UserProvider>
  );
}

// Componente de redirección para usuarios autenticados
const UserRedirect = ({ element }) => {
  const { token } = useContext(UserContext);
  return token ? <Navigate to="/" /> : element;
};

export default App;
