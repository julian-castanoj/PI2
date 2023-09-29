import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/registrarMiembros.css';

const RegistrarMiembros = () => {
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
      setEditandoId(null);
    }
  };

  const eliminarRegistro = (id) => {
    const registrosActualizados = registros.filter((registro) => registro.id !== id);
    setRegistros(registrosActualizados);
    if (editandoId === id) {
      setFormData({
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
      setEditandoId(null);
    }
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
          <button type="submit" className="submit-button">
            Registrar
          </button>
          {editandoId ? (
            <button onClick={guardarEdicion} className="edit-button">
              Guardar Edición
            </button>
          ) : null}
          <Link to="/usuarios" className="register-button">
            Cancelar
          </Link>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <span>{registro.nombre}</span>
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

export default RegistrarMiembros;

