import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarGestorEntidadExterna = () => {
  const [formData, setFormData] = useState({
    gestorId:  '',
    material: '',
    cantidad: 0,
    fecha: '',
    archivoImagen: null,
    entidad_externa: '',
    descripcion: '',
    ubicacion: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [gestorIds, setGestorIds] = useState([]); // Agregado gestorIds
  const navigate = useNavigate();

  

  useEffect(() => {
    fetchData();
    // Agregar una solicitud para cargar los IDs de los gestores
    fetch('http://localhost:3000/gestor')
      .then((response) => response.json())
      .then((data) => setGestorIds(data.map((gestor) => gestor.id)))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
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
    //navigate('/gestorEntidadExterna');
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
        const response = await fetch('http://localhost:3000/transaccionge', requestOptions);
      
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

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/transaccionge');
      if (response.ok) {
        const result = await response.json();
        setRegistros(result);
      } else {
        console.error('Error al cargar datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }, []);
  

  const editarRegistro = (id) => {
    navigate('/gestorEntidadExterna');
    setEditandoId(id);
    // Aquí puedes cargar los datos del registro seleccionado para edición si es necesario.
  };

  const guardarEdicion = async () => {
    navigate('/gestorEntidadExterna');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`http://localhost:3000/http://localhost:3000/transaccionge/${editandoId}`, requestOptions);

      if (response.ok) {
        console.log('Edición exitosa');
        fetchData();
        setEditandoId(null);
      } else {
        console.error('Error al editar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/http://localhost:3000/transaccionge/${id}`, {
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
    navigate('/gestorEntidadExterna');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transacción - Entidad Externa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gestor ID</label>
          <select name="gestorId" value={formData.gestorId} onChange={handleChange}>
            <option value={0}>Selecciona un gestor</option>
            {gestorIds.map((gestorId) => (
              <option key={gestorId} value={gestorId}>
                {gestorId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Material</label>
          <input
            type="text"
            name="material"
            value={formData.material}
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
          <label>Archivo de Imagen</label>
          <input
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Entidad Externa</label>
          <input
            type="text"
            name="entidad_externa"
            value={formData.entidad_externa}
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
      {/* Lista de registros */}
      <h2>Registros</h2>
      <ul>
        {registros.map((registro) => (
          <li key={registro.id}>
            <span>{registro.material}, {registro.entidad_externa}</span>
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

export default RegistrarGestorEntidadExterna;

/* import React, { useState, useEffect } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarGestorEntidadExterna = () => {
  const [formData, setFormData] = useState({
    gestor_id: 0,
    material: '',
    cantidad: 0,
    fecha: '',
    archivoImagen: null,
    entidad_externa: '',
    descripcion: '',
    ubicacion: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [gestorIds, setGestorIds] = useState([]); // Agregado gestorIds
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    // Agregar una solicitud para cargar los IDs de los gestores
    fetch('http://localhost:3000/gestor') // Reemplaza 'gestores' con tu ruta correcta
      .then((response) => response.json())
      .then((data) => setGestorIds(data.map((gestor) => gestor.id)))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
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


  //imagen not null
  /*const handleSubmit = async (e) => {
    
    e.preventDefault();

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        if (key === 'archivoImagen') {
          form.append(key, formData[key], formData[key].name);
        } else {
          form.append(key, formData[key]);
        }
      }

      const requestOptions = {
        method: 'POST',
        body: form,
      };

      try {
        console.log(formData);
        const response = await fetch('http://localhost:3000/transaccionge', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();
        } else {
          console.error('Error al registrar');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };*/

  /*const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
  
    if (userConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        if (formData[key] !== null) {
          if (key === 'imagen') {
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
        const response = await fetch('http://localhost:3000/transaccionge', requestOptions);
  
        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();
        } else {
          console.error('Error al registrar');
          console.error('Error al registrar:', response.status, response.statusText);
          
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
      const response = await fetch('http://localhost:3000/transaccionge');
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

  const editarRegistro = (id) => {
    navigate('/gestorEntidadExterna');
    setEditandoId(id);
    // Aquí puedes cargar los datos del registro seleccionado para edición si es necesario.
  };

  const guardarEdicion = async (id) => {
    navigate('/gestorEntidadExterna');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`http://localhost:3000/transaccionge/${id}`, requestOptions);

      if (response.ok) {
        console.log('Edición exitosa');
        fetchData();
        setEditandoId(null);
      } else {
        console.error('Error al editar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transaccionge/${id}`, {
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
    navigate('/gestorEntidadExterna');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transacción - Entidad Externa</h2>
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
          <label>Material</label>
          <input
            type="text"
            name="material"
            value={formData.material}
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
          <label>Archivo de Imagen</label>
          <input
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Entidad Externa</label>
          <input
            type="text"
            name="entidad_externa"
            value={formData.entidad_externa}
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
            <span>{registro.material}, {registro.entidad_externa}</span>
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

export default RegistrarGestorEntidadExterna; */