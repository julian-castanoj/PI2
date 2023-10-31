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
    forma_participacion: '',
    materiales_gestiona: {
      papel: false,
      carton: false,
      vidrio: false,
      plasticoRigido: false,
      plasticoFlexible: false,
    },
    peso_total_reutilizable: 0,
    peso_total_no_reutilizable: 0,
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
    const { name, value, type, checked } = e.target;
    if (type === 'text' || type === 'number') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        materiales_gestiona: {
          ...formData.materiales_gestiona,
          [name]: checked,
        },
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
          <label>Forma de Participación</label>
          <input type="text" name="forma_participacion" value={formData.forma_participacion} onChange={handleChange} />
        </div>


      {/*  <div className="form-group">
          <label>Materiales que Gestiona</label>
          <div className="checkbox-group">
            <label>
              Papel
              <input
                type="checkbox"
                name="papel"
                checked={formData.materiales_gestiona.papel}
                onChange={handleChange}
              />
            </label>
            <label>
              Cartón
              <input
                type="checkbox"
                name="carton"
                checked={formData.materiales_gestiona.carton}
                onChange={handleChange}
              />
            </label>
            <label>
              Vidrio
              <input
                type="checkbox"
                name="vidrio"
                checked={formData.materiales_gestiona.vidrio}
                onChange={handleChange}
              />
            </label>
            <label>
              Plástico Rígido
              <input
                type="checkbox"
                name="plasticoRigido"
                checked={formData.materiales_gestiona.plasticoRigido}
                onChange={handleChange}
              />
            </label>
            <label>
              Plástico Flexible
              <input
                type="checkbox"
                name="plasticoFlexible"
                checked={formData.materiales_gestiona.plasticoFlexible}
                onChange={handleChange}
              />
            </label>
          </div>
        </div> */}

        
        <div className="form-group">
          <label>Peso Total Reutilizable</label>
          <input
            type="number"
            name="peso_total_reutilizable"
            value={formData.peso_total_reutilizable}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Peso Total No Reutilizable</label>
          <input
            type="number"
            name="peso_total_no_reutilizable"
            value={formData.peso_total_no_reutilizable}
            onChange={handleChange}
          />
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
