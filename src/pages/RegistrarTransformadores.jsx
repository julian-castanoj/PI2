
  /*useEffect(() => {
    // Al cargar el componente, obtener la lista de transformadores existentes
    fetch('http://localhost:3000/transformadores')
      .then((response) => response.json())
      .then((data) => setRegistros(data))
      .catch((error) => console.error('Error al obtener los transformadores:', error));
  }, []);*/
  import React, { useState } from 'react';
  import '../styles/registrarMiembros.css';
  import { useParams } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  
  const RegistrarTransformadores = () => {
    const navigate = useNavigate();
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
  
    const [registros, setRegistros] = useState([]);
    const [editandoId, setEditandoId] = useState(null);
  
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
      const indiceEdicion = registros.findIndex((registro) => registro.id === editandoId);
      if (indiceEdicion !== -1) {
        const registroActualizado = { ...formData, id: editandoId };
        try {
          const response = await fetch(`http://localhost:3000/transformadores/${editandoId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registroActualizado),
          });
          if (response.ok) {
            const nuevosRegistros = [...registros];
            nuevosRegistros[indiceEdicion] = registroActualizado;
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
          } else {
            console.error('Error al editar el registro');
          }
        } catch (error) {
          console.error('Error al realizar la solicitud:', error);
        }
      }
    };
  
    const eliminarRegistro = async (id) => {
      try {
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
          }
        }
      } catch (error) {
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
            <label>Correo</label>
            <input
              type="text"
              name="correo"
              value={formData.correo}
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
            <input
              type="checkbox"
              name="registro_anla"
              checked={formData.registro_anla}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Número de Certificado</label>
            <input
              type="number"
              name="numero_certificado"
              value={formData.numero_certificado}
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
              <span>{registro.razon_social}</span>
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
  

