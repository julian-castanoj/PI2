import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/registrarTransacciones.css';
import { MdCalendarMonth } from "react-icons/md";

const RegistrarTransacciones = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gestor_realiza: '',
    transformador: '',
    material: '',
    cantidad: '',
    fecha: '',
    archivoImagen: null,
    descripcion: '',
    ubicacion: '',
    gestorRealizaId: null,
    transformadorRecibeId: null,
  });

  const [registros, setRegistros] = useState([]);
  const [trasformadores, setTrasformadores] = useState([]);
  const [gestores, setGestores] = useState([]);
  const [message, setMessage] = useState(null);
  const [materialesComunesString, setMaterialesComunesString] = useState('');
  const [materiales, setMateriales] = useState([]);
  const [materialesString, setMaterialesString] = useState([]);

  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);
  const [cantidades, setCantidades] = useState(Array.from({ length: materiales.length }, () => ''));

  const fetchData = useCallback(async () => {
    try {
      const [transaccionesResponse, gestoresResponse, transformadoresResponse] = await Promise.all([
        fetch('https://backend-ac-production.up.railway.app/transacciones'),
        fetch('https://backend-ac-production.up.railway.app/gestor'),
        fetch('https://backend-ac-production.up.railway.app/transformador'),
      ]);

      if (transaccionesResponse.ok && gestoresResponse.ok && transformadoresResponse.ok) {
        const [transaccionesData, gestoresData, transformadoresData] = await Promise.all([
          transaccionesResponse.json(),
          gestoresResponse.json(),
          transformadoresResponse.json(),
        ]);

        setRegistros(transaccionesData);
        setGestores(gestoresData);
        setTrasformadores(transformadoresData);
      } else {
        console.error('Error al cargar datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


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
      fetch(`https://backend-ac-production.up.railway.app/gestor/${parsedId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.materiales_recolectados) {
            const materialList = data.materiales_recolectados.split(',').map((materialId) => materialId.trim());
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

    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);

      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`https://backend-ac-production.up.railway.app/gestor/${parsedId}`);

          if (response.ok) {
            const data = await response.json();
            

            setFormData((prevFormData) => ({
              ...prevFormData,
              gestorRealizaId: selectedId,
              gestor_id: data.id,
            }));

            console.log("Estado actualizado después de seleccionar el gestor:", formData);

            fetchMaterials(parsedId);
          } else {
            console.error('Error al obtener los detalles del gestor realiza:', response.status);
            console.error('Respuesta del servidor:', await response.text());
          }
        } catch (error) {
          console.error('Error al obtener los detalles del gestor realiza:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };


  const handleTransformadorRecibeIdChange = async (e) => {
    
    const selectedId = e.target.value;

    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);

      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`https://backend-ac-production.up.railway.app/transformador/${parsedId}`);

          if (response.ok) {
            const data = await response.json();

            setFormData((prevFormData) => ({
              ...prevFormData,
              transformadorRecibeId: selectedId,
              transformador_id: parsedId,
            }));

            // Otras actualizaciones o lógica que necesites realizar
          } else {
            console.error('Error al obtener los detalles del transformador recibe:', response.status);
          }
        } catch (error) {
          console.error('Error al obtener los detalles del transformador recibe:', error);
        }
      } else {
        console.error('El ID seleccionado no es válido:', selectedId);
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    


    // Eliminamos la confirmación
    // if (window.confirm('¿Estás seguro de que deseas enviar el formulario?')) {

    const numericTransformadorRecibe = isNaN(formData.transformador_id)
      ? formData.transformador_id
      : parseFloat(formData.transformador);

    try {
      const requestBody = {
        gestor_realiza: formData.gestor_id,
        transformador: formData.transformador_id,
        material: materiales.join(', '),
        cantidad: formData.cantidad,
        fecha: formData.fecha,
        archivoImagen: formData.archivoImagen,
        descripcion: formData.descripcion,
        ubicacion: formData.ubicacion,
        materialesComunes: materialesComunesString,

      };
      console.log("Materiales comunes antes de setFormData:", materialesComunesString);
      console.log("Materiales comunes antes de setFormData: ", materialesComunesString);



      setFormData((prevFormData) => ({
        ...prevFormData,
        gestor_realiza: formData.gestor_id,
        transformador: formData.transformador_id, // Usa numericTransformadorRecibe aquí
        ubicacion: formData.ubicacion,
        material: materialesComunesString,
        materialesComunes: materialesComunesString,
      }));

      console.log("Nuevo estado después de setFormData:", formData);
      console.log("Nuevo estado después de setFormData: ", formData);

      
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
        setMessage('Registro exitoso');

        setMateriales([]);
        setCantidades(Array.from({ length: materiales.length }, () => ''));

        setFormData({
          //gestor_realiza: '',
          //transformador_id: null,
          material: '',
          cantidad: '',
          fecha: '',
          //transformadorRecibeId: null,
          descripcion: '',
          ubicacion: '',
          gestorRealizaId: '',
          transformadorRecibeId: '',
          gestor_realiza: '',
          transformador: '',

        });

        setMessage('Registro exitoso', message);
        fetchData();
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

  };


  const handleCancelar = () => {
    navigate('/transacciones');
  };

  const fetchDireccionPrincipal = (transformadorId) => {
    fetch(`https://backend-ac-production.up.railway.app/transformador/${transformadorId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.direccion_principal) {
          const direccionPrincipal = data.direccion_principal;

          console.log('Direccion Principal:', direccionPrincipal);
        } else {
          console.log('No se encontró la dirección principal en la respuesta:', data);
        }
      })
      .catch((error) => console.error('Error al obtener la dirección principal:', error));
  };

  useEffect(() => {
    
    if (formData.gestor_id && formData.transformador_id) {
      const gestor = gestores.find((g) => g.id === formData.gestor_id);
      const transformador = trasformadores.find((t) => t.id === formData.transformador_id);

      

      if (gestor && transformador && gestor.materiales_recolectados && transformador.materiales_recolectados) {
        const gestorMaterials = gestor.materiales_recolectados.split(',').map((material) => material.trim());
        const transformadorMaterials = transformador.materiales_recolectados.split(',').map((material) => material.trim());
        const commonMaterials = gestorMaterials.filter((material) => transformadorMaterials.includes(material));

        setMateriales(commonMaterials);
        setCantidades(Array.from({ length: commonMaterials.length }, () => ''));

        const materialesComunesString = commonMaterials.join(', ');
        console.log("Common materials en useEffect:", commonMaterials);
        console.log("Materiales comunes en useEffect:", materialesComunesString);

        setMaterialesComunesString(materialesComunesString);

        console.log('Materiales Comunes String:', materialesComunesString);
        console.log('Estado Final:', formData);

        
        setFormData((prevFormData) => ({
          ...prevFormData,
          material: materialesComunesString,
          materialesComunes: materialesComunesString,
        }));

        fetchDireccionPrincipal(formData.transformador_id);
      }
    }
  }, [formData.gestor_id, formData.transformador_id, gestores, trasformadores]);


  

  return (
    <div className="registrar-miembros-page2">

      <form onSubmit={handleSubmit}>


        <div className="GESTORTRANSFORMADOR">
          <div className="contenido-wrapperGT">
            <div className="contenidoGT">
              <div className="formGT">
                <div className="groupGT">
                  <div className="text-wrapperGT">Información</div>
                </div>
              </div>
              <p className="divGT">Formulario de registro de transacción - Gestor Transformador</p>
            </div>
          </div>
        </div>

        <div className="GESTOR-TRANSFORMADOR1">
          <label className="gestorgt-wrapper">
            <div className="gestorgt">ID - Gestor realiza</div>
          </label>
          <select
            className="selectoutlineGT"
            style={{ width: '210px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="gestorRealizaId"
            value={formData.gestorRealizaId}
            onChange={handleGestorRealizaIdChange}
            onBlur={handleGestorRealizaIdChange}
          >
            <option value="">Selecciona un gestor realiza</option>
            {gestores.map((gestor) => (
              <option key={gestor.id} value={gestor.id}>
                {`${gestor.id} - ${gestor.nombre}`}
              </option>
            ))}
          </select>
        </div>

        <div className="GESTOR-TRANSFORMADOR2">
          <label className="gestorgtr-wrapper">
            <div className="gestorgtr">Transformador recibe</div>
          </label>
          <select
            className="selectoutlineGTR"
            style={{ width: '210px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="transformadorRecibeId"
            value={formData.transformadorRecibeId}
            onChange={handleTransformadorRecibeIdChange}
            onBlur={handleTransformadorRecibeIdChange}
          >
            <option value="">selecciona un transformador recibe</option>
            {trasformadores.map((transformador) => (
              <option key={transformador.id} value={transformador.id}>
                {`${transformador.id} - ${transformador.representante_legal}`}
              </option>
            ))}
          </select>
        </div>


        <div className="material2GT">
          <div className="materialNGT">
            <label>Materiales Asociados</label>
          </div>
          <table className="materiales-tableGT">
            <thead>
              <div className="material1GT">
                <tr>
                  <th></th>
                </tr>
              </div>
            </thead>
            <tbody>
              <div className="materialGT" >
                {materiales.map((materialId, index) => (
                  <tr key={index}>
                    <td style={{ height: '35px' }}>{materialId}</td>
                  </tr>
                ))}
              </div>
            </tbody>
          </table>
        </div>


        <div className="cantidad2GT">
          <table className="cantidad-tableGT">
            <thead>
              <tr>
                <th style={{ fontFamily: 'lato' }}>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: materiales.length }).map((_, index) => (
                <tr key={index}>
                  <td>
                    <div className="Cantidad1GT">
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



        <label className="fechaGT-wrapper">
          <div className="fechaGT">Fecha</div>
        </label>

        <div className="div-GT1">
          <input
            className="overlap-groupGT1 text-wrapperGT1 fechaGT1"
            style={{ width: '130px', zIndex: '1' }}
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}

          />
          <div className='calendarGT' style={{ pointerEvents: 'none', zIndex: '2' }} >
            <MdCalendarMonth color='#069877' />
          </div>
        </div>

        <div className="div-GT2">

          <input
            className="overlap-groupGT1 text-wrapperGT1"
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
            placeholder="Archivo de Imagen"
          />
        </div>

        <div className="div-GT4">

          <input
            style={{ backgroundColor: '#f5f6fa' }}
            className="overlap-groupGT2 text-wrapperGT1"
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>

        <div className="div-GT5">
  <label className="overlap-groupGT2 text-wrapperGT1 dr1">Direccion principal</label>
  <span>
    <div className="overlap-groupGT2 text-wrapperGT1 dr2">
      {/* Verifica si hay un transformador seleccionado */}
      {formData.transformadorRecibeId &&
        trasformadores
          .filter((transformador) => transformador.id === parseInt(formData.transformadorRecibeId))
          .map((transformador) => (
            <span key={transformador.id}>{transformador.direccion_principal}</span>
          ))}
    </div>
  </span>
</div>

        <div className="errorGT">
          {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>

        <div className="boxGT">
          <div className="CRGT">

            <button type="button" className="cancelarGT" onClick={handleCancelar}>
              <div className="ogGT">
                <div className="twGT">Cancelar</div>
              </div>
            </button>


            <button type="submit" className="twregistrarGT" onClick={handleSubmit}>
              <div className='oGT'>
                <div className="dGT">Registrar</div>
              </div>
            </button>


          </div>
        </div>

      </form>


      <div className="labGT">
        <div className="textlGT">Registros</div>
      </div>

      <div className='registrosGT'>
        <div className="box4GT">
          <div className="group4Gt">
            <ul className="uliGT">
              {registros.slice(-5).map((registro) => (
                <li key={registro.id} className="registroGT">
                  <div className="text-wrapper-7-GT"> Gestor </div>
                  <span className="spanGT">{registro.gestor_recibe}</span>

                  <div className="div2GT"> Transformador </div>
                  <span className="span2GT">{registro.transormador}</span>


                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
};


export default RegistrarTransacciones;
