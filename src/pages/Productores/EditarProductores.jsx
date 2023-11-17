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
    materiales_recolectados: '',
    cantidad: '',
  });

  useEffect(() => {
    const fetchProductorDetails = async () => {
      try {
        const productorDetails = await getProductorDetails(id);
        const formDataWithCantidades = mapDataToFormDataWithCantidades(productorDetails);
        setFormData(formDataWithCantidades);
      } catch (error) {
        console.error('Error al cargar los detalles del productor:', error);
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

  const handleGuardarCambios = () => {
    navigate('/productores');

    const actualizarProductor = async () => {
      try {
        const response = await fetch(`http://localhost:3000/productor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            cantidad: getCantidadesString(),
          }),
        });

        if (response.ok) {
          navigate('/productores');
        } else {
          const responseData = await response.json();
          console.error('Error al actualizar el productor:', responseData.error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const getProductorDetails = async (productId) => {
    try {
      const response = await fetch(`http://localhost:3000/productor/${productId}`);
      
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al cargar los detalles del productor');
      }
    } catch (error) {
      console.error('Error al obtener los detalles del productor:', error);
      throw error;
    }
  };
  

  const mapDataToFormDataWithCantidades = (data) => {
    if (!data) {
      return {};
    }
  
    const cantidadesArray = (data.cantidad || '').split(',').map(str => str.trim());
  
    return {
      ...data,
      cantidad: '',
      nombre: data.nombre || '',
      correo: data.correo || '',
      nit: data.nit || 0,
      telefono: data.telefono || 0,
      direccion: data.direccion || '',
      papel: cantidadesArray[0] || '',
      carton: cantidadesArray[1] || '',
      vidrio: cantidadesArray[2] || '',
      plasticoRigido: cantidadesArray[3] || '',
      plasticoFlexible: cantidadesArray[4] || '',
    };
  };

const getCantidadesString = (formData) => {
  const cantidades = [
    formData.papel || 0,
    formData.carton || 0,
    formData.vidrio || 0,
    formData.plasticoRigido || 0,
    formData.plasticoFlexible || 0,
  ];

  const cantidadesString = cantidades.map(String).join(', ');

  return cantidadesString;
};




  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de productores</h2>
      <form onSubmit={handleGuardarCambios}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
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
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Papel</td>
              </tr>
              <tr>
                <td>Cartón</td>
              </tr>
              <tr>
                <td>Vidrio</td>
              </tr>
              <tr>
                <td>Plástico Rígido</td>
              </tr>
              <tr>
                <td>Plástico Flexible</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <table>
            <thead>
              <tr>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    name="papel"
                    value={formData.papel || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="carton"
                    value={formData.carton || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="vidrio"
                    value={formData.vidrio || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="plasticoRigido"
                    value={formData.plasticoRigido || ''}
                    onChange={handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="plasticoFlexible"
                    value={formData.plasticoFlexible || ''}
                    onChange={handleInputChange}
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
            Salir
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProductores;

