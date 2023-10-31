import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar la sesión, como borrar el token de acceso del localStorage
    localStorage.removeItem('accessToken');

    // Realiza cualquier otra lógica de cierre de sesión que necesites

    // Llama a la función proporcionada en "onLogout" para marcar al usuario como no autenticado
    onLogout();

    // Redirige a la página de inicio después del logout
    navigate('/inicio');
  };

  return (
    <div>
      <h1>Log out</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Logout;

