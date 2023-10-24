import React, { useState } from 'react';
import '../styles/registrarProductor.css';
import { Link } from 'react-router-dom';

const RegistrarProductores = () => {
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    forma_participacion: '',
    materiales_gestiona: {
      papel: false,
      carton: false,
      vidrio: false,
      plasticoRigido: false,
      plasticoFlexible: false,
    },
    peso_total_reutilizable: 0,
    peso_total_no_reutilizable: 0,
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Manejar campos de entrada normales
    if (type === 'text' || type === 'number') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    // Manejar el checkbox de materiales
    else if (type === 'checkbox') {
      setFormData({
        ...formData,
        materiales_gestiona: {
          ...formData.materiales_gestiona,
          [name]: checked,
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm('¿Estás seguro de que deseas enviar el formulario?');

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
    const confirmCancel = window.confirm('¿Seguro que quieres cancelar?');
    if (confirmCancel) {
      // Redirige a la página de productores ("/productores")
      window.location.href = '/productores';
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
            correo: '',
            nombre: '',
            nit: 0,
            telefono: 0,
            direccion: '',
            forma_participacion: '',
            materiales_gestiona: {
              papel: false,
              carton: false,
              vidrio: false,
              plasticoRigido: false,
              plasticoFlexible: false,
            },
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
            correo: '',
            nombre: '',
            nit: 0,
            telefono: 0,
            direccion: '',
            forma_participacion: '',
            materiales_gestiona: {
              papel: false,
              carton: false,
              vidrio: false,
              plasticoRigido: false,
              plasticoFlexible: false,
            },
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
      <h2>Formulario de Registro de productores</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo</label>
          <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>NIT</label>
          <input type="number" name="nit" value={formData.nit} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Forma de Participación</label>
          <input type="text" name="forma_participacion" value={formData.forma_participacion} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Materiales que Gestiona</label>
          <div className="checkbox-group">
            <label>
              Papel
              <input
                type="checkbox"
                name="papel"
                checked={formData.materiales_gestiona.papel}
                onChange={handleChange}
              />
              {formData.materiales_gestiona.papel && (
                <input
                  type="number"
                  name="papelValue"
                  value={formData.materiales_gestiona.papelValue}
                  onChange={handleChange}
                />
              )}
            </label>
            <label>
              Cartón
              <input
                type="checkbox"
                name="carton"
                checked={formData.materiales_gestiona.carton}
                onChange={handleChange}
              />
              {formData.materiales_gestiona.carton && (
                <input
                  type="number"
                  name="cartonValue"
                  value={formData.materiales_gestiona.cartonValue}
                  onChange={handleChange}
                />
              )}
            </label>
            <label>
              Vidrio
              <input
                type="checkbox"
                name="vidrio"
                checked={formData.materiales_gestiona.vidrio}
                onChange={handleChange}
              />
              {formData.materiales_gestiona.vidrio && (
                <input
                  type="number"
                  name="vidrioValue"
                  value={formData.materiales_gestiona.vidrioValue}
                  onChange={handleChange}
                />
              )}
            </label>
            <label>
              Plástico Rígido
              <input
                type="checkbox"
                name="plasticoRigido"
                checked={formData.materiales_gestiona.plasticoRigido}
                onChange={handleChange}
              />
              {formData.materiales_gestiona.plasticoRigido && (
                <input
                  type="number"
                  name="plasticoRigidoValue"
                  value={formData.materiales_gestiona.plasticoRigidoValue}
                  onChange={handleChange}
                />
              )}
            </label>
            <label>
              Plástico Flexible
              <input
                type="checkbox"
                name="plasticoFlexible"
                checked={formData.materiales_gestiona.plasticoFlexible}
                onChange={handleChange}
              />
              {formData.materiales_gestiona.plasticoFlexible && (
                <input
                  type="number"
                  name="plasticoFlexibleValue"
                  value={formData.materiales_gestiona.plasticoFlexibleValue}
                  onChange={handleChange}
                />
              )}
            </label>
          </div>
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

export default RegistrarProductores;
