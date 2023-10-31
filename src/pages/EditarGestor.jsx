import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';


const EditarGestor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: '',
    nit: '',
    telefono: '',
    direccion: '',
    estado: false,
    municipio: '',
    categoria_municipio: '',
    correo: '',
    toneladas_recolectadas: '',
    puntos_recoleccion: '',
    mecanismos_recoleccion: '',
    materiales_recolectados: '',
  });

  useEffect(() => {
    
    const fetchGestorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/gestor/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error al cargar los detalles del gestor');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchGestorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGuardarCambios = () => {
    navigate('/gestores');
    const actualizarGestor = async () => {
      try {
        const response = await fetch(`http://localhost:3000/gestor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          // Cambios exitosos, puedes redirigir
          navigate('/gestores'); // Redirige a /gestores después de guardar cambios
        } else {
          // La respuesta no fue exitosa, muestra un mensaje de error
          const responseData = await response.json(); // Si la API devuelve detalles del error
          console.error('Error al actualizar el gestor:', responseData.error);
          // Además, podrías mostrar el mensaje de error en tu interfaz de usuario
          // Ejemplo: setErrorMsg(responseData.error);
        }
      } catch (error) {
        // Error al realizar la solicitud
        console.error('Error al realizar la solicitud:', error);
      }
    };
  
    actualizarGestor();
  };
  

  const handleCancelar = () => { 
    navigate('/gestores');
  };
  

  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Edición de Gestores</h2>
      <form onSubmit={handleGuardarCambios}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Capacidad</label>
          <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} />
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
          <label>Estado</label>
          <input type="checkbox" name="estado" checked={formData.estado} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Municipio</label>
          <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Categoría Municipio</label>
          <input type="text" name="categoria_municipio" value={formData.categoria_municipio} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Correo</label>
          <input type="text" name="correo" value={formData.correo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Capacidad total que gestion</label>
          <input
            type="text"
            name="toneladas_recolectadas"
            value={formData.toneladas_recolectadas}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Puntos de Recolección</label>
          <input
            type="text"
            name="puntos_recoleccion"
            value={formData.puntos_recoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Mecanismos de Recolección</label>
          <input
            type="text"
            name="mecanismos_recoleccion"
            value={formData.mecanismos_recoleccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Materiales Recolectados</label>
          <input
            type="text"
            name="materiales_recolectados"
            value={formData.materiales_recolectados}
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

export default EditarGestor;
