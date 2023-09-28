import React, { useState } from 'react';
import '../styles/registrarMiembros.css';

const RegistrarTransformadores = () => {
  const [formData, setFormData] = useState({
    razonSocial: '',
    representanteLegal: '',
    nit: 0,
    telefono: 0,
    direccionPrincipal: '',
    direccionPlanta: '',
    departamento: '',
    municipio: '',
    correo: '',
    materialQueProduce: '',
    periodo: 0,
    registroAnla: false,
    numeroDeCertificado: 0,
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

  const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de usuarios ("/usuarios") utilizando window.location.href
      window.location.href = "/transformadores";
    }
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transformadores</h2>
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
          <label>Representante Legal</label>
          <input
            type="text"
            name="representanteLegal"
            value={formData.representanteLegal}
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
          <label>Dirección Principal</label>
          <input
            type="text"
            name="direccionPrincipal"
            value={formData.direccionPrincipal}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dirección Planta</label>
          <input
            type="text"
            name="direccionPlanta"
            value={formData.direccionPlanta}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <input
            type="text"
            name="departamento"
            value={formData.departamento}
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
          <label>Material que Produce</label>
          <input
            type="text"
            name="materialQueProduce"
            value={formData.materialQueProduce}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Período</label>
          <input
            type="number"
            name="periodo"
            value={formData.periodo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Registro ANLA</label>
          <input
            type="checkbox"
            name="registroAnla"
            checked={formData.registroAnla}
            onChange={(e) => setFormData({ ...formData, registroAnla: e.target.checked })}
          />
        </div>
        <div className="form-group">
          <label>Número de Certificado</label>
          <input
            type="number"
            name="numeroDeCertificado"
            value={formData.numeroDeCertificado}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">Registrar</button>
          <button type="" className="register-button" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarTransformadores;
