
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/registrarTransacciones.css';
import { useNavigate } from 'react-router-dom';

const RegistrarGestorEntidadExterna = () => {
  const [formData, setFormData] = useState({
    gestorId: '',
    gestor_recibe: '',
    material: '',
    cantidad: '',
    fecha: '',
    archivoImagen: null,
    entidad_externa: '',
    descripcion: '',
    ubicacion: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);
  const [gestorNombres, setGestorNombres] = useState([]); // Agregar estado para nombres
  const [materiales, setMateriales] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();
  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);
  const [cantidades, setCantidades] = useState(Array.from({ length: materiales.length }, () => ''));

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

            // Actualizar el estado 'materiales'
            setMateriales(materialList);

            // Actualizar el estado 'material' con la cadena de materiales separados por ", "
            setFormData({
              ...formData,
              material: materialList.join(', '),
            });
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

      // Actualizar directamente el campo 'cantidad' en el estado formData
      const cantidadesString = updatedCantidades.join(', ');
      setFormData((prevFormData) => ({
        ...prevFormData,
        cantidad: cantidadesString,
      }));

      return updatedCantidades;
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
            // Actualizar el estado con el nombre del gestor seleccionado
            setFormData({
              ...formData,
              gestor_recibe: data.nombre,
            });
          })
          .catch((error) => console.error('Error al obtener los detalles del gestor:', error));
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
  
    if (userConfirmed) {
      const form = new FormData();
  
      // Agregar otras propiedades al formulario
      for (const key in formData) {
        if (formData[key] !== null) {
          if (key === 'archivoImagen') {
            form.append(key, formData[key], formData[key].name);
          } else if (key === 'cantidad') {
            // Agregar cantidades al formulario como string
            form.append('cantidad', formData[key]);
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
  
          // Restablecer el estado del formulario
          setFormData({
            gestorId: '',
            gestor_recibe: '',
            material: '',
            cantidad: '',
            fecha: '',
            archivoImagen: null,
            entidad_externa: '',
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
          <label>ID - Nombre del gestor</label>
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
                {materiales.map((material, index) => (
                  <tr key={index}>
                    <td>{material}</td>
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
                {/* Utilizar la longitud de materiales para generar la misma cantidad de filas */}
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