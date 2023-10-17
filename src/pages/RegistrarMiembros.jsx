import React, { useState } from 'react';
import '../styles/registrarMiembros.css';
import { Link } from 'react-router-dom';

const RegistrarMiembros = () => {
  const [formData, setFormData] = useState({
    plancolectivo_id: 0,
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    forma_participacion: '',
    materiales_gestiona: '',
    peso_total_reutilizable: 0,
    peso_total_no_reutilizable: 0,
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

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      try {
        console.log(formData);
        const response = await fetch('http://localhost:3000/productor/registrar', requestOptions); 
        if (response.ok) {
          console.log('Registro exitoso');
        } else {
          console.error('Error al registrar');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };

  const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de miembros ("/miembros")
      window.location.href = "/usuarios";
    }
  };

  const editarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productor/${id}`); 
      if (response.ok) {
        const data = await response.json();
        setFormData({ ...data });
        setEditandoId(id);
      } else {
        console.error('Error al obtener detalles del registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const guardarEdicion = async () => {
    const indiceEdicion = registros.findIndex((registro) => registro.id === editandoId);
    if (indiceEdicion !== -1) {
      const registroActualizado = { ...formData, id: editandoId };
      try {
        const response = await fetch(`http://localhost:3000/productor/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registroActualizado),
        });
        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[indiceEdicion] = registroActualizado;
          setRegistros(nuevosRegistros);

          setFormData({
            plancolectivo_id: 0,
            correo: '',
            nombre: '',
            nit: 0,
            telefono: 0,
            direccion: '',
            forma_participacion: '',
            materiales_gestiona: '',
            peso_total_reutilizable: 0,
            peso_total_no_reutilizable: 0,
          });
          setEditandoId(null);

          console.log('Edición exitosa');
        } else {
          console.error('Error al editar el registro');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productor/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const registrosActualizados = registros.filter((registro) => registro.id !== id);
        setRegistros(registrosActualizados);

        if (editandoId === id) {
          setFormData({
            plancolectivo_id: 0,
            correo: '',
            nombre: '',
            nit: 0,
            telefono: 0,
            direccion: '',
            forma_participacion: '',
            materiales_gestiona: '',
            peso_total_reutilizable: 0,
            peso_total_no_reutilizable: 0,
          });
          setEditandoId(null);
        }

        console.log('Eliminación exitosa');
      } else {
        console.error('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Miembros</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Plan Colectivo ID</label>
          <input
            type="number"
            name="plancolectivo_id"
            value={formData.plancolectivo_id}
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
          <label>Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
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
          <label>Forma de Participación</label>
          <input
            type="text"
            name="forma_participacion"
            value={formData.forma_participacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Materiales que Gestiona</label>
          <input
            type="text"
            name="materiales_gestiona"
            value={formData.materiales_gestiona}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso Total Reutilizable</label>
          <input
            type="number"
            name="peso_total_reutilizable"
            value={formData.peso_total_reutilizable}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso Total No Reutilizable</label>
          <input
            type="number"
            name="peso_total_no_reutilizable"
            value={formData.peso_total_no_reutilizable}
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

export default RegistrarMiembros;
