import { createContext, useState } from 'react';
import axios from 'axios';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (pizza) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.id === pizza.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevCart, { ...pizza, quantity: 1 }];
        });
    };

    const removeFromCart = (pizzaId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== pizzaId));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const clearCart = () => {
        setCart([]); // Vacía el carrito
    };

    // Método para realizar el checkout y enviar el carrito al backend
    const checkout = async (token) => {
        try {
            const response = await axios.post('http://localhost:5000/api/checkouts', {
                cart: cart
            }, {
                headers: {
                    Authorization: `Bearer ${token}` // Envío del token en los headers
                }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error durante el checkout');
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalPrice, checkout }}>
            {children}
        </CartContext.Provider>
    );
};
