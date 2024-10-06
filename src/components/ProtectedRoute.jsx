import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { token } = useContext(UserContext);

    return token ? element : <Navigate to="/login" />;
};


export default ProtectedRoute;