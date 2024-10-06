import { useContext } from 'react';
import { PizzaContext } from '../contexts/PizzaContext';
import PizzaCard from '../components/PizzaCard';

const Home = () => {
  const { pizzas } = useContext(PizzaContext);

  return (
    <div className="container">
    <h1 className="my-4">Nuestras Pizzas Italianas</h1>
    <div className="row">
      {pizzas.length > 0 ? (
        pizzas.map((pizza) => (
          <div className="col-lg-4 col-md-6 mb-4" key={pizza.id}>
            <PizzaCard pizza={pizza} />
          </div>
        ))
      ) : (
        <p>No hay pizzas disponibles.</p>
      )}
    </div>
  </div>
);
};

export default Home;