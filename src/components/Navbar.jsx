import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSignInAlt, faUserPlus, faHome, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importar los íconos
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

const Navbar = () => {
  const { token, logout } = useContext(UserContext);
  const { getTotalPrice, clearCart } = useContext(CartContext);

  const handleLogout = () => {
    logout(); // Llamar al método logout del UserContext
    clearCart(); //Limpiar carrito
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        {/* Elementos alineados a la izquierda */}
        <div className="navbar-nav mr-auto">
          <Link className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faHome} /> Mamma Mía Pizzas
          </Link>

          <Link className="nav-link" to="/">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>

          {token ? (
            <>
              <Link className="nav-link" to="/profile">
                <FontAwesomeIcon icon={faUser} /> Profile
              </Link>
              <button className="btn btn-danger nav-link" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
              <Link className="nav-link" to="/register">
                <FontAwesomeIcon icon={faUserPlus} /> Register
              </Link>
            </>
          )}
        </div>

        {/* Elemento alineado a la derecha */}
        <div className="navbar-nav ml-auto">
          <Link className="nav-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} /> Carrito - Total: ${getTotalPrice()}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;