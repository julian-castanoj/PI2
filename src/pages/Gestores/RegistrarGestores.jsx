import React, { useState, useEffect } from 'react';
import '../../styles/registrarMiembros.css';


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
    materiales_recolectados: '',
  });

  const materiales = [
    'Papel',
    'Cartón',
    'Vidrio',
    'Plástico Rígido',
    'Plástico Flexible',
  ];

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/gestor');
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    const isEmailDuplicate = registros.some((registro) => registro.correo === formData.correo);
    const isNitDuplicate = registros.some((registro) => registro.nit === formData.nit);

    if (isEmailDuplicate || isNitDuplicate) {
      setMessage('Error: Correo o NIT ya existen en los registros.');
    } else {
      try {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        };

        const response = await fetch('http://localhost:3000/gestor/registrar', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          setMessage('Registro exitoso');
          fetchData();

          // Limpia el formulario después del registro exitoso
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
            materiales_recolectados: '',
          });
        } else {
          if (response.status === 400) {
            const errorData = await response.json();
            setMessage('Error: ' + errorData.message); // Muestra el mensaje del servidor
            console.error('Error al registrar:', errorData.message);

          } else if (response.status === 500) {
            setMessage('Error inesperado al registrar');
            console.error('Error inesperado al registrar');
          } else {
            setMessage('Error inesperado al registrar');
            console.error('Error inesperado al registrar');
          }
        }
      } catch (error) {
        setMessage('Error al realizar la solicitud: ' + error.message);
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };


  const handleCancelar = () => {
    const confirmCancel = window.confirm('¿Seguro que quieres cancelar?');
    if (confirmCancel) {
      window.location.href = '/gestores';
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
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formData, id: editandoId }),
    };

    try {
      setMessage(null); // Limpia mensajes previos
      const response = await fetch(`http://localhost:3000/gestor/${editandoId}`, requestOptions);

      if (response.ok) {
        const nuevosRegistros = [...registros];
        const indiceEdicion = nuevosRegistros.findIndex((registro) => registro.id === editandoId);

        if (indiceEdicion !== -1) {
          nuevosRegistros[indiceEdicion] = { ...formData, id: editandoId };
          setRegistros(nuevosRegistros);
        }

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
          
          puntos_recoleccion: '',
          mecanismos_recoleccion: '',
          materiales_recolectados: '',
        });
        setEditandoId(null);

        console.log('Edición exitosa');
        setMessage('Edición exitosa');
        fetchData();
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setMessage('Error al editar el registro: ' + errorData.message);
          console.error('Error al editar el registro:', errorData.message);
        } else if (response.status === 500) {
          setMessage('Error inesperado al editar el registro');
          console.error('Error inesperado al editar el registro');
        } else {
          setMessage('Error inesperado al editar el registro');
          console.error('Error inesperado al editar el registro');
        }
      }
    } catch (error) {
      setMessage('Error al realizar la solicitud: ' + error.message);
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/gestor/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const registrosActualizados = registros.filter((registro) => registro.id !== id);
        setRegistros(registrosActualizados);

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
            materiales_recolectados: '',
          });
          setEditandoId(null);
        }

        console.log('Eliminación exitosa');
        setMessage('Eliminación exitosa');
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          setMessage('Error al eliminar el registro: ' + errorData.errors);
          console.error('Error al eliminar el registro:', errorData.errors);
        } else if (response.status === 500) {
          setMessage('Error inesperado al eliminar el registro');
          console.error('Error inesperado al eliminar el registro');
        } else {
          setMessage('Error inesperado al eliminar el registro');
          console.error('Error inesperado al eliminar el registro');
        }
      }
    } catch (error) {
      setMessage('Error al realizar la solicitud: ' + error.message);
      console.error('Error al realizar la solicitud:', error);
    }
  };

  

  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;

    // Asegúrate de que formData.materiales_recolectados tenga un valor definido
    const currentMaterialProduce = formData.materiales_recolectados || '';
    let updatedMaterialesSeleccionados = currentMaterialProduce.split(',').map(material => material.trim());

    if (checked) {
      if (!updatedMaterialesSeleccionados.includes(name)) {
        updatedMaterialesSeleccionados.push(name.trim());
      }
    } else {
      const index = updatedMaterialesSeleccionados.indexOf(name);
      if (index !== -1) {
        updatedMaterialesSeleccionados.splice(index, 1);
      }
    }

    updatedMaterialesSeleccionados = updatedMaterialesSeleccionados.filter(material => material.length > 0);

    const materialesRecolectadosString = updatedMaterialesSeleccionados.join(', ');

    setFormData({
      ...formData,
      materiales_recolectados: materialesRecolectadosString,
    });
  };



  const handleAgregarPuntoRecoleccion = () => {
    setFormData((prevData) => ({
      ...prevData,
      puntos_recoleccion: prevData.puntos_recoleccion
        ? `${prevData.puntos_recoleccion}, ''`
        : "''", // Agrega un campo vacío
    }));
  };

  const handleEliminarPuntoRecoleccion = (index) => {
    const puntosRecoleccionArray = formData.puntos_recoleccion.split(', ');
    if (puntosRecoleccionArray.length > index) {
      puntosRecoleccionArray.splice(index, 1);
      setFormData((prevData) => ({
        ...prevData,
        puntos_recoleccion: puntosRecoleccionArray.join(', '),
      }));
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
          <label>Correo</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
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
          <label>Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado ? "activo" : "inactivo"}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value === "activo" })}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
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
          <label>Categoría Municipio</label>
          <select
            name="categoria_municipio"
            value={formData.categoria_municipio}
            onChange={handleChange}
          >
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
            <option value="4">Categoría 4</option>
            <option value="5">Categoría 5</option>
            <option value="6">Categoría 6</option>
          </select>
        </div>

        

        <div className="form-group">
          <label>Puntos de Recolección</label>
          <table>
            <thead>
              <tr>
                <th>Punto</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {formData.puntos_recoleccion.split(', ').map((punto, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="puntos_recoleccion"
                      value={punto}
                      onChange={(e) => {
                        const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
                        nuevosPuntosRecoleccion[index] = e.target.value;
                        const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
                        setFormData({
                          ...formData,
                          puntos_recoleccion: nuevosPuntosRecoleccionString,
                        });
                      }}
                    />
                  </td>
                  <td>
                    {formData.puntos_recoleccion.split(', ').length > 1 && (
                      <button
                        type="button"
                        className="eliminar-button"
                        onClick={() => handleEliminarPuntoRecoleccion(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAgregarPuntoRecoleccion}>
            Agregar Punto
          </button>
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
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material) => (
                <tr key={material}>
                  <td>{material}</td>
                  <td>
                    <input
                      type="checkbox"
                      name={material}
                      checked={formData.materiales_recolectados.includes(material)}
                      onChange={handleMaterialChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>



        {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        <div className="form-group">

          {editandoId ? (
            <button type="button" className="submit-button" onClick={guardarEdicion}>
              Guardar Edición
            </button>
          ) : (
            <button type="submit" className="submit-button">
              Registrar
            </button>
          )}
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
        {registros.slice(-5).map((registro) => (
          <li key={registro.id}>
            <span>{registro.nombre}</span>
            <span>{registro.nit}</span>
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


