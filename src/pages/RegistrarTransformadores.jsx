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

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoRegistro = { ...formData, id: Date.now() };
    setRegistros([...registros, nuevoRegistro]);
    setFormData({
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
  };

  const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de transformadores ("/transformadores")
      window.location.href = "/transformadores";
    }
  };

  const editarRegistro = (id) => {
    const registroEditado = registros.find((registro) => registro.id === id);
    if (registroEditado) {
      setFormData({ ...registroEditado });
      setEditandoId(id);
    }
  };

  const guardarEdicion = () => {
    const indiceEdicion = registros.findIndex((registro) => registro.id === editandoId);
    if (indiceEdicion !== -1) {
      registros[indiceEdicion] = { ...formData, id: editandoId };
      setRegistros([...registros]);
      setFormData({
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
      setEditandoId(null);
    }
  };

  const eliminarRegistro = (id) => {
    const registrosActualizados = registros.filter((registro) => registro.id !== id);
    setRegistros(registrosActualizados);
    if (editandoId === id) {
      setFormData({
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
      setEditandoId(null);
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
          {editandoId ? (
            <button onClick={guardarEdicion} className="edit-button">
              Guardar Edición
            </button>
          ) : null}
          <button type="button" className="register-button" onClick={handleCancelar}>Cancelar</button>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <span>{registro.razonSocial}</span>
            <button onClick={() => editarRegistro(registro.id)} className="edit-button">
              Editar
            </button>
            <button onClick={() => eliminarRegistro(registro.id)} className="delete-button">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegistrarTransformadores;

