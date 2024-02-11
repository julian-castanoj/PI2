import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

const EditarGestor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchGestorDetails = async () => {
      try {
        const response = await fetch(`https://backend-ac-production.up.railway.app/gestor/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error al cargar los detalles del gestor');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchGestorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Función para manejar el cambio en los puntos de recolección
  const handlePuntosRecoleccionChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      puntos_recoleccion: value,
    });
  };

  // Función para manejar el cambio en los materiales recolectados
  const handleMaterialesRecolectadosChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      materiales_recolectados: value,
    });
  };

  // Funciones para manejar los puntos de recolección
  const handleEliminarPuntoRecoleccion = (index) => {
    const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
    nuevosPuntosRecoleccion.splice(index, 1);
    const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
    setFormData({
      ...formData,
      puntos_recoleccion: nuevosPuntosRecoleccionString,
    });
  };

  // Funcion para agregar mas puntos de recolección
  const handleAgregarPuntoRecoleccion = () => {
    const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
    nuevosPuntosRecoleccion.push('');
    const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
    setFormData({
      ...formData,
      puntos_recoleccion: nuevosPuntosRecoleccionString,
    });
  };


  const materiales = [
    'Papel',
    'Cartón',
    'Vidrio',
    'Plástico Rígido',
    'Plástico Flexible',
  ];

  // Función para manejar el cambio en los materiales recolectados
  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;
    let materialesSeleccionados = formData.materiales_recolectados.split(', ');
    if (checked) {
      materialesSeleccionados.push(name);
    } else {
      materialesSeleccionados = materialesSeleccionados.filter((material) => material !== name);
    }
    const materialesSeleccionadosString = materialesSeleccionados.join(', ');
    setFormData({
      ...formData,
      materiales_recolectados: materialesSeleccionadosString,
    });
  };

  //  Funcion para actualizar gestores
  const handleGuardarCambios = () => {
    navigate('/gestores');
    const actualizarGestor = async () => {
      try {
        const response = await fetch(`https://backend-ac-production.up.railway.app/gestor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          navigate('/gestores');
        } else {
          const responseData = await response.json();
          console.error('Error al actualizar el gestor:', responseData.error);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    actualizarGestor();
  };

  const handleCancelar = () => {
    navigate('/gestores');
  };

  return (
    <div className="registrar-miembros-page2">
      <form onSubmit={handleGuardarCambios}>


        <div className="GESTORES-REGISTROb1">
          <div className="divb1">
            <div className="groupb1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="number"
                name="nit"
                value={formData.nit}
                onChange={handleChange}
                placeholder='NIT'
              />
            </div>

            <div className="overlap-wrapperb1">
              <input
                className="overlap-groupb1 text-wrapperb1 "
                type="number"
                name="telefono"
                value={formData.telefono}
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
                value={formData.capacidad}
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
          <label className="estado-wrapper">
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
                              placeholder='nombre del punto'
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

        <div className="b4box2">
          <div className="b4CR">
            <button type="button" className="b4cancelar" onClick={handleCancelar}>
              <div className="b4og">
                <div className="b4tw">Cancelar</div>
              </div>
            </button>
            <button type="submit" className="b4registrar" onClick={handleGuardarCambios}>
              <div className='b4o'>
                <div className="b4d">Guardar Edición</div>
              </div>
            </button>
          </div>
        </div>

      </form>
    </div>

  );
};

export default EditarGestor;