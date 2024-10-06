import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link} from 'react-router-dom';

const Pizza = () => {
    const {id} = useParams(); // Obtiene el ID de la pizza desde la URL
    const [pizza, setPizza] = useState(null);

    useEffect(() => {
     //Funcion para obtener la informacion de la pizza
     const fetchPizza = async () => {
        try{
            const response = await axios.get(`http://localhost:5000/api/pizzas/${id}`);
            setPizza(response.data);
        }catch(error){
            console.error('Error al obtener la pizza', error);
        }
     };   

     fetchPizza();
    }, [id]);

    if(!pizza){
        return <p>Cargando pizza...</p>;
    }

    return (
        <div className="container mt-4">
            <h1>{pizza.name}</h1>
            <img src={pizza.img} alt={pizza.name} className="img-fluid rounded shadow-lg mb-4" 
        style={{ maxWidth: '500px' }}  />
            <p>{pizza.desc}</p>
            <h3>Ingredientes:</h3>
            <ul>
                {pizza.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>
            <h4>Precio: ${pizza.price}</h4>
            <Link to="/" className="btn btn-secondary mt-3">
              Volver al Home
            </Link>
        </div>
    );
};

export default Pizza;
