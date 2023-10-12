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
  
    // Mostrar una ventana emergente de confirmación al usuario
    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
  
    if (userConfirmed) {
      // Construir la solicitud POST
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
          console.error('Error al registrar');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      // El usuario canceló el envío del formulario
      console.log('Envío del formulario cancelado');
    }
  };
  

  const handleCancelar = () => {
    const confirmCancel = window.confirm("¿Seguro que quieres cancelar?");
    if (confirmCancel) {
      // Redirige a la página de gestores ("/gestores")
      window.location.href = "/gestores";
    }
  };

  const editarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/gestor/${id}`);
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
        const response = await fetch(`http://localhost:3000/gestor/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(registroActualizado),
        });
        if (response.ok) {
          // Actualizar el estado de los registros si es necesario
          const nuevosRegistros = [...registros];
          nuevosRegistros[indiceEdicion] = registroActualizado;
          setRegistros(nuevosRegistros);
  
          // Limpiar el formulario y el estado de edición
          setFormData({
            nombre: '',
            capacidad: 0,
            nit: 0,
            // ...
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
      const response = await fetch(`http://localhost:3000/gestor/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Actualizar el estado de los registros si es necesario
        const registrosActualizados = registros.filter((registro) => registro.id !== id);
        setRegistros(registrosActualizados);
  
        // Limpiar el formulario y el estado de edición si es necesario
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
