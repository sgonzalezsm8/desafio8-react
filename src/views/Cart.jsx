import { useContext, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import CartItem from '../components/CartItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { UserContext } from '../contexts/UserContext';

const Cart = () => {
  const { cart, getTotalPrice, clearCart, checkout } = useContext(CartContext);
  const { token } = useContext(UserContext); // Obtener el token del contexto de usuario
  const [paymentSuccess, setPaymentSuccess] = useState(false); // Estado para manejar el pago
  const [error, setError] = useState(null); // Estado para manejar errores

  const handlePayment = async () => {
    if (!token) return; // No proceder si no hay token

    try {
      await checkout(token); // Enviar carrito al backend para el checkout
      setPaymentSuccess(true); // Simula el pago exitoso
      clearCart(); // Limpia el carrito después de "pagar"
    } catch (error) {
      setError('Hubo un error al procesar tu pago. Por favor, inténtalo de nuevo.'); // Manejar errores
    }
  };

  return (
    <div className="container">
      <h2 className="my-4">Tu Carrito</h2>

      {/* Mostrar mensaje de éxito si el pago fue realizado */}
      {paymentSuccess ? (
        <div className="alert alert-success" role="alert">
          ¡Pago realizado con éxito! Gracias por tu compra.
        </div>
      ) : (
        <>
          {cart.length > 0 ? (
            <>
              <ul className="list-group mb-4">
                {cart.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
              <h3>Total: ${getTotalPrice()}</h3>

              {/* Botón Pagar con desactivación condicional */}
              <button
                className="btn btn-primary btn-lg mt-3"
                onClick={handlePayment}
                disabled={!token} // Deshabilitar si el token es false
              >
                <FontAwesomeIcon icon={faCreditCard} /> Pagar
              </button>

              {/* Mostrar alerta si no hay token */}
              {!token && (
                <div className="alert alert-warning mt-3" role="alert">
                  Debes estar logueado para poder realizar el pago.
                </div>
              )}

              {/* Mostrar mensaje de error en caso de fallo en el pago */}
              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </>
          ) : (
            // Mensaje de carrito vacío con estilo de alerta
            <div className="alert alert-info" role="alert">
              Tu carrito está vacío.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
