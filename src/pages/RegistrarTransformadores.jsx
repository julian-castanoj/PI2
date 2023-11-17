import React, { useState, useEffect } from 'react';


const RegistrarTransformadores = () => {
  

  const [formData, setFormData] = useState({
    razon_social: '',
    representante_legal: '',
    nit: 0,
    telefono: 0,
    direccion_principal: '',
    direccion_planta: '',
    departamento: '',
    municipio: '',
    correo: '',
    material_produce: '',
    registro_anla: false,
    numero_certificado: 0,
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
      const response = await fetch('http://localhost:3000/transformador');
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

        const response = await fetch('http://localhost:3000/transformador/registrar', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          setMessage('Registro exitoso');
          fetchData();

          // Limpia el formulario después del registro exitoso
          setFormData({
            razon_social: '',
            representante_legal: '',
            nit: 0,
            telefono: 0,
            direccion_principal: '',
            direccion_planta: '',
            departamento: '',
            municipio: '',
            correo: '',
            material_produce: '',
            registro_anla: false,
            numero_certificado: 0,
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
      window.location.href = '/transformadores';
    }
  };

  const editarRegistro = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transformador/${id}`);
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
      const response = await fetch(`http://localhost:3000/transformador/${editandoId}`, requestOptions);

      if (response.ok) {
        const nuevosRegistros = [...registros];
        const indiceEdicion = nuevosRegistros.findIndex((registro) => registro.id === editandoId);

        if (indiceEdicion !== -1) {
          nuevosRegistros[indiceEdicion] = { ...formData, id: editandoId };
          setRegistros(nuevosRegistros);
        }

        setFormData({
          razon_social: '',
          representante_legal: '',
          nit: 0,
          telefono: 0,
          direccion_principal: '',
          direccion_planta: '',
          departamento: '',
          municipio: '',
          correo: '',
          material_produce: '',
          registro_anla: false,
          numero_certificado: 0,

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
      const response = await fetch(`http://localhost:3000/transformador/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const registrosActualizados = registros.filter((registro) => registro.id !== id);
        setRegistros(registrosActualizados);

        if (editandoId === id) {
          setFormData({
            razon_social: '',
            representante_legal: '',
            nit: 0,
            telefono: 0,
            direccion_principal: '',
            direccion_planta: '',
            departamento: '',
            municipio: '',
            correo: '',
            material_produce: '',
            registro_anla: false,
            numero_certificado: 0,
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
    let updatedMaterialesSeleccionados = formData.material_produce.split(',').map(material => material.trim());
  
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
  
    // Filtra elementos vacíos antes de unirlos para evitar la coma inicial
    updatedMaterialesSeleccionados = updatedMaterialesSeleccionados.filter(material => material.length > 0);
  
    const materialesRecolectadosString = updatedMaterialesSeleccionados.join(', ');
  
    setFormData({
      ...formData,
      material_produce: materialesRecolectadosString,
    });
  };
  
  

  

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transformadores</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Razón Social</label>
          <input
            type="text"
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Representante Legal</label>
          <input
            type="text"
            name="representante_legal"
            value={formData.representante_legal}
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
          <label>Dirección Principal</label>
          <input
            type="text"
            name="direccion_principal"
            value={formData.direccion_principal}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dirección Planta</label>
          <input
            type="text"
            name="direccion_planta"
            value={formData.direccion_planta}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <input
            type="text"
            name="departamento"
            value={formData.departamento}
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
          <label>Materiales que transforma</label>
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
                      checked={formData.material_produce.includes(material)}
                      onChange={handleMaterialChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label>Registro ANLA</label>
          <select
            name="registro_anla"
            value={formData.registro_anla}
            onChange={(e) => setFormData({ ...formData, registro_anla: e.target.value })}
          >
            <option value="NO">NO</option>
            <option value="SI">SI</option>
          </select>
        </div>

        {formData.registro_anla === "SI" ? (
          <div className="form-group">
            <label>Número de Certificado</label>
            <input
              type="number"
              name="numero_certificado"
              value={formData.numero_certificado}
              onChange={handleChange}
            />
          </div>
        ) : null}

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
            Salir
          </button>
        </div>
      </form>
      <h2>Registros</h2>
      <ul>
        {registros.slice(-5).map((registro) => (
          <li key={registro.id}>
            <span>{registro.representante_legal}</span>
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

export default RegistrarTransformadores;