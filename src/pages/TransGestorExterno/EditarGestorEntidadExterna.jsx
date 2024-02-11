import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditarGestorEntidadExterna = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gestor_id: 0,
    material: '',
    cantidad: 0,
    fecha: '',
    archivoImagen: null,
    entidad_externa: '',
    descripcion: '',
    ubicacion: '',
  });
  const [gestorIds, setGestorIds] = useState([]);
  const [materiales, setMateriales] = useState([]);
  const [cantidades, setCantidades] = useState([]);


  useEffect(() => {
    fetch('http://localhost:3000/materiales')
      .then((response) => response.json())
      .then((data) => setMateriales(data))
      .catch((error) => console.error('Error al obtener la lista de materiales:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const guardarEdicion = async () => {


    const form = new FormData();
    for (const key in formData) {
      if (key === 'archivoImagen') {
        form.append(key, formData[key], formData[key].name);
      } else {
        form.append(key, formData[key]);
      }
    }

    const requestOptions = {
      method: 'PUT',
      body: form,
    };

    try {
      const response = await fetch(`http://localhost:3000/transaccionge/${id}`, requestOptions);

      if (response.ok) {
        console.log('Edición exitosa');
        navigate('/gestorEntidadExterna');
      } else {
        console.error('Error al editar el registro');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const handleCancelar = () => {
    navigate('/gestorEntidadExterna');
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

  return (
    <div className="editar-registro-page">
      <h2>Editar Registro de Transacción - Entidad Externa</h2>
      <form>
        <div className="form-group">
          <label>Gestor ID</label>
          <select name="gestor_id" value={formData.gestor_id} onChange={handleChange}>
            <option value={0}>Selecciona un gestor</option>
            {gestorIds.map((gestorId) => (
              <option key={gestorId} value={gestorId}>
                {gestorId}
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
                {materiales.map((material, index) => (
                  <tr key={index}>
                    <td>{material}</td>
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
                {cantidades.map((cantidad, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="number"
                        value={cantidad}
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
          <label>Entidad Externa</label>
          <input
            type="text"
            name="entidad_externa"
            value={formData.entidad_externa}
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
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="button" className="submit-button" onClick={guardarEdicion}>
            Guardar Edición
          </button>
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarGestorEntidadExterna;
