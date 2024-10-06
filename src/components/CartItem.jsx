import { useContext } from 'react';

import { CartContext } from '../contexts/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {item.name} - ${item.price} x {item.quantity}
      <button className="btn btn-danger" onClick={() => removeFromCart(item.id)}>Eliminar</button>
    </li>
  );
};

export default CartItem;