import React, { useState, useEffect } from 'react';
import '../../styles/PRODUCTORESREGIST.css';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";


const RegistrarProductores = () => {
  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    cantidad: '',
    material: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);


  const fetchData = async () => {
    try {
      const response = await fetch('https://backend-ac-production.up.railway.app/productor');
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
      try {
        // Asegúrate de que los valores iniciales sean números
        const cantidadesArray = [
          Number(formData.papel) || 0,
          Number(formData.carton) || 0,
          Number(formData.vidrio) || 0,
          Number(formData.plasticoRigido) || 0,
          Number(formData.plasticoFlexible) || 0,
        ];

        const cantidadesStringResult = cantidadesArray.join(', ');

        console.log('Cantidad a enviar:', cantidadesStringResult);

        const materialesRecolectadosDefault = 'Papel, Cartón, Vidrio, Plástico Rígido, Plástico Flexible';

        // Actualiza formData antes de realizar la solicitud
        setFormData((prevFormData) => ({
          ...prevFormData,
          cantidad: cantidadesStringResult,
          material: materialesRecolectadosDefault,
        }));

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            correo: formData.correo,
            nombre: formData.nombre,
            nit: formData.nit,
            telefono: formData.telefono,
            direccion: formData.direccion,
            cantidad: cantidadesStringResult,
            material: materialesRecolectadosDefault,
          }),
        };

        try {
          setMessage(null); // Limpiamos mensajes previos
          const response = await fetch('https://backend-ac-production.up.railway.app/productor/registrar', requestOptions);

          if (response.ok) {
            console.log('Registro exitoso');
            setMessage('Registro exitoso');
            fetchData();

            // Limpia el formulario después del registro exitoso
            setFormData((prevFormData) => ({
              ...prevFormData,
              correo: '',
              nombre: '',
              nit: '',
              telefono: '',
              direccion: '',
              papel: '',  // Asegúrate de incluir limpiar cada campo de cantidad
              carton: '',
              vidrio: '',
              plasticoRigido: '',
              plasticoFlexible: '',
              material: '',
            }));
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
      } catch (error) {
        console.error('Error al intentar enviar el formulario:', error);
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
    console.log(formData);
    try {
      const response = await fetch(`https://backend-ac-production.up.railway.app/productor/${id}`);
      if (response.ok) {
        const data = await response.json();

        // Verifica si "cantidad" existe y es una cadena antes de intentar dividirla
        const cantidadesArray = (typeof data.cantidad === 'string' ? data.cantidad : '').split(',').map(str => str.trim());

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
    console.log(formData.material);
    console.log(formData.cantidad);
    if (indiceEdicion !== -1) {
      try {
        setMessage(null); // Limpia mensajes previos
        const response = await fetch(`https://backend-ac-production.up.railway.app/productor/${editandoId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            //cantidad: getCantidadesString(), // Actualiza la cantidad al editar
          }),
        });

        if (response.ok) {
          const nuevosRegistros = [...registros];
          nuevosRegistros[indiceEdicion] = formData;
          setRegistros(nuevosRegistros);

          setFormData({
            correo: '',
            nombre: '',
            nit: '',
            telefono: '',
            direccion: '',
            cantidad: '', // Deja este campo en blanco
            material: '', // Puedes ajustar este valor según tus necesidades
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


  const eliminarRegistro = async (id) => {
    try {
      setMessage(null);
      const response = await fetch(`https://backend-ac-production.up.railway.app/productor/${id}`, {
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
            material: '',
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
    <div className="registrar-miembros-page2">
      <div className="label">
        <p className="text-wrapper">Formulario de registro de Productores</p>
      </div>
      <form onSubmit={handleSubmit}>



        <div className="box1 ${showBox1 ? 'show-box1' : ''}`">
          <div className="form1">
            <div className="overlap">

              <div className="group1">
                <input

                  className="overlapgroup textwrapper-placeholder "
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="overlapgroupwrapper">
                <input
                  className="overlapgroup div-placeholder"
                  type="text"
                  name="correo"
                  placeholder="Correo"
                  value={formData.correo}
                  onChange={handleChange}
                />
              </div>

              <div className="overlapgroupwrapper1">
                <input
                  className="overlapgroup div-placeholder"
                  type="number"
                  name="nit"
                  placeholder="NIT"
                  value={formData.nit || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="overlapgroupwrapper2">
                <input
                  className="overlapgroup div-placeholder"
                  type="number"
                  name="telefono"
                  placeholder="Telefono"
                  value={formData.telefono || ''}
                  onChange={handleChange}
                />
              </div>

              <div className="group2">
                <input
                  className="divwrapper div-placeholder"
                  type="text"
                  name="direccion"
                  placeholder="Direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                />
                <div className="textwrapper2">Información</div>

              </div>

            </div>


          </div>
        </div>




        <div className="box ">
          <div className="form ">
            <p className="text-wrapper">Materiales de empaques puestos en el mercado</p>
            <div className="div">Papel</div>
            <div className="text-wrapper-2">Cantidad</div>
            <div className="text-wrapper-3">Cartón</div>
            <div className="text-wrapper-4">Vidrio</div>
            <div className="text-wrapper-5">Plástico rígido</div>
            <div className="text-wrapper-6">Plástico flexible</div>
            <input className="group"
              type="number"
              name="papel"
              value={formData.papel || ''}
              onChange={handleInputChange}
            />
            <input className="group-2" type="number"
              name="carton"
              value={formData.carton || ''}
              onChange={handleInputChange}
            />
            <input className="group-3" type="number"
              name="vidrio"
              value={formData.vidrio || ''}
              onChange={handleInputChange} />
            <input className="group-4" name="plasticoRigido" type="number"
              value={formData.plasticoRigido || ''}
              onChange={handleInputChange} />
            <input className="group-5" name="plasticoFlexible" type="number"
              value={formData.plasticoFlexible || ''}
              onChange={handleInputChange} />
          </div>
        </div>

        <div className="error">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="box2">
          <div className="CR">
            <button type="button" className="cancelar" onClick={handleCancelar}>
              <div className="og">
                <div className="tw">Cancelar</div>
              </div>
            </button>

            {editandoId ? (
              <button type="button" className="registrar" onClick={guardarEdicion}>

                <div className="d">Guardar Edición</div>

              </button>
            ) : (
              <button type="submit" className="registrar" onClick={handleSubmit}>
                <div className='o'>
                  <div className="d">Registrar</div>
                </div>
              </button>
            )}
          </div>
        </div>
      </form>


      <div className="lab">
        <div className="textl">Registros</div>
      </div>

      <div className='registros'>
        <div className="box4">
          <div className="group4">
            <ul className="uli">
              {registros.slice(-5).map((registro) => (

                
                <li key={registro.id} className="registro" >
                  <div className="text-wrapper-7"> Nombre</div>
                  <span className="span">{registro.nombre}</span>


                  <div className="div2">NIT </div>
                  <span className="span2">{registro.nit}</span>


                  <div className="text-wrapper-8">Acciones</div>
                  <span className="span3"></span>


                  <button onClick={() => handleEditarClick(registro.id)} className="edit-buttonP">
                    <BiSolidEdit />
                  </button>

                  <button onClick={() => eliminarRegistro(registro.id)} className="delete-buttonP">
                    <div className="icon-containerP">
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



export default RegistrarProductores;