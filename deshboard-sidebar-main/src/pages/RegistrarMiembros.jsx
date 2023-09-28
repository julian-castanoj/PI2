import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/registrarMiembros.css';
import { Link } from 'react-router-dom';

const RegistrarMiembros = () => {
    

    const redirectToUsuarios = () => {
        const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
        if (confirmCancel) {
          // Redirige a la página de usuarios ("/usuarios") utilizando Link
          return (
            <Link to="/">
              Redirigiendo...
            </Link>
          );
        }
      };

  const [formData, setFormData] = useState({
    razonSocial: '',
    nombre: '',
    formaParticipacion: '',
    materialesGestionar: 0,
    pesoReutilizable: 0,
    pesoNoReutilizable: 0,
    metaAprovechamiento: 0,
    metaQMA: 0,
    qmqm: 0,
    lineaBase: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar la lógica para enviar los datos del formulario
    // a tu servidor o realizar cualquier otra acción que desees.
    // Por ejemplo, puedes utilizar una función de envío de datos a través de API.
    console.log(formData);
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Miembros</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Forma de Participación</label>
          <input
            type="text"
            name="formaParticipacion"
            value={formData.formaParticipacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Materiales a Gestionar</label>
          <input
            type="number"
            name="materialesGestionar"
            value={formData.materialesGestionar}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso Reutilizable</label>
          <input
            type="number"
            name="pesoReutilizable"
            value={formData.pesoReutilizable}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso No Reutilizable</label>
          <input
            type="number"
            name="pesoNoReutilizable"
            value={formData.pesoNoReutilizable}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Meta de Aprovechamiento</label>
          <input
            type="number"
            name="metaAprovechamiento"
            value={formData.metaAprovechamiento}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Meta QMA</label>
          <input
            type="number"
            name="metaQMA"
            value={formData.metaQMA}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>QMQM</label>
          <input
            type="number"
            name="qmqm"
            value={formData.qmqm}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Línea Base</label>
          <input
            type="number"
            name="lineaBase"
            value={formData.lineaBase}
            onChange={handleChange}
          />
        </div>
          <div className="form-group">
            <button type="submit" className="submit-button">Registrar</button>
            <Link to="/usuarios" className="register-button">Cancelar</Link>
          </div>
      </form>
    </div>
  );
};



export default RegistrarMiembros;
