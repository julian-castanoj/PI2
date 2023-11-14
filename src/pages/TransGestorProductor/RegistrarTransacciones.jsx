import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrarTransacciones = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gestor_id: '',
    transformador_id: '',
    materialId: '',
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
  const [materialesString, setMaterialesString] = useState([]);
  const [materiales, setMateriales] = useState([]);
  
  const [puntosRecoleccion, setPuntosRecoleccion] = useState([]);
  const [cantidades, setCantidades] = useState(Array.from({ length: materiales.length }, () => ''));

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3000/transacciongt');
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

  useEffect(() => {
    if (formData.gestor_id && formData.transformador_id) {
      const commonMaterials = gestores
        .find((gestor) => gestor.id === formData.gestor_id)?.materiales_recolectados
        .split(',')
        .map((material) => material.trim())
        .filter((material) =>
          gestores.find((gestor) => gestor.id === formData.transformador_id)?.materiales_recolectados
            .split(',')
            .map((m) => m.trim())
            .includes(material)
        );

      setMateriales(commonMaterials);
      setCantidades(Array.from({ length: commonMaterials.length }, () => ''));
    }
  }, [formData.gestor_id, formData.transformador_id, gestores]);

  const handleMaterialChange = (e) => {
    const selectedMaterial = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      materialId: selectedMaterial,
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
    const selectedId = e.target.value;
    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/gestor/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              gestor_id: data.id,
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

  const handleTransformadorRecibeIdChange = async (e) => {
    const selectedId = e.target.value;
    if (selectedId !== '0') {
      const parsedId = parseInt(selectedId);
      if (!isNaN(parsedId)) {
        try {
          const response = await fetch(`http://localhost:3000/transformador/${parsedId}`);
          if (response.ok) {
            const data = await response.json();
            setFormData({
              ...formData,
              transformador_id: data.id,
            });
            fetchDireccionPrincipal(parsedId);
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
    console.log(materialesString);

    if (window.confirm('¿Estás seguro de que deseas enviar el formulario?')) {
      const form = new FormData();

      for (const key in formData) {
        if (formData[key] !== null) {
          if (key === 'archivoImagen') {
            form.append(key, formData[key], formData[key].name);
          } else if (key === 'cantidad') {
            form.append('cantidad', formData[key]);
          } else if (key === 'materialId') {
            // No append materialId here
          } else if (key === 'gestor_id') {
            form.append('gestor_id', formData[key]);
          } else if (key === 'transformador_id') {
            form.append('transformador_id', formData[key]);
          } else {
            form.append(key, formData[key]);
          }
        }
      }

      // Convierte el array 'materiales' a una cadena y agrégalo al formulario
      const materialesString = materiales.join(', ');
      form.append('materialId', materialesString);

      const requestOptions = {
        method: 'POST',
        body: form,
      };

      try {
        const response = await fetch('http://localhost:3000/transacciongt', requestOptions);

        if (response.ok) {
          console.log('Registro exitoso');
          setMessage('Registro exitoso');
          fetchData();

          setFormData({
            gestor_id: '',
            transformador_id: '',
            materialesString: '',
            cantidad: '',
            fecha: '',
            archivoImagen: null,
            descripcion: '',
            ubicacion: '',
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
    } else {
      console.log('Envío del formulario cancelado');
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
          // Usa la variable direccionPrincipal como necesites
          console.log('Direccion Principal:', direccionPrincipal);
        } else {
          console.log('No se encontró la dirección principal en la respuesta:', data);
        }
      })
      .catch((error) => console.error('Error al obtener la dirección principal:', error));
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transacción - Transformador</h2>
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
            name="trasformadorRecibeId"
            value={formData.trasformadorRecibeId}
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
          <label>Ubicación</label>
          <select
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

        {message && <p style={{ color: message.startsWith('Error') ? 'red' : 'green' }}>{message}</p>}

        <div className="form-group">
          <button type="submit" className="submit-button">
            Registrar
          </button>
          
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>

    </div>

  );
};


export default RegistrarTransacciones;
