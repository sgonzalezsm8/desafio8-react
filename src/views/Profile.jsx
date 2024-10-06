import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
  const { getProfile, profile, token } = useContext(UserContext);
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      // Obtener el perfil del usuario autenticado cuando el componente se monta
      getProfile().catch((err) => setError(err.message));
    }
  }, [token, getProfile]);

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Perfil de Usuario</h2>

      {/* Mostrar mensaje de error si hay algún problema al obtener el perfil */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {/* Mostrar la información del perfil si está disponible */}
      {profile ? (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <FontAwesomeIcon icon={faUser} /> {profile.name || 'Usuario'}
            </h5>
            <p className="card-text">Email: {profile.email}</p>
          </div>
        </div>
      ) : (
        <p className="text-muted">Cargando perfil...</p>
      )}
    </div>
  );
};

export default Profile;