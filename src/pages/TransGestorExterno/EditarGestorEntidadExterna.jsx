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
  const [gestorIds, setGestorIds] = useState([]); // Agregado gestorIds

  useEffect(() => {
    // Aquí puedes realizar una solicitud para cargar los datos del registro con el ID especificado
    // Usando la variable 'id' que proviene de los parámetros de la URL.
    // Llena el estado 'formData' con los datos del registro.

    // También, realiza una solicitud para cargar los IDs de los gestores.
    fetch('http://localhost:3000/gestor') // Reemplaza 'gestores' con tu ruta correcta
      .then((response) => response.json())
      .then((data) => setGestorIds(data.map((gestor) => gestor.id)))
      .catch((error) => console.error('Error al obtener la lista de gestores:', error));
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
    // Realiza una solicitud para actualizar el registro con los datos de 'formData'.
    // Usa 'id' para identificar el registro que se está editando.

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
        <div className="form-group">
          <label>Material</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Cantidad</label>
          <input
            type="number"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
          />
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
