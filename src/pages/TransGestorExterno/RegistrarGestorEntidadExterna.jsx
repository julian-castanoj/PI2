
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
  const [gestorIds, setGestorIds] = useState([]);
  const [gestorNombres, setGestorNombres] = useState([]); // Agregar estado para nombres
  const [materiales, setMateriales] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();
  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);

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

  useEffect(() => {
    fetchData();
    fetch('http://localhost:3000/gestor')
      .then((response) => response.json())
      .then((data) => setGestores(data))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
  }, []);

  useEffect(() => {
    if (formData.gestorId) {
      fetchMaterials(formData.gestorId);
      fetchPuntosRecoleccion(formData.gestorId);
    }
  }, [formData.gestorId]);

  const fetchMaterials = (gestorId) => {
    const parsedId = parseInt(gestorId);
    if (!isNaN(parsedId)) {
      fetch(`http://localhost:3000/gestor/${parsedId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.materiales_recolectados) {
            const materialList = data.materiales_recolectados.split(',').map(material => material.trim());
            setMateriales(materialList);
          }
        })
        .catch((error) => console.error('Error al obtener la lista de materiales:', error));
    } else {
      console.error('El ID seleccionado no es válido:', gestorId);
    }
  };
  
  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCantidadChange = (index, event) => {
    const newValue = event.target.value;
    const updatedMateriales = [...formData.materiales];
    updatedMateriales[index] = newValue;
    setFormData({
      ...formData,
      materiales: updatedMateriales,
    });
  };


  const handleGestorIdChange = (e) => {
    const selectedId = e.target.value;
    if (selectedId !== "0") {
      // Asegurarse de que selectedId sea un número válido
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        // Hacer la solicitud para obtener los detalles del gestor por su ID
        fetch(`http://localhost:3000/gestor/${parsedId}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // Agregar un log para verificar los datos
            
          })
          .catch((error) => console.error('Error al obtener los detalles del gestor:', error));
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
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

  const fetchPuntosRecoleccion = (gestorId) => {
    fetch(`http://localhost:3000/gestor/${gestorId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.puntos_recoleccion) {
          const puntosRecoleccionList = data.puntos_recoleccion.split(',').map(punto => punto.trim());
          setPuntosRecoleccion(puntosRecoleccionList);
        } else {
          console.log('No se encontraron datos de puntos de recolección en la respuesta:', data);
        }
      })
      .catch((error) => console.error('Error al obtener la lista de puntos de recolección:', error));
  };

  

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transacción - Entidad Externa</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Gestor ID</label>
          <select
            name="gestorId"
            value={formData.gestorId}
            onChange={handleChange}
          >
            <option value="">Selecciona un gestor</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {`${gestor.id} - ${gestor.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
  <label>Materiales Asociados</label>
  <table>
    <thead>
      <tr>
        <th>Material</th>
        <th>Cantidad</th> {/* Agrega la segunda columna para ingresar valores numéricos */}
      </tr>
    </thead>
    <tbody>
      {materiales.map((material, index) => (
        <tr key={index}>
          <td>{material}</td>
          <td>
            <input
              type="number"
              value={formData.cantidad} // Aquí debes vincular el valor a tu estado o variable
              onChange={(e) => handleCantidadChange(index, e)} // Define una función para manejar el cambio
            />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
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
          <select
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          >
            <option value="">Selecciona un punto de recolección</option>
            {puntosRecoleccion.map((punto, index) => (
              <option key={index} value={punto}>
                {punto}
              </option>
            ))}
          </select>
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

export default RegistrarGestorEntidadExterna;