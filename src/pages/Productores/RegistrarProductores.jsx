import React, { useState, useEffect } from 'react';
  import '../../styles/registrarProductor.css';
  
  const RegistrarProductores = () => {
    const [formData, setFormData] = useState({
      correo: '',
      nombre: '',
      nit: 0,
      telefono: 0,
      direccion: '',
      
      materiales_recolectados: [],
    });
  
    const [registros, setRegistros] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
    const [message, setMessage] = useState(null);
    
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/productor');
        if (response.ok) {
          const data = await response.json();
          setRegistros(data);
        } else {
          console.error('Error al obtener registros');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
  
    useEffect(() => {
      fetchData();
    }, []);
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
  
      if (type === 'text' || type === 'number') {
        setFormData({
          ...formData,
          [name]: value,
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
      setMessage(null); // Limpiamos mensajes previos
      const response = await fetch('http://localhost:3000/productor/registrar', requestOptions);

      if (response.ok) {
        console.log('Registro exitoso');
        setMessage('Registro exitoso');
        fetchData();

        // Limpia el formulario después del registro exitoso
        setFormData({
          correo: '',
          nombre: '',
          nit: 0,
          telefono: 0,
          direccion: '',
          materiales_recolectados: [],
        });
      } else if (response.status === 400) {
        const errorData = await response.json();
        setMessage('Error: ' + errorData.message);
        console.error('Error al registrar:', errorData.message);
      } else if (response.status === 500) {
        setMessage('Error inesperado al registrar');
        console.error('Error inesperado al registrar');
      } else {
        setMessage('Error inesperado al registrar');
        console.error('Error inesperado al registrar');
      }
    } catch (error) {
      setMessage('Error al realizar la solicitud: ' + error.message);
      console.error('Error al realizar la solicitud:', error);
    }
  } else {
    console.log('Envío del formulario cancelado');
  }
};
  
    const handleCancelar = () => {
      const confirmCancel = window.confirm('¿Seguro que quieres cancelar?');
      if (confirmCancel) {
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

        try {
          setMessage(null); // Limpia mensajes previos
          const response = await fetch(`http://localhost:3000/productor/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const nuevosRegistros = [...registros];
            nuevosRegistros[indiceEdicion] = formData;
            setRegistros(nuevosRegistros);
    
            setFormData({
              correo: '',
              nombre: '',
              nit: 0,
              telefono: 0,
              direccion: '',
              
              materiales_recolectados: [],
            });
            setEditandoId(null);
    
            
            console.log('Edición exitosa:');
            setMessage('Edicion exitosa');
          } else if (response.status === 400) {
            const errorData = await response.json();
            setMessage('Error al editar el registro: ' + errorData.errors);
            console.error('Error al editar el registro:', errorData.errors);
          } else if (response.status === 500) {
            setMessage('Error inesperado al editar el registro');
            console.error('Error inesperado al editar el registro');
          } else {
            setMessage('Error inesperado al editar el registro');
            console.error('Error inesperado al editar el registro');
          }
        } catch (error) {
          setMessage('Error al realizar la solicitud: ' + error.message);
          console.error('Error al realizar la solicitud:', error);
        }
      }
    };
    
    const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    const materiales = [...formData.materiales_recolectados];
    const materialIndex = materiales.findIndex((material) => material.material === name);

    if (materialIndex !== -1) {
      materiales[materialIndex].cantidad = value;
    } else {
      materiales.push({ material: name, cantidad: value });
    }

    setFormData({
      ...formData,
      materiales_recolectados: materiales,
    });
  }; 
  
    const eliminarRegistro = async (id) => {
      try {
        setMessage(null);
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
              
              materiales_recolectados: [],
            });
            setEditandoId(null);
          }
  
          console.log('Eliminación exitosa');
          setMessage('Eliminación exitosa');
        } else {
          const errorData = await response.json();
  
          if (errorData && errorData.errors) {
            setMessage('Error al eliminar el registro: ' + errorData.errors);
            console.error('Error al eliminar el registro:', errorData.errors);
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
  
    return (
      <div className="registrar-miembros-page">
        <h2>Formulario de Registro de productores</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Correo</label>
            <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
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
         <label>Materiales de empaques puestos en el mercado</label>

          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Papel</td>
                <td>
                  <input
                    type="number"
                    name="papel"
                    value={formData.materiales_recolectados.find((material) => material.material === 'papel')?.cantidad || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Cartón</td>
                <td>
                  <input
                    type="number"
                    name="carton"
                    value={formData.materiales_recolectados.find((material) => material.material === 'carton')?.cantidad || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Vidrio</td>
                <td>
                  <input
                    type="number"
                    name="vidrio"
                    value={formData.materiales_recolectados.find((material) => material.material === 'vidrio')?.cantidad || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Plástico Rígido</td>
                <td>
                  <input
                    type="number"
                    name="plasticoRigido"
                    value={formData.materiales_recolectados.find((material) => material.material === 'plasticoRigido')?.cantidad || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Plástico Flexible</td>
                <td>
                  <input
                    type="number"
                    name="plasticoFlexible"
                    value={formData.materiales_recolectados.find((material) => material.material === 'plasticoFlexible')?.cantidad || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
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

export default RegistrarProductores;