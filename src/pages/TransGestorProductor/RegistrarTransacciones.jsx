import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
      const response = await fetch('http://localhost:3000/transacciones');
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
    fetch('http://localhost:3000/gestor')
      .then((response) => response.json())
      .then((data) => setGestores(data))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
  }, []);

  useEffect(() => {
    fetchData();
    fetch('http://localhost:3000/transformador')
      .then((response) => response.json())
      .then((data) => setTrasformadores(data)) // Cambiado de setGestores a setTrasformadores
      .catch((error) => console.error('Error al obtener la lista de transformadores:', error));
  }, []);

  

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
      fetch(`http://localhost:3000/gestor/${parsedId}`)
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
    console.log("Cambio en el gestor realiza ID:", e.target.value);
    const selectedId = e.target.value;
    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
          setFormData((prevFormData) => ({
            ...prevFormData,
            gestor_id: data.id,
          }));
            
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

  const handleTransformadorRecibeIdChange = async (e) => {
    console.log("Cambio en el transformador recibe ID:", e.target.value);
    const selectedId = e.target.value;
  
    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);
  
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/transformador/${parsedId}`);
          
          if (response.ok) {
            const data = await response.json();
  
            setFormData((prevFormData) => ({
              ...prevFormData,
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
    console.log(formData);
  
  
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

    console.log("Enviando requestBody a la API: ", requestBody);
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      };
  
      const response = await fetch('http://localhost:3000/transacciones', requestOptions);
  
      if (response.ok) {
        console.log('Registro exitoso');
        setMessage('Registro exitoso');
        fetchData();
  
        setFormData({
          gestor_realiza: '',
          transformador_id: null,
          material: '',
          cantidad: '',
          fecha: '',
          transformadorRecibeId: null,
          descripcion: '',
          ubicacion: '',
          //
        });
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
    navigate('/gestorGestor');
  };

  const fetchDireccionPrincipal = (transformadorId) => {
    fetch(`http://localhost:3000/transformador/${transformadorId}`)
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
    console.log("Ejecutando useEffect...");
    if (formData.gestor_id && formData.transformador_id) {
      const gestor = gestores.find((g) => g.id === formData.gestor_id);
      const transformador = trasformadores.find((t) => t.id === formData.transformador_id);
  
      console.log('Gestor:', gestor);
      console.log('Transformador:', transformador);
  
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
  
        // Intentemos actualizar directamente formData.material y formData.materialesComunes
        setFormData((prevFormData) => ({
          ...prevFormData,
          material: materialesComunesString,
          materialesComunes: materialesComunesString,
        }));
  
        fetchDireccionPrincipal(formData.transformador_id);
      }
    }
  }, [formData.gestor_id, formData.transformador_id, gestores, trasformadores]);
  
  
  console.log("Renderizando componente...");

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Gestor - Transformador</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Gestor Realiza</label>
          <select
            name="gestorRealizaId"
            value={formData.gestorRealizaId}
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

        <div className="form-group">
          <label>Transformador Recibe</label>
          <select
            name="transformadorRecibeId"
            value={formData.transformadorRecibeId}
            onChange={handleTransformadorRecibeIdChange}
          >
            <option value="">Selecciona un transformador recibe</option>
            {trasformadores.map((transformador) => (
              <option key={transformador.id} value={transformador.id}>
                {`${transformador.id} - ${transformador.representante_legal}`}
              </option>
            ))}
          </select>
        </div>


        <div className="">
          <div className="">
            <label>Materiales Asociados</label>
            <table>
              <thead>
                <tr>
                  <th>Material</th>
                </tr>
              </thead>
              <tbody>
                {materiales.map((materialId, index) => (
                  <tr key={index}>
                    <td>{materialId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <label>Cantidades</label>
            <table>
              <thead>
                <tr>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: materiales.length }).map((_, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="number"
                        value={cantidades[index]}
                        onChange={(e) => handleCantidadChange(index, e)}
                        placeholder="Ingrese un número"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-group">
          <label>Fecha</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Archivo de Imagen</label>
          <input
            type="file"
            name="archivoImagen"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Direccion principal</label>
          <span>
            {trasformadores.map((transformador) => (
              <span key={transformador.direccion_principal}>
                {transformador.direccion_principal}
              </span>
            ))}
          </span>
        </div>

        {/*message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>*/}

        <div className="form-group">
          <button type="submit" className="submit-button">
            Registrar
          </button>

          <button type="button" className="register-button" onClick={handleCancelar}>
            Salir
          </button>
        </div>
      </form>

    </div>

  );
};


export default RegistrarTransacciones;
