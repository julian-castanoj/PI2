
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/GESTORENTIDAD.css';
import { useNavigate } from 'react-router-dom';
import { MdCalendarMonth } from "react-icons/md";

const RegistrarGestorEntidadExterna = () => {
  const [formData, setFormData] = useState({
    gestorId: '',
    gestor_recibe: '',
    material: [],
    cantidad: '',
    fecha: '',
    archivoImagen: null,
    entidad_externa: '',
    descripcion: '',
    ubicacion: '',
    cantidades: [],
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
      const response = await fetch('https://backend-ac-production.up.railway.app/transacciones/ge');
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
    fetch('https://backend-ac-production.up.railway.app/gestor')
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
      fetch(`https://backend-ac-production.up.railway.app/gestor/${parsedId}`)
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
        fetch(`https://backend-ac-production.up.railway.app/gestor/${parsedId}`)
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
    console.log(formData);
    console.log(materiales);
    console.log(cantidades);
    const numericGestorRecibe = isNaN(formData.gestor_recibe) ? formData.gestor_recibe : parseFloat(formData.gestor_recibe);

    const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

    if (userConfirmed) {
      try {
        const requestBody = {
          gestor_recibe: formData.gestorId, // Cambié gestorId a gestor_recibe
          gestorId: '', // Puedes mantener este valor en blanco si es necesario
          material: materiales.join(', '),
          cantidad: cantidades.join(', '),
          fecha: formData.fecha,
          archivoImagen: formData.archivoImagen,
          entidad_externa: formData.entidad_externa,
          descripcion: formData.descripcion,
          ubicacion: formData.ubicacion,
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch('https://backend-ac-production.up.railway.app/transacciones', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          console.log("gestor_recibe: ", numericGestorRecibe);
          fetchData();
          setMateriales([]);
          setCantidades(Array.from({ length: materiales.length }, () => ''));
          console.log("Mensaje actualizado:", message);
          // Restablecer el estado del formulario
          setFormData({
            gestorId: '',
            gestor_recibe: '',
            material: [],
            cantidad: '',
            fecha: '',
            archivoImagen: null,
            entidad_externa: '',
            descripcion: '',
            ubicacion: '',
            cantidades: [],
          });
          setMessage('Registro exitoso');

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
    setEditandoId(id);
    // Aquí puedes cargar los datos del registro seleccionado para edición si es necesario.
    // Por ejemplo, puedes realizar una solicitud a la API para obtener los detalles del registro.
    fetch(`https://backend-ac-production.up.railway.app/transacciones/ge/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Verifica la estructura de datos y ajusta la lógica según sea necesario
        const {
          gestorId,
          gestor_recibe,
          material,
          cantidad,
          fecha,
          archivoImagen,
          entidad_externa,
          descripcion,
          ubicacion,
        } = data;

        // Actualiza el estado formData con los datos del registro seleccionado
        setFormData({
          gestorId,
          gestor_recibe,
          material,
          cantidad,
          fecha,
          archivoImagen,
          entidad_externa,
          descripcion,
          ubicacion,
        });
      })
      .catch((error) => console.error('Error al cargar los datos del registro:', error));
  };

  const guardarEdicion = async () => {
    navigate('/gestorEntidadExterna');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`https://backend-ac-production.up.railway.app/transacciones/ge/${editandoId}`, requestOptions);

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
      const response = await fetch(`https://backend-ac-production.up.railway.app/transacciones/ge/${id}`, {
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
    fetch(`https://backend-ac-production.up.railway.app/gestor/${gestorId}`)
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

  useEffect(() => {
    console.log("Renderizando componente...");
  }, [message]);

  return (


    <div className="registrar-miembros-page2">

      <form onSubmit={handleSubmit}>

        <div className="GESTORENTIDAD">
          <div className="contenido-wrapper">
            <div className="contenido">
              <div className="form">
                <div className="group">
                  <div className="text-wrapper">Información</div>
                </div>
              </div>
              <p className="div">Formulario de registro de transacción - Entidad externa</p>
            </div>
          </div>
        </div>


        <div className="GESTOR-ENTIDAD1">
          <label className="gestor-wrapper">
            <div className="gestor">ID - Nombre del gestor</div>
          </label>
          <select
            className="selectoutlineGE"
            style={{ width: '170px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
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








        <div className="material2">
          <div className="material">
            <label>Materiales Asociados</label>
          </div>
          <table className="materiales-table">
            <thead>
              <div className="material1">
                <tr>
                  <th></th>
                </tr>
              </div>
            </thead>
            <tbody>
              <div className="materialN" >
                {materiales.map((material, index) => (
                  <tr key={index}  >
                    <td style={{ height: '35px' }}>{material}</td>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        </div>


        <div className="cantidad2">
          <table className="cantidad-table">
            <thead>
              <tr>
                <th style={{ fontFamily: 'lato' }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {/* Utilizar la longitud de materiales para generar la misma cantidad de filas */}
              {Array.from({ length: materiales.length }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="Cantidad1">
                      <input
                        style={{ backgroundColor: '#f5f6fa', color: '#7c7d7f', fontFamily: 'Lato' }}
                        type="number"
                        value={cantidades[index]}
                        onChange={(e) => handleCantidadChange(index, e)}
                        placeholder="Ingrese la cantidad"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>





        <label className="fecha-wrapper">
          <div className="fecha">Fecha</div>
        </label>

        <div className="div-GE1">
          <input
            className="overlap-groupb1 text-wrapperb1 fecha1"
            style={{ width: '130px', zIndex:'1' }}
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}

          />
          <div className='calendar' style={{pointerEvents: 'none',zIndex: '2'}} >
            <MdCalendarMonth color='#069877'  />
          </div>
        </div>

        <div className="div-GE2">

          <input
            className="overlap-groupb1 text-wrapperb1"
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
            placeholder="Archivo de Imagen"
          />
        </div>

        <div className="div-GE3">

          <input
            style={{ backgroundColor: '#f5f6fa' }}
            className="overlap-groupb2 text-wrapperb1"
            type="text"
            name="entidad_externa"
            value={formData.entidad_externa}
            onChange={handleChange}
            placeholder="Entidad Externa"
          />
        </div>

        <div className="div-GE4">

          <input
            style={{ backgroundColor: '#f5f6fa' }}
            className="overlap-groupb2 text-wrapperb1"
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>

        <div className="GESTOR-ENTIDAD4">
          <label className="gestor-wrapper">
            <div className="gestor">Ubicación</div>
          </label>
          <select
            className="selectoutlineGE"
            style={{ width: '130px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
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



        <div className="errorGE">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="boxGE">
          <div className="CRGE">
            <button type="button" className="cancelarGE" onClick={handleCancelar}>
              <div className="ogGE">
                <div className="twGE">Cancelar</div>
              </div>
            </button>

            {editandoId ? (
              <button type="button" className="registrarGE" onClick={guardarEdicion}>
                <div className="dGE">Guardar Edición</div>
              </button>
            ) : (
              <button type="submit" className="registrarGE" onClick={handleSubmit}>
                <div className='oGE'>
                  <div className="dGE">Registrar</div>
                </div>
              </button>
            )}

          </div>
        </div>
      </form>


      <div className="labGE">
        <div className="textlGE">Registros</div>
      </div>

      <div className='registrosGE'>
        <div className="box4GE">
          <div className="group4GE">
            <ul className="uliGE">
              {registros.slice(-5).map((registro) => (
                <li key={registro.id} className="registroGE">
                  <div className="text-wrapper-7-GE"> Gestor </div>
                  <span className="spanGE">{registro.gestor_recibe}</span>

                  <div className="div2GE"> Entidad externa </div>
                  <span className="span2GE">{registro.entidad_externa}</span>


                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarGestorEntidadExterna;