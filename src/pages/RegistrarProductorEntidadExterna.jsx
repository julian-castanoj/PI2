import React, { useState, useEffect } from 'react';
import '../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarProductorEntidadExterna = () => {
  const [formData, setFormData] = useState({
    idProductor: 0, 
    nombreEntidad: '', 
    fecha: '',
    observaciones: '',
    imagen: null,
    nro_expediente_anla: 0,
    nro_factura_dian: 0,
  });

  const [productorIds, setProductorIds] = useState([]); 
  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    
    fetch('http://localhost:3000/productor')
      .then((response) => response.json())
      .then((data) => setProductorIds(data.map((productor) => productor.id)))
      .catch((error) => console.error('Error al obtener la lista de productores:', error));
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
    navigate('/productorEntidadExterna');
    e.preventDefault();

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      const form = new FormData();
      for (const key in formData) {
        if (key === 'imagen') {
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
        const response = await fetch('http://localhost:3000/productorEntidadExterna/registrar', requestOptions);

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
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/productorEntidadExterna');
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
    navigate('/productorEntidadExterna');
    try {
      const response = await fetch(`http://localhost:3000/productorEntidadExterna/${id}`);
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
    navigate('/productorEntidadExterna');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };
  
    try {
      const response = await fetch(`http://localhost:3000/productorEntidadExterna/${editandoId}`, requestOptions);
  
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
      const response = await fetch(`http://localhost:3000/productorEntidadExterna/${id}`, {
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
    navigate('/productorEntidadExterna');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Productor - Entidad Externa</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID del Productor</label>
          <select name="idProductor" value={formData.idProductor} onChange={handleChange}>
            <option value={0}>Selecciona un productor</option>
            {productorIds.map((productorId) => (
              <option key={productorId} value={productorId}>
                {productorId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Nombre de la Entidad Externa</label>
          <input
            type="text"
            name="nombreEntidad"
            value={formData.nombreEntidad}
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
          <label>Observaciones</label>
          <input
            type="text"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Imagen</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nro Expediente ANLA</label>
          <input
            type="number"
            name="nro_expediente_anla"
            value={formData.nro_expediente_anla}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Nro Factura DIAN</label>
          <input
            type="number"
            name="nro_factura_dian"
            value={formData.nro_factura_dian}
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
            <span>{registro.idProductor}, {registro.nombreEntidad}</span>
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

export default RegistrarProductorEntidadExterna;
