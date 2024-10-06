import { createContext, useState, useEffect } from 'react';
import { getPizzas } from '../services/pizzaService'; 


export const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      const pizzaData = await getPizzas();
      setPizzas(pizzaData);
    };
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};