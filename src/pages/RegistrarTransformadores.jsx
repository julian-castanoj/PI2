import React, { useState, useEffect } from 'react';
import '../styles/registrarTransformadores.css';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

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
    <div className="registrar-miembros-page2">

      <form onSubmit={handleSubmit}>

        <div className="TRANSFORMADORES-REGISTRO">
          <div className="overlap-wr">
            <div className="ov">
              <div className="contenidoT">
                <div className="overlap-gr">
                  <div className="formT">
                    <div className="divT">



                      <div className="overlap-gr-wrapper">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="representante_legal"
                          value={formData.representante_legal}
                          onChange={handleChange}
                          placeholder="Representante legal"
                        />
                      </div>


                      <div className="groupT">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="correo"
                          value={formData.correo}
                          onChange={handleChange}
                          placeholder="Correo"
                        />
                      </div>



                      <div className="groupT-2">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="number"
                          name="nit"
                          value={formData.nit || ''}
                          onChange={handleChange}
                          placeholder="NIT"
                        />
                      </div>


                      <div className="groupT-3">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="number"
                          name="telefono"
                          value={formData.telefono || ''}
                          onChange={handleChange}
                          placeholder='Teléfono'
                        />
                      </div>


                      <div className="overlap-2">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="direccion_principal"
                          value={formData.direccion_principal}
                          onChange={handleChange}
                          placeholder='Dirección principal'
                        />
                      </div>



                      <div className="overlap-3">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="direccion_planta"
                          value={formData.direccion_planta}
                          onChange={handleChange}
                          placeholder='Dirección planta'
                        />

                      </div>

                      <div className="overlap-4">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                          placeholder='Departamento'
                        />
                      </div>

                      <div className="overlap-5">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="municipio"
                          value={formData.municipio}
                          onChange={handleChange}
                          placeholder='Municipio'
                        />
                      </div>





                    </div>

                  </div>
                  <p className="p">Formulario de registro de Transformadores</p>
                  <div className="groupT-5">

                    <div className="div-wrapperT">
                      <input
                        className="div-wrapperT text-wrapperT"
                        type="text"
                        name="razon_social"
                        value={formData.razon_social}
                        onChange={handleChange}
                        placeholder="Razón social"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="groupT-4">
            <div className="text-wrapperT-3">Información</div>
          </div>
        </div>

        <div className=" TRANSFORMADOR-REGISTRO1 ">
          <div className="overlap-group-wrappertr">
            <div className="overlap-grouptr">
              <div className="contenidotr">
                <div className="formtr">
                  <p className="text-wrapper-materiales-transforma">Materiales de empaques puestos en el mercado</p>

                  {materiales.map((material, index) => (
                    <div key={index}>

                      <div className="divtr">{material}</div>
                      <div className="text-wrapper-2tr">Seleccionar</div>
                      <input className="checkbox"
                        type="checkbox"
                        name={material}
                        checked={formData.material_produce.includes(material)}
                        onChange={handleMaterialChange}
                      />
                    </div>

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="TRANSFORMADOR-REGISTRO2">
          <label className="anla-wrapper">
            <div className="anla">Regitro ANLA</div>
          </label>
          <select
            className="selectoutline1"
            style={{ width: '130px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="registro_anla"
            value={formData.registro_anla}
            onChange={(e) => setFormData({ ...formData, registro_anla: e.target.value })}
          >
            <option value="NO">No</option>
            <option value="SI">Si</option>
          </select>

        </div>

        {formData.registro_anla === "SI" ? (
          <div className="overlap-6">
            <input
              className="div-wrapperT text-wrapperT"
              type="number"
              name="numero_certificado"
              value={formData.numero_certificado }
              onChange={handleChange}
              placeholder='Número de Certificado'
            />
          </div>
        ) : null}



        <div className="errorT">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="boxT">
          <div className="CRT">
            <button type="button" className="cancelarT" onClick={handleCancelar}>
              <div className="ogT">
                <div className="twT">Cancelar</div>
              </div>
            </button>

            {editandoId ? (
              <button type="button" className="registrarT" onClick={guardarEdicion}>
                <div className="dT">Guardar Edición</div>
              </button>
            ) : (
              <button type="submit" className="registrarT" onClick={handleSubmit}>
                <div className='oT'>
                  <div className="dT">Registrar</div>
                </div>
              </button>
            )}

          </div>
        </div>


      </form>


      <div className="labT">
        <div className="textT">Registros</div>
      </div>

      <div className='registrosT'>
        <div className="boxTR">
          <div className="groupTR">
            <ul className="uliTR">
              {registros.slice(-5).map((registro) => (
                <li key={registro.id} className="registroTR">
                  <div className="text-wrapper-TR"> Representante legal</div>
                  <span className="spanTR">{registro.representante_legal}</span>

                  <div className="divTR">NIT </div>
                  <span className="spanTR1">{registro.nit}</span>

                  <div className="text-wrapper-Tra">Acciones</div>
                  <span className="spanTR2"></span>
                  <button onClick={() => editarRegistro(registro.id)} className="edit-buttonT">
                    <BiSolidEdit />
                  </button>
                  <button onClick={() => eliminarRegistro(registro.id)} className="delete-buttonT">
                   <div className="icon-container">
                    <IoTrashOutline />
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarTransformadores;