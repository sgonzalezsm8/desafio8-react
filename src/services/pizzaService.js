

export const getPizzas = async () => {
    const response = await fetch('http://localhost:5000/api/pizzas');
    const data = await response.json();
    return data;
};