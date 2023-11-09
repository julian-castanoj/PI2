import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarGestor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: '',
    capacidad: 0,
    nit: 0,
    telefono: 0,
    direccion: '',
    estado: true,
    categoria_municipio: '',
    municipio: '',
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

  // Función para manejar el cambio en los puntos de recolección
  const handlePuntosRecoleccionChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      puntos_recoleccion: value,
    });
  };

  // Función para manejar el cambio en los materiales recolectados
  const handleMaterialesRecolectadosChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      materiales_recolectados: value,
    });
  };

  // Funciones para manejar los puntos de recolección
  const handleEliminarPuntoRecoleccion = (index) => {
    const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
    nuevosPuntosRecoleccion.splice(index, 1);
    const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
    setFormData({
      ...formData,
      puntos_recoleccion: nuevosPuntosRecoleccionString,
    });
  };

  const handleAgregarPuntoRecoleccion = () => {
    const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
    nuevosPuntosRecoleccion.push('');
    const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
    setFormData({
      ...formData,
      puntos_recoleccion: nuevosPuntosRecoleccionString,
    });
  };

  
  const materiales = [
    'Papel',
    'Cartón',
    'Vidrio',
    'Plástico Rígido',
    'Plástico Flexible',
  ];

  // Función para manejar el cambio en los materiales recolectados
  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;
    let materialesSeleccionados = formData.materiales_recolectados.split(', ');
    if (checked) {
      materialesSeleccionados.push(name);
    } else {
      materialesSeleccionados = materialesSeleccionados.filter((material) => material !== name);
    }
    const materialesSeleccionadosString = materialesSeleccionados.join(', ');
    setFormData({
      ...formData,
      materiales_recolectados: materialesSeleccionadosString,
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
          navigate('/gestores');
        } else {
          const responseData = await response.json();
          console.error('Error al actualizar el gestor:', responseData.error);
        }
      } catch (error) {
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
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Correo</label>
          <input
            type="text"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>NIT</label>
          <input
            type="number"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Teléfono</label>
          <input
            type="number"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Capacidad</label>
          <input
            type="number"
            name="capacidad"
            value={formData.capacidad}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Estado</label>
          <select
            name="estado"
            value={formData.estado ? "activo" : "inactivo"}
            onChange={(e) => setFormData({ ...formData, estado: e.target.value === "activo" })}
          >
            <option value="activo">Activo</option>
            <option value="inactivo">Inactivo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Municipio</label>
          <input
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Categoría Municipio</label>
          <select
            name="categoria_municipio"
            value={formData.categoria_municipio}
            onChange={handleChange}
          >
            <option value="1">Categoría 1</option>
            <option value="2">Categoría 2</option>
            <option value="3">Categoría 3</option>
            <option value="4">Categoría 4</option>
            <option value="5">Categoría 5</option>
            <option value="6">Categoría 6</option>
          </select>
        </div>

        <div className="form-group">
          <label>Capacidad total que gestionas</label>
          <input
            type="text"
            name="toneladas_recolectadas"
            value={formData.toneladas_recolectadas}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Puntos de Recolección</label>
          <table>
            <thead>
              <tr>
                <th>Punto</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {formData.puntos_recoleccion.split(', ').map((punto, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      name="puntos_recoleccion"
                      value={punto}
                      onChange={(e) => {
                        const nuevosPuntosRecoleccion = formData.puntos_recoleccion.split(', ');
                        nuevosPuntosRecoleccion[index] = e.target.value;
                        const nuevosPuntosRecoleccionString = nuevosPuntosRecoleccion.join(', ');
                        setFormData({
                          ...formData,
                          puntos_recoleccion: nuevosPuntosRecoleccionString,
                        });
                      }}
                    />
                  </td>
                  <td>
                    {formData.puntos_recoleccion.split(', ').length > 1 && (
                      <button
                        type="button"
                        className="eliminar-button"
                        onClick={() => handleEliminarPuntoRecoleccion(index)}
                      >
                        Eliminar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={handleAgregarPuntoRecoleccion}>
            Agregar Punto
          </button>
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
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Seleccionar</th>
              </tr>
            </thead>
            <tbody>
              {materiales.map((material) => (
                <tr key={material}>
                  <td>{material}</td>
                  <td>
                    <input
                      type="checkbox"
                      name={material}
                      checked={formData.materiales_recolectados.includes(material)}
                      onChange={handleMaterialChange}
                    />
                  </td>
                </tr>
              ))}
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

export default EditarGestor;

