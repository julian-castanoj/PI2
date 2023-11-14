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

import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarGestorGestor = () => {
  const [formData, setFormData] = useState({
    gestorRealizaId: '',
    gestorRecibeId: '',
    materialId: '',
    cantidad: '',
    fecha: '',
    archivoImagen: null,
    descripcion: '',
    ubicacion: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);
  const [gestorNombres, setGestorNombres] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();
  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);
  const [cantidades, setCantidades] = useState(Array.from({ length: materiales.length }, () => ''));

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/transacciongg');
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
    if (formData.gestorRealizaId && formData.gestorRecibeId) {
      const commonMaterials = gestores
        .find((gestor) => gestor.id === formData.gestorRealizaId)?.materiales_recolectados
        .split(',')
        .map((material) => material.trim())
        .filter((material) =>
          gestores.find((gestor) => gestor.id === formData.gestorRecibeId)?.materiales_recolectados
            .split(',')
            .map((m) => m.trim())
            .includes(material)
        );

      setMateriales(commonMaterials);
      setCantidades(Array.from({ length: commonMaterials.length }, () => ''));
    }
  }, [formData.gestorRealizaId, formData.gestorRecibeId, gestores]);

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      materialId: selectedMaterial,
    }));
  
    setMateriales((prevMateriales) => [...prevMateriales, selectedMaterial]);
  };


  const fetchMaterials = (gestorId) => {
    const parsedId = parseInt(gestorId);
    if (!isNaN(parsedId)) {
      fetch(`http://localhost:3000/gestor/${parsedId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.materiales_recolectados) {
          const materialList = data.materiales_recolectados.split(',').map(materialId => materialId.trim());
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
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleCantidadChange = (index, event) => {
    const newValue = event.target.value;

    setCantidades((prevCantidades) => {
      const updatedCantidades = [...prevCantidades];
      updatedCantidades[index] = newValue;

      const cantidadesString = updatedCantidades.join(', ');
      setFormData((prevFormData) => ({
        ...prevFormData,
        cantidad: cantidadesString,
      }));

      return updatedCantidades;
    });
  };

  const handleGestorRealizaIdChange = async (e) => {
    const selectedId = e.target.value;
    if (selectedId !== "0") {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              gestorRealizaId: data.id,
            });
            fetchMaterials(parsedId);
          } else {
            console.error('Error al obtener los detalles del gestor realiza:', response.status);
          }
        } catch (error) {
          console.error('Error al obtener los detalles del gestor realiza:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };

  const handleGestorRecibeIdChange = async (e) => {
    const selectedId = e.target.value;
    if (selectedId !== "0") {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              gestorRecibeId: data.id,
            });
            fetchPuntosRecoleccion(parsedId);
          } else {
            console.error('Error al obtener los detalles del gestor recibe:', response.status);
          }
        } catch (error) {
          console.error('Error al obtener los detalles del gestor recibe:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(formData);
    
  
    if (window.confirm("¿Estás seguro de que deseas enviar el formulario?")) {
      const form = new FormData();
  
      for (const key in formData) {
        if (formData[key] !== null) {
          if (key === 'archivoImagen') {
            form.append(key, formData[key], formData[key].name);
          } else if (key === 'cantidad') {
            form.append('cantidad', formData[key]);
          } else if (key === 'materialId') {
            // No apendizamos materialId aquí
          } else {
            form.append(key, formData[key]);
          }
        }
      }
  
      // Convierte el array 'materiales' a una cadena y agrégalo al formulario
      const materialesString = materiales.join(', ');
      form.append('materialId', materialesString);
      console.log(materiales);
      console.log(materialesString)
  
      const requestOptions = {
        method: 'POST',
        body: form,
      };
  
      try {
        const response = await fetch('http://localhost:3000/transacciongg', requestOptions);
  
        if (response.ok) {
          console.log('Registro exitoso');
          
          fetchData();
  
          setFormData({
            gestorRealizaId: '',
            gestorRecibeId: '',
            materialesString: '',
            cantidad: '',
            fecha: '',
            archivoImagen: null,
            descripcion: '',
            ubicacion: '',
          });
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            setMessage(`Error al registrar: ${errorData.message}`);
          } else {
            setMessage('Error al registrar. Por favor, intenta de nuevo.');
          }
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setMessage('Error de red. Por favor, verifica tu conexión.');
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };
  
  
  
  





  const editarRegistro = (id) => {
    
    setEditandoId(id);
  };

  const guardarEdicion = async () => {
    navigate('/gestorGestor');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`http://localhost:3000/transacciongg/${editandoId}`, requestOptions);

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
      const response = await fetch(`http://localhost:3000/transacciongg/${id}`, {
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
    navigate('/gestorGestor');
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
      <h2>Formulario de Registro de Transacción - Gestor Gestor</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gestor Realiza</label>
          <select
            name="gestorRealizaId"
            value={formData.gestorRealizaId}
            onChange={handleGestorRealizaIdChange}
          >
            <option value="">Selecciona un gestor realiza</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {`${gestor.id} - ${gestor.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Gestor Recibe</label>
          <select
            name="gestorRecibeId"
            value={formData.gestorRecibeId}
            onChange={handleGestorRecibeIdChange}
          >
            <option value="">Selecciona un gestor recibe</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {`${gestor.id} - ${gestor.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div className="">
          <div className="">
            <label>Materiales Asociados</label>
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((materialId, index) => (
                  <tr key={index}>
                    <td>{materialId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <label>Cantidades</label>
            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: materiales.length }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="number"
                        value={cantidades[index]}
                        onChange={(e) => handleCantidadChange(index, e)}
                        placeholder="Ingrese un número"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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

        {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}

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
        {registros.slice(-5).map((registro) => (
          <li key={registro.id}>
            <span>{registro.materialId}</span>
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

export default RegistrarGestorGestor;

