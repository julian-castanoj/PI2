import React, { useState } from 'react';
import '../styles/registrarMiembros.css';
import axios from 'axios';

const RegistrarTransformadores = () => {
  const [formData, setFormData] = useState({
    razonSocial: '',
    representanteLegal: ''
  });

  const handleGuardar = async () => {
    // Aquí puedes enviar los datos a tu servidor mediante una solicitud POST usando Axios.
    try {
      const response = await axios.post('/guardar-transformador', formData);
      // Maneja la respuesta del servidor aquí, por ejemplo, muestra un mensaje de éxito.
      console.log('Transformador registrado:', response.data);
    } catch (error) {
      // Maneja los errores, por ejemplo, muestra un mensaje de error.
      console.error('Error al registrar el transformador:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="registrar-transformadores-page">
      <h2>Formulario de Registro de Transformadores</h2>
      <form onSubmit={handleGuardar}>
        <div className="form-group">
          <label>Razón Social</label>
          <input
            type="text"
            name="razonSocial"
            value={formData.razonSocial}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Representante Legal</label>
          <input
            type="text"
            name="representanteLegal"
            value={formData.representanteLegal}
            onChange={handleChange}
          />
        </div>
        {/* ... Añade el resto de los campos aquí */}
        <div className="form-group">
          <button type="submit" className="submit-button">Registrar</button>
        </div>
      </form>
      {/* Aquí puedes mostrar los registros existentes */}
    </div>
  );
};

export default RegistrarTransformadores;
