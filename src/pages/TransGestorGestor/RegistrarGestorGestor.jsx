import React, { useState, useEffect } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarGestorGestor = () => {
  const [formData, setFormData] = useState({
    gestorRealizaId: 0,
    gestorRecibeId: 0,
    materialId: 0,
    cantidad: 0,
    fecha: '',
    descripcion: '', // Agregada
    ubicacion: '', // Agregada
    imagen: null,
  });

  const [gestorIds, setGestorIds] = useState([]);
  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [errores, setErrores] = useState([]); // Estado para almacenar errores
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/gestor')
      .then((response) => response.json())
      .then((data) => {
        setGestorIds(data.map((gestor) => gestor.id));
      })
      .catch((error) => {
        console.error('Error al obtener la lista de gestores:', error);
        setErrores([...errores, 'Error al obtener la lista de gestores: ' + error.message]);
      });
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
        const response = await fetch('http://localhost:3000/transacciongg', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();
        } else {
          console.error('Error al registrar');
          setErrores([...errores, 'Error al registrar: Hubo un problema al registrar el formulario.']);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };*/

  const handleSubmit = async (e) => {
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
        const response = await fetch('http://localhost:3000/transacciongg', requestOptions);
  
        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();
        } else {
          console.error('Error al registrar');
          setErrores([...errores, 'Error al registrar: Hubo un problema al registrar el formulario.']);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };
  



  const fetchData = async () => {
    
    try {
      const response = await fetch('http://localhost:3000/transacciongg');
      if (response.ok) {
        const result = await response.json();
        setRegistros(result);
      } else {
        console.error('Error al cargar datos de la API');
        setErrores([...errores, 'Error al cargar datos de la API: No se pudieron cargar los registros.']);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const editarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000transacciongg/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({ ...data });
        setEditandoId(id);
      } else {
        console.error('Error al obtener detalles del registro');
        setErrores([...errores, 'Error al obtener detalles del registro: No se pudieron obtener los detalles.']);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000transacciongg/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Eliminación exitosa');
        fetchData();
      } else {
        console.error('Error al eliminar el registro');
        setErrores([...errores, 'Error al eliminar el registro: No se pudo eliminar el registro.']);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
    }
  };

  const handleCancelar = () => {
    navigate('/gestorGestor');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Gestor - Gestor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gestor Realiza</label>
          <select name="gestorRealizaId" value={formData.gestorRealizaId} onChange={handleChange}>
            <option value={0}>Selecciona un gestor</option>
            {gestorIds.map((gestorId) => (
              <option key={gestorId} value={gestorId}>
                {gestorId}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Gestor Recibe</label>
          <select name="gestorRecibeId" value={formData.gestorRecibeId} onChange={handleChange}>
            <option value={0}>Selecciona un gestor</option>
            {gestorIds
              .filter((gestorId) => gestorId !== formData.gestorRealizaId)
              .map((gestorId) => (
                <option key={gestorId} value={gestorId}>
                  {gestorId}
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
          <label>Imagen</label>
          <input
            type="file"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Registrar
          </button>
          
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
      {registros.map((registro) => (
          <li key={registro.id}>
            <span>{registro.gestorRealizaId}, {registro.cantidad}</span>
            <button onClick={() => editarRegistro(registro.id)} className="edit-button">
              Editar
            </button>
            <button onClick={() => eliminarRegistro(registro.id)} className="delete-button">
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      {errores.length > 0 && (
        <div className="errores">
          <h2>Errores:</h2>
          <ul>
            {errores.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RegistrarGestorGestor;

