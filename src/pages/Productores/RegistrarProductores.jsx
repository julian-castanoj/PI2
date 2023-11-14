import React, { useState, useEffect } from 'react';
import '../../styles/registrarProductor.css';

const RegistrarProductores = () => {
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    cantidad: '',
    materiales_recolectados: '',
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
    console.log(formData);
  
    const userConfirmed = window.confirm('¿Estás seguro de que deseas enviar el formulario?');
  
    if (userConfirmed) {
      const cantidadesString = getCantidadesString();
      const materialesRecolectadosDefault = 'Papel, Cartón, Vidrio, Plástico Rígido, Plástico Flexible';
  
      console.log('Cantidad a enviar:', cantidadesString);
  
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          cantidad: cantidadesString,
          
          materiales_recolectados: materialesRecolectadosDefault, // Siempre establece la cadena predeterminada
        }),
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
            cantidad: cantidadesString, // Asigna la cadena formateada aquí
            materiales_recolectados: materialesRecolectadosDefault, // Siempre establece la cadena predeterminada
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

  const handleEditarClick = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productor/${id}`);
      if (response.ok) {
        const data = await response.json();
        
        // Convierte la cadena de cantidades a un arreglo
        const cantidadesArray = data.cantidad.split(',').map(str => str.trim());
  
        // Establece los valores de cantidades en el estado del formulario
        setFormData({
          ...data,
          papel: cantidadesArray[0] || '',
          carton: cantidadesArray[1] || '',
          vidrio: cantidadesArray[2] || '',
          plasticoRigido: cantidadesArray[3] || '',
          plasticoFlexible: cantidadesArray[4] || '',
        });
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
          body: JSON.stringify({
            ...formData,
            cantidad: getCantidadesString(), // Actualiza la cantidad al editar
          }),
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
            cantidad: '', // Deja este campo en blanco
            materiales_recolectados: '', // Puedes ajustar este valor según tus necesidades
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getCantidadesString = () => {
    const cantidades = [
      formData.papel || 0,
      formData.carton || 0,
      formData.vidrio || 0,
      formData.plasticoRigido || 0,
      formData.plasticoFlexible || 0,
    ];
  
    // Convierte cada cantidad a cadena y luego únelas con ', '
    const cantidadesString = cantidades.map(String).join(', ');
  
    // Devuelve solo la cadena de cantidades sin la clave "cantidades"
    return cantidadesString;
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
            cantidad: '',
            materiales_recolectados: '',
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Papel</td>
              </tr>
              <tr>
                <td>Cartón</td>
              </tr>
              <tr>
                <td>Vidrio</td>
              </tr>
              <tr>
                <td>Plástico Rígido</td>
              </tr>
              <tr>
                <td>Plástico Flexible</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <table>
            <thead>
              <tr>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="papel"
                    value={formData.papel || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="carton"
                    value={formData.carton || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="vidrio"
                    value={formData.vidrio || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="plasticoRigido"
                    value={formData.plasticoRigido || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="plasticoFlexible"
                    value={formData.plasticoFlexible || ''}
                    onChange={handleInputChange}
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
            <button onClick={() => handleEditarClick(registro.id)} className="edit-button">
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