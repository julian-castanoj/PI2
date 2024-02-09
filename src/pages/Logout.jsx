import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../styles/GESTOGESTORREGISTRO.css";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    onLogout();
    navigate('/inicio');
  };


  const [datePickerDateTimePickerValue, setDatePickerDateTimePickerValue] =
    useState(null);

  return (
    <div>
      <h1>Log out</h1>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};


export default Logout;

