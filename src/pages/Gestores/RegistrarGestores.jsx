import React, { useState, useEffect } from 'react';
import '../../styles/registrarMiembros.css';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";


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

  const editaregistro = async (id) => {
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
    const confirmCancel = window.confirm('¿Seguro que quieres eliminar el resgitro?');
    if (confirmCancel) {

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
    <div className="registrar-miembros-page2">

      <form onSubmit={handleSubmit}>


        <div className="GESTORES-REGISTROb1">
          <div className="divb1">

            <div className="groupb1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="number"
                name="nit"
                value={formData.nit || ''}
                onChange={handleChange}
                placeholder='NIT'

              />
            </div>




            <div className="overlap-wrapperb1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="number"
                name="telefono"
                value={formData.telefono || ''}
                onChange={handleChange}
                placeholder='Teléfono'

              />
            </div>



            <div className="overlap-group-wrapperb1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="text"
                name="direccion"
                placeholder='Direcciòn'
                value={formData.direccion}
                onChange={handleChange}
              />
            </div>




            <div className="div-wrapperb1">
              <input

                className="overlap-groupb1 text-wrapperb1 "
                type="number"
                name="capacidad"
                placeholder='Capacidad'
                value={formData.capacidad || ''}
                onChange={handleChange}
              />
            </div>

            <div className="group-2b1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>




            <div className="group-3b1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="text"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder='Correo'

              />
            </div>

            <div className="group-3b2">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="text"
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
                placeholder='Municipio'

              />
            </div>


            <div className="group-3b3">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="text"
                name="mecanismos_recoleccion"
                value={formData.mecanismos_recoleccion}
                onChange={handleChange}
                placeholder='Mecanismos de recolecciòn'

              />
            </div>


          <div className="text-wrapper-2b1">Información</div>
            <p className="pb1">Formulario de registro de Gestores</p>
          </div>
        </div>








        <div className="gestores-registro">
          <label className="estado-wrapper1">
            <div className="estado">Estado</div>
          </label>
          <select
            className="selectoutline"
            style={{ width: '130px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="estado"
            value={formData.estado}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value === 'true' })}
          >
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>

        </div>



        


        <div className="gestores-registro1">
          <label className="estado-wrapper1">
            <div className="estado1">Categoría del municipio</div>
          </label>
          <select
            className="selectoutline1"
            style={{ width: '130px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
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

        <div className="GESTORES-REGISTROb2">
          <div className="form-wrapperb2">
            <div className="formb2">
              <div className="overlap-groupb2">
                <div className="divb2">


                  <div className="text-wrapper-4b2">Puntos de recolección</div>
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <div className="text-wrapper-2b2">Puntos</div>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.puntos_recoleccion.split(', ').map((punto, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              placeholder='Nombre del punto'
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
                              <div className="groupb2">
                                <button
                                  type="button"
                                  className="bx-trashb2"
                                  onClick={() => handleEliminarPuntoRecoleccion(index)}
                                >
                                  <IoTrashOutline />
                                </button>
                              </div>


                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="botonesb2">
                    <div className="LOGIN-SIGNUPb2">
                      <div className="signupb2">
                        <div className="frameb2">
                          <button className="text-wrapperb2" type="button" onClick={handleAgregarPuntoRecoleccion}>
                            Agregar punto
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>

        

        <div className="GESTORES-REGISTRO">
          <div className="overlap-group-wrapper">
            <div className="overlap-group">
              <div className="contenido">
                <div className="form">
                  <p className="text-wrapper-materiales-mercado">Materiales de empaques puestos en el mercado</p>

                  {materiales.map((material, index) => (
                    <div key={index}>

                      <div className="div">{material}</div>
                      <div className="text-wrapper-2">Seleccionar</div>
                      <input className="checkbox"
                        type="checkbox"
                        name={material}
                        checked={formData.materiales_recolectados.includes(material)}
                        onChange={handleMaterialChange}
                      />
                    </div>

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="b4error">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="b4box2">
          <div className="b4CR">
            <button type="button" className="b4cancelar" onClick={handleCancelar}>
              <div className="b4og">
                <div className="b4tw">Cancelar</div>
              </div>
            </button>

            {editandoId ? (
              <button type="button" className="b4registrar" onClick={guardarEdicion}>
                <div className="b4d">Guardar Edición</div>
              </button>
            ) : (
              <button type="submit" className="b4registrar" onClick={handleSubmit}>
                <div className='b4o'>
                  <div className="b4d">Registrar</div>
                </div>
              </button>
            )}

          </div>
        </div>
      </form>


      <div className="b4lab">
        <div className="b4textl">Registros</div>
      </div>

      <div className='b4registros'>
        <div className="b4box4">
          <div className="b4group4">
            <ul className="b4uli">
              {registros.slice(-5).map((registro) => (
                <li key={registro.id} className="b4registro">
                  <div className="b4text-wrapper-7"> Nombre</div>
                  <span className="b4span">{registro.nombre}</span>

                  <div className="b4div2">NIT </div>
                  <span className="b4span2">{registro.nit}</span>

                  <div className="b4text-wrapper-8">Acciones</div>
                  <span className="b4span3"></span>
                  <button onClick={() => editaregistro(registro.id)} className="edit-buttonGE">
                    <BiSolidEdit />
                  </button>
                  <button onClick={() => eliminarRegistro(registro.id)} className="delete-buttonGE">
                   
                   <div className="icon-containerGE">
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

export default RegistrarGestores;


