import React, { useState, useEffect } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarTransacciones = () => {
  const [formData, setFormData] = useState({
    gestor_id: 0,
    transformador_id: 0,
    materialId: 0,
    cantidad: 0, // Campo "cantidad" agregado
    fecha: '',
    descripcion: '',
    ubicacion: '',
    archivoImagen: null
  });

  const [gestorIds, setGestorIds] = useState([]);
  const [transformadorIds, setTransformadorIds] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/gestor')
      .then((response) => response.json())
      .then((data) => setGestorIds(data.map((gestor) => gestor.id)))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));

    fetch('http://localhost:3000/transformador')
      .then((response) => response.json())
      .then((data) => setTransformadorIds(data.map((transformador) => transformador.id)))
      .catch((error) => console.error('Error al obtener la lista de transformadores:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      const form = new FormData();

      for (const key in formData) {
        if (formData[key] !== null) { // Verificar si formData[key] no es null
          if (key === 'archivoImagen') {
            form.append(key, formData[key], formData[key].name);
          } else {
            form.append(key, formData[key]);
          }
        }
      }

      const requestOptions = {
        method: 'POST',
        body: form,
      };

      try {
        const response = await fetch('http://localhost:3000/transacciongt', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();
        } else {
          // Aquí accede a los detalles del error proporcionados por el servidor
          const errorData = await response.json();
          console.error('Error al registrar:', response.status, errorData.message);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transacciongt');
      if (response.ok) {
        const result = await response.json();
        setRegistros(result);
      } else {
        console.error('Error al cargar datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transacciongt/${id}`);
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
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`http://localhost:3000/transacciongt/${editandoId}`, requestOptions);

      if (response.ok) {
        console.log('Edición exitosa');
        fetchData();
      } else {
        console.error('Error al editar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transacciongt/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Eliminación exitosa');
        fetchData();
      } else {
        console.error('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/transacciones');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transacciones</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gestor ID</label>
          <select name="gestor_id" value={formData.gestor_id} onChange={handleChange}>
            <option value={0}>Selecciona un gestor</option>
            {gestorIds.map((gestorId) => (
              <option key={gestorId} value={gestorId}>
                {gestorId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Transformador ID</label>
          <select name="transformador_id" value={formData.transformador_id} onChange={handleChange}>
            <option value={0}>Selecciona un transformador</option>
            {transformadorIds.map((transformadorId) => (
              <option key={transformadorId} value={transformadorId}>
                {transformadorId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Material ID</label>
          <input
            type="number"
            name="materialId"
            value={formData.materialId}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Ubicación</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Archivo de Imagen</label>
          <input
            type="file"
            name="archivoImagen"
            accept="image/*"
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
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <span>{registro.transformador.nombre}</span>
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

export default RegistrarTransacciones;
