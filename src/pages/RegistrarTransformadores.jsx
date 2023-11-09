
/*useEffect(() => {
  // Al cargar el componente, obtener la lista de transformadores existentes
  fetch('http://localhost:3000/transformadores')
    .then((response) => response.json())
    .then((data) => setRegistros(data))
    .catch((error) => console.error('Error al obtener los transformadores:', error));
}, []);*/

import React, { useState, useEffect } from 'react';
import '../styles/registrarMiembros.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
    materiales: {
      Papel: {
        reciclaje: false,
        valoracion: false,
        gastoEnergetico: false,
        otro: false,
      },
      Carton: {
        reciclaje: false,
        valoracion: false,
        gastoEnergetico: false,
        otro: false,
      },
      Vidrio: {
        reciclaje: false,
        valoracion: false,
        gastoEnergetico: false,
        otro: false,
      },
      PlasticoRigido: {
        reciclaje: false,
        valoracion: false,
        gastoEnergetico: false,
        otro: false,
      },
      PlasticoFlexible: {
        reciclaje: false,
        valoracion: false,
        gastoEnergetico: false,
        otro: false,
      },
    },
    registro_anla: false,
    numero_certificado: 0,
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transformador');
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


  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name in formData.materiales) {
      setFormData({
        ...formData,
        materiales: {
          ...formData.materiales,
          [name]: {
            ...formData.materiales[name],
            [value]: newValue,
          },
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");
  
    if (userConfirmed) {
      try {
        setMessage(null); // Limpiar mensajes previos
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        };
  
        const response = await fetch('http://localhost:3000/transformador/registrar', requestOptions);
  
        if (response.ok) {
          console.log('Registro exitoso');
          setMessage('Registro exitoso');
          
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
            materiales: {
              Papel: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Carton: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Vidrio: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoRigido: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoFlexible: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
            },
            registro_anla: false,
            numero_certificado: 0,
          });
        
        } else {
          const errorData = await response.json();
          setMessage('Error al registrar: ' + errorData.message);
          console.error('Error al registrar:', errorData.message);
        }
      } catch (error) {
        setMessage('Error al realizar la solicitud: ' + error.message);
        console.error('Error al realizar la solicitud:', error);
      }
    } else {
      console.log('Envío del formulario cancelado');
    }
  };

 /* const handleSubmit = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      try {
        console.log(formData);
        const response = await fetch('http://localhost:3000/transformador/registrar', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          navigate('/transformadores');
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
        const errorData = await response.json();
        console.error('Error al obtener detalles del registro: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const guardarEdicion = async () => {
    const indiceEdicion = registros.findIndex((registro) => registro.id === editandoId);
    if (indiceEdicion !== -1) {
      try {
        setMessage(null); // Limpiar mensajes previos
        const response = await fetch(`http://localhost:3000/transformadores/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[indiceEdicion] = formData;
          setRegistros(nuevosRegistros);

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
            materiales: {
              Papel: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Carton: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Vidrio: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoRigido: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoFlexible: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
            },
            registro_anla: false,
            numero_certificado: 0,
          });
          setEditandoId(null);

          console.log('Edición exitosa');
          setMessage('Edición exitosa');
        } else {
          const errorData = await response.json();
          setMessage('Error al editar el registro: ' + errorData.message);
          console.error('Error al editar el registro:', errorData.message);
        }
      } catch (error) {
        setMessage('Error al realizar la solicitud: ' + error.message);
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  const eliminarRegistro = async (id) => {
    try {
      setMessage(null); // Limpiar mensajes previos
      const response = await fetch(`http://localhost:3000/transformadores/${id}`, {
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
            materiales: {
              Papel: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Carton: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              Vidrio: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoRigido: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
              PlasticoFlexible: {
                reciclaje: false,
                valoracion: false,
                gastoEnergetico: false,
                otro: false,
              },
            },
            registro_anla: false,
            numero_certificado: 0,
          });
          setEditandoId(null);

          console.log('Eliminación exitosa');
          setMessage('Eliminación exitosa');
        } else {
          const errorData = await response.json();
          setMessage('Error al eliminar el registro: ' + errorData.message);
          console.error('Error al eliminar el registro:', errorData.message);
        }
      }
    } catch (error) {
      setMessage('Error al realizar la solicitud: ' + error.message);
      console.error('Error al realizar la solicitud:', error);
    }
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
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Reciclaje</th>
                <th>Valoración</th>
                <th>Gasto Energético</th>
                <th>Otro</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.materiales).map((material) => (
                <tr key={material}>
                  <td>{material}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].reciclaje}
                      onChange={(e) => handleChange(e)}
                      name={material}
                      value="reciclaje"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].valoracion}
                      onChange={(e) => handleChange(e)}
                      name={material}
                      value="valoracion"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].gastoEnergetico}
                      onChange={(e) => handleChange(e)}
                      name={material}
                      value="gastoEnergetico"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].otro}
                      onChange={(e) => handleChange(e)}
                      name={material}
                      value="otro"
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
            Cancelar
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


