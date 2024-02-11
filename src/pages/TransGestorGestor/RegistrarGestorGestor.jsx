//imagen not null

/*const handleSubmit = async (e) => {
  e.preventDefault();

  const userConfirmed = window.confirm("¿Estás seguro de que deseas enviar el formulario?");

  if (userConfirmed) {
    const form = new FormData();
    for (const key in formData) {
     if (key === 'imagen') {
        form.append(key, formData[key], formData[key].name);
      } else {
        form.append(key, formData[key]);
      }
    }

    const requestOptions = {
      method: 'POST',
      body: form,
    };

    try {
      const response = await fetch('backend-ac-production.up.railway.app/transacciongg', requestOptions);

      if (response.ok) {
        console.log('Registro exitoso');
        fetchData();
      } else {
        console.error('Error al registrar');
        setErrores([...errores, 'Error al registrar: Hubo un problema al registrar el formulario.']);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setErrores([...errores, 'Error al realizar la solicitud: ' + error.message]);
    }
  } else {
    console.log('Envío del formulario cancelado');
  }
};*/

import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/GESTOGESTORREGISTRO.css';
import { useNavigate } from 'react-router-dom';
import { MdCalendarMonth } from "react-icons/md";

const RegistrarGestorGestor = () => {
  const [formData, setFormData] = useState({
    gestor_realiza: '',
    gestor_recibe: '',
    material: '',
    cantidad: '',
    fecha: '',
    archivoImagen: null,
    descripcion: '',
    ubicacion: '',
  });

  const [registros, setRegistros] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [message, setMessage] = useState(null);
  const [gestorNombres, setGestorNombres] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [gestores, setGestores] = useState([]);
  const navigate = useNavigate();
  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);
  const [cantidades, setCantidades] = useState(Array.from({ length: materiales.length }, () => ''));

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('backend-ac-production.up.railway.app/transacciones/gg');
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
    fetch('backend-ac-production.up.railway.app/gestor')
      .then((response) => response.json())
      .then((data) => setGestores(data))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
  }, []);

  useEffect(() => {
    if (formData.gestor_realiza && formData.gestor_recibe) {
      const commonMaterials = gestores
        .find((gestor) => gestor.id === formData.gestor_realiza)?.materiales_recolectados
        .split(',')
        .map((material) => material.trim())
        .filter((material) =>
          gestores.find((gestor) => gestor.id === formData.gestor_recibe)?.materiales_recolectados
            .split(',')
            .map((m) => m.trim())
            .includes(material)
        );

      setMateriales(commonMaterials);
      setCantidades(Array.from({ length: commonMaterials.length }, () => ''));
    }
  }, [formData.gestor_realiza, formData.gestor_recibe, gestores]);

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      material: selectedMaterial,
    }));

    setMateriales((prevMateriales) => [...prevMateriales, selectedMaterial]);
  };


  const fetchMaterials = (gestorId) => {
    const parsedId = parseInt(gestorId);
    if (!isNaN(parsedId)) {
      fetch(`backend-ac-production.up.railway.app/gestor/${parsedId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.materiales_recolectados) {
            const materialList = data.materiales_recolectados.split(',').map(materialId => materialId.trim());
            setMateriales(materialList);
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

      const cantidadesString = updatedCantidades.join(', ');
      setFormData((prevFormData) => ({
        ...prevFormData,
        cantidad: cantidadesString,
      }));

      return updatedCantidades;
    });
  };

  const handleGestorRealizaIdChange = async (e) => {
    const selectedId = e.target.value;
    if (selectedId !== "0") {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`backend-ac-production.up.railway.app/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              gestor_realiza: data.id,
            });
            fetchMaterials(parsedId);
          } else {
            console.error('Error al obtener los detalles del gestor realiza:', response.status);
          }
        } catch (error) {
          console.error('Error al obtener los detalles del gestor realiza:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };

  const handleGestorRecibeIdChange = async (e) => {
    const selectedId = e.target.value;
    if (selectedId !== "0") {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`backend-ac-production.up.railway.app/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              gestor_recibe: data.id,
            });
            fetchPuntosRecoleccion(parsedId);
          } else {
            console.error('Error al obtener los detalles del gestor recibe:', response.status);
          }
        } catch (error) {
          console.error('Error al obtener los detalles del gestor recibe:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (window.confirm("¿Estás seguro de que deseas enviar el formulario?")) {
      try {
        const requestBody = {
          ...formData,
          cantidad: cantidades.join(', '),
          material: materiales.join(', '),
        };

        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        };

        const response = await fetch('backend-ac-production.up.railway.app/transacciones', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          fetchData();

          setMateriales([]);
          setCantidades(Array.from({ length: materiales.length }, () => ''));
          setFormData({
            gestor_realiza: '',
            gestor_recibe: '',
            cantidad: '',
            fecha: '',
            archivoImagen: null,
            descripcion: '',
            ubicacion: '',
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
  };

  const guardarEdicion = async () => {
    navigate('/gestorGestor');
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: { 'Content-Type': 'application/json' },
    };

    try {
      const response = await fetch(`backend-ac-production.up.railway.app/transacciones/gg/${editandoId}`, requestOptions);

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
      const response = await fetch(`backend-ac-production.up.railway.app/transacciones/gg/${id}`, {
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
    navigate('/gestorGestor');
  };

  const fetchPuntosRecoleccion = (gestorId) => {
    fetch(`backend-ac-production.up.railway.app/gestor/${gestorId}`)
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

  return (
    <div className="registrar-miembros-page2">

      <form onSubmit={handleSubmit}>

        <div className="GESTORGESTOR">
          <div className="contenido-wrapperGG">
            <div className="contenidoGG">
              <div className="formGG">
                <div className="groupGG">
                  <div className="text-wrapperGeGe">Información</div>
                </div>
              </div>
              <p className="divGeGe">Formulario de registro de transacción - gestor a gestor</p>
            </div>
          </div>
        </div>

        <div className="GESTOR-GESTOR1">
          <label className="gestorgg-wrapper">
            <div className="gestorgg">ID - Nombre del gestor REALIZA</div>
          </label>
          <select
            className="selectoutlineGG"
            style={{ width: '210px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="gestor_realiza"
            value={formData.gestor_realiza}
            onChange={handleGestorRealizaIdChange}
          >
            <option value="">Selecciona un gestor realiza</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {`${gestor.id} - ${gestor.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div className="GESTOR-GESTOR2">
          <label className="gestorgr-wrapper">
            <div className="gestorgr">ID - Nombre del gestor REALIZA</div>
          </label>
          <select
            className="selectoutlineGR"
            style={{ width: '210px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="gestor_recibe"
            value={formData.gestor_recibe}
            onChange={handleGestorRecibeIdChange}
          >
            <option value="">Selecciona un gestor realiza</option>
            {gestores
              .filter((gestor) => gestor.id !== formData.gestor_realiza) 
              .map((gestor) => (
                <option key={gestor.id} value={gestor.id}>
                  {`${gestor.id} - ${gestor.nombre}`}
                </option>
              ))}
          </select>
        </div>

        <div className="material2GG">
          <div className="materialNGG">
            <label>Materiales Asociados</label>
          </div>
          <table className="materiales-tableGG">
            <thead>
              <div className="material1GG">
                <tr>
                  <th></th>
                </tr>
              </div>
            </thead>
            <tbody>
              <div className="materialGG" >
                {materiales.map((materialId, index) => (
                  <tr key={index}>
                    <td style={{ height: '35px' }}>{materialId}</td>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        </div>


        <div className="cantidad2GG">
          <table className="cantidad-tableGG">
            <thead>
              <tr>
                <th style={{ fontFamily: 'lato' }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: materiales.length }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="Cantidad1GG">
                      <input
                        style={{ backgroundColor: '#f5f6fa', color: '#7c7d7f', fontFamily: 'Lato' }}
                        type="number"
                        value={cantidades[index]}
                        onChange={(e) => handleCantidadChange(index, e)}
                        placeholder="Ingrese un número"

                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        
        <label className="fechaGG-wrapper">
          <div className="fechaGG">Fecha</div>
        </label>

        <div className="div-GG1">
          <input
            className="overlap-groupGG1 text-wrapperGG1 fechaGG1"
            style={{ width: '130px', zIndex: '1' }}
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}

          />
          <div className='calendarGG' style={{ pointerEvents: 'none', zIndex: '2' }} >
            <MdCalendarMonth color='#069877' />
          </div>
        </div>

        <div className="div-GG2">

          <input
            className="overlap-groupGG1 text-wrapperGG1"
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
            placeholder="Archivo de Imagen"
          />
        </div>

        <div className="div-GG4">

          <input
            style={{ backgroundColor: '#f5f6fa' }}
            className="overlap-groupGG2 text-wrapperGG1"
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>

        <div className="GESTOR-GESTOR4">
          <label className="gestorGG-wrapper">
            <div className="gestor">Ubicación</div>
          </label>
          <select
            className="selectoutlineGU"
            style={{ width: '250px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          >
            <option value="">Selecciona punto de Recolección</option>
            {puntosRecoleccion.map((punto, index) => (
              <option key={index} value={punto}>
                {punto}
              </option>
            ))}
          </select>
        </div>



        <div className="errorGG">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="boxGG">
          <div className="CRGG">
            <button type="button" className="cancelarGG" onClick={handleCancelar}>
              <div className="ogGG">
                <div className="twGG">Cancelar</div>
              </div>
            </button>

            {editandoId ? (
              <button type="button" className="twregistrarGG" onClick={guardarEdicion}>
                <div className="dGG">Guardar Edición</div>
              </button>
            ) : (
              <button type="submit" className="twregistrarGG" onClick={handleSubmit}>
                <div className='oGG'>
                  <div className="dGG">Registrar</div>
                </div>
              </button>
            )}

          </div>
        </div>
      </form>


      <div className="labGG">
        <div className="textlGG">Registros</div>
      </div>

      <div className='registrosGG'>
        <div className="box4GG">
          <div className="group4GG">
            <ul className="uliGG">
              {registros.slice(-5).map((registro) => (
                <li key={registro.id} className="registroGG">
                  <div className="text-wrapper-7-GG"> Gestor Realiza </div>
                  <span className="spanGG">{registro.gestor_realiza}</span>

                  <div className="div2GG"> Gestor Recibe </div>
                  <span className="span2GG">{registro.gestor_recibe}</span>


                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarGestorGestor;

