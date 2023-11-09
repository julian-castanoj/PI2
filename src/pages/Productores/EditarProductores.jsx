import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarProductores = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    
    materiales_recolectados: [],
  });

  useEffect(() => {
    const fetchProductorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productor/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error al cargar los detalles del productor');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchProductorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'text' || type === 'number') {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleMaterialChange = (e) => {
    const { name, value } = e.target;
    const materiales = [...formData.materiales_recolectados];
    const materialIndex = materiales.findIndex((material) => material.material === name);

    if (materialIndex !== -1) {
      materiales[materialIndex].cantidad = value;
    } else {
      materiales.push({ material: name, cantidad: value });
    }

    setFormData({
      ...formData,
      materiales_recolectados: materiales,
    });
  };

  const handleGuardarCambios = () => {
    navigate('/productores');

    const actualizarProductor = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Cambios exitosos, puedes redirigir
          navigate('/productores'); // Redirige a /productores después de guardar cambios
        } else {
          const responseData = await response.json(); // Si la API devuelve detalles del error
          console.error('Error al actualizar el productor:', responseData.error);
          // Además, podrías mostrar el mensaje de error en tu interfaz de usuario
          // Ejemplo: setErrorMsg(responseData.error);
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    actualizarProductor();
  };

  const handleCancelar = () => {
    navigate('/productores');
  };

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Edición de Productores</h2>
      <form onSubmit={handleGuardarCambios}>
        <div className="form-group">
          <label>Correo</label>
          <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>NIT</label>
          <input type="number" name="nit" value={formData.nit} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Teléfono</label>
          <input type="number" name="telefono" value={formData.telefono} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Dirección</label>
          <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
        </div>
        
        <div className="form-group">
          <label>Materiales de empaques puestos en el mercado</label>
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Papel</td>
                <td>
                  <input
                    type="number"
                    name="papel"
                    value={(formData.materiales_recolectados && formData.materiales_recolectados.find((material) => material.material === 'papel')?.cantidad) || ''}

                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Cartón</td>
                <td>
                  <input
                    type="number"
                    name="carton"
                    value={(formData.materiales_recolectados && formData.materiales_recolectados.find((material) => material.material === 'carton')?.cantidad) || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Vidrio</td>
                <td>
                  <input
                    type="number"
                    name="vidrio"
                    value={(formData.materiales_recolectados && formData.materiales_recolectados.find((material) => material.material === 'vidrio')?.cantidad) || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Plástico Rígido</td>
                <td>
                  <input
                    type="number"
                    name="plasticoRigido"
                    value={(formData.materiales_recolectados && formData.materiales_recolectados.find((material) => material.material === 'plasticoRigido')?.cantidad) || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Plástico Flexible</td>
                <td>
                  <input
                    type="number"
                    name="plasticoFlexible"
                    value={(formData.materiales_recolectados && formData.materiales_recolectados.find((material) => material.material === 'plasticoFlexible')?.cantidad) || ''}
                    onChange={handleMaterialChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group">
          <button type="submit" className="submit-button">
            Guardar Cambios
          </button>
          <button type="button" className="register-button" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProductores;

