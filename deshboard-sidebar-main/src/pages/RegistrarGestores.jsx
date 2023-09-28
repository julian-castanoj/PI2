import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Importa useHistory correctamente
import '../styles/registrarMiembros.css';
import { Link } from 'react-router-dom';

const RegistrarGestores = () => {
    //const history = useHistory();

    const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de gestores utilizando window.location.href
      window.location.href = "/gestores";
    }
  };

  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: 0,
    nit: 0,
    telefono: 0,
    direccion: '',
    estado: true,
    categoriaMunicipio: '',
    municipio: '',
    correo: '',
    toneladasRecolectadas: '',
    puntosRecoleccion: 0,
    mecanismosRecoleccion: 0,
    materialesRecolectados: 0,
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
      <h2>Formulario de Registro de Gestores</h2>
      <form onSubmit={handleSubmit}>
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
          <label>Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>NIT</label>
          <input
            type="number"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Estado</label>
          <input
            type="checkbox"
            name="estado"
            checked={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label>Categoría Municipio</label>
          <input
            type="text"
            name="categoriaMunicipio"
            value={formData.categoriaMunicipio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Municipio</label>
          <input
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Toneladas Recolectadas</label>
          <input
            type="text"
            name="toneladasRecolectadas"
            value={formData.toneladasRecolectadas}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Puntos de Recolección</label>
          <input
            type="number"
            name="puntosRecoleccion"
            value={formData.puntosRecoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mecanismos de Recolección</label>
          <input
            type="number"
            name="mecanismosRecoleccion"
            value={formData.mecanismosRecoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Materiales Recolectados</label>
          <input
            type="number"
            name="materialesRecolectados"
            value={formData.materialesRecolectados}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Registrar</button>
          <Link to="/gestores" className="register-button">Cancelar</Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrarGestores;
