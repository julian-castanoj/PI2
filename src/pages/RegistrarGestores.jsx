import React, { useState } from 'react';
import '../styles/registrarMiembros.css';
import { Link } from 'react-router-dom';

const RegistrarGestores = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: 0,
    nit: 0,
    telefono: 0,
    direccion: '',
    estado: true,
    categoria_municipio: '',
    municipio: '',
    correo: '',
    toneladas_recolectadas: '',
    puntos_recoleccion: '',
    mecanismos_recoleccion: '',
    materiales_recolectados: ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Construye la solicitud POST
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    };

    try {
      console.log(formData);
      const response = await fetch('http://localhost:3000/gestor/registrar', requestOptions);
      
      if (response.ok) {
        
        console.log('Registro exitoso');
      } else {
        // La solicitud falló
        console.error('Error al registrar');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de gestores ("/gestores")
      window.location.href = "/gestores";
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
        nombre: '',
    capacidad: 0,
    nit: 0,
    telefono: 0,
    direccion: '',
    estado: true,
    categoria_municipio: '',
    municipio: '',
    correo: '',
    toneladas_recolectadas: '',
    puntos_recoleccion: '',
    mecanismos_recoleccion: '',
    materiales_recolectados: ''
      });
      setEditandoId(null);
    }
  };

  const eliminarRegistro = (id) => {
    const registrosActualizados = registros.filter((registro) => registro.id !== id);
    setRegistros(registrosActualizados);
    if (editandoId === id) {
      setFormData({
        nombre: '',
    capacidad: 0,
    nit: 0,
    telefono: 0,
    direccion: '',
    estado: true,
    categoria_municipio: '',
    municipio: '',
    correo: '',
    toneladas_recolectadas: '',
    puntos_recoleccion: '',
    mecanismos_recoleccion: '',
    materiales_recolectados: ''
      });
      setEditandoId(null);
    }
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
            name="categoria_municipio"
            value={formData.categoria_municipio}
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
            name="toneladas_recolectadas"
            value={formData.toneladas_recolectadas}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Puntos de Recolección</label>
          <input
            type="text"
            name="puntos_recoleccion"
            value={formData.puntos_recoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mecanismos de Recolección</label>
          <input
            type="text"
            name="mecanismos_recoleccion"
            value={formData.mecanismos_recoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Materiales Recolectados</label>
          <input
            type="text"
            name="materiales_recolectados"
            value={formData.materiales_recolectados}
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

export default RegistrarGestores;
