import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditarTransformador = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    razon_social: '',
    representante_legal: '',
    nit: 0,
    telefono: 0,
    direccion_principal: '',
    direccion_planta: '',
    departamento: '',
    municipio: '',
    correo: '',
    materiales: ''/*{
      Papel: { reciclaje: false, valoracion: false, gastoEnergetico: false, otro: false },
      Carton: { reciclaje: false, valoracion: false, gastoEnergetico: false, otro: false },
      Vidrio: { reciclaje: false, valoracion: false, gastoEnergetico: false, otro: false },
      PlasticoRigido: { reciclaje: false, valoracion: false, gastoEnergetico: false, otro: false },
      PlasticoFlexible: { reciclaje: false, valoracion: false, gastoEnergetico: false, otro: false },
    }*/,
    registro_anla: false,
    numero_certificado: 0,
  });

  useEffect(() => {
    const fetchTransformadorDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/transformador/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Error al cargar los detalles del transformador');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };
    fetchTransformadorDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    if (name in formData) {
      setFormData({
        ...formData,
        [name]: newValue,
      });
    } else if (name in formData.materiales) {
      setFormData({
        ...formData,
        materiales: {
          ...formData.materiales,
          [name]: {
            ...formData.materiales[name],
            [value]: newValue,
          },
        },
      });
    }
  };

  const handleGuardarCambios = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
  
    try {
      const response = await fetch(`http://localhost:3000/transformador/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate('/transformadores');
      } else {
        const responseData = await response.json();
        console.error('Error al actualizar el transformador:', responseData.error);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

  const handleCancelar = () => {
    navigate('/transformadores');
  };

  
  
  const materiales = [
    'Papel',
    'Cartón',
    'Vidrio',
    'Plástico Rígido',
    'Plástico Flexible',
  ];

  const handleMaterialChange = (e) => {
    const { name, checked } = e.target;

    // Asegúrate de que formData.material_produce tenga un valor definido
    const currentMaterialProduce = formData.material_produce || '';
    let updatedMaterialesSeleccionados = currentMaterialProduce.split(',').map(material => material.trim());

    if (checked) {
      if (!updatedMaterialesSeleccionados.includes(name)) {
        updatedMaterialesSeleccionados.push(name.trim());
      }
    } else {
      const index = updatedMaterialesSeleccionados.indexOf(name);
      if (index !== -1) {
        updatedMaterialesSeleccionados.splice(index, 1);
      }
    }

    updatedMaterialesSeleccionados = updatedMaterialesSeleccionados.filter(material => material.length > 0);

    const materialesRecolectadosString = updatedMaterialesSeleccionados.join(', ');

    setFormData({
      ...formData,
      material_produce: materialesRecolectadosString,
    });
  };







  return (
    <div className="registrar-miembros-page">
      <h2>Formulario de Registro de Transformadores</h2>
      <form onSubmit={(e) => handleGuardarCambios(e)}>
        <div className="form-group">
          <label>Razón Social</label>
          <input
            type="text"
            name="razon_social"
            value={formData.razon_social}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Representante Legal</label>
          <input
            type="text"
            name="representante_legal"
            value={formData.representante_legal}
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
          <label>Dirección Principal</label>
          <input
            type="text"
            name="direccion_principal"
            value={formData.direccion_principal}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Dirección Planta</label>
          <input
            type="text"
            name="direccion_planta"
            value={formData.direccion_planta}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departamento</label>
          <input
            type="text"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
          />
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
                      checked={(formData.material_produce || '').includes(material)}
                      onChange={handleMaterialChange}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* <div className="form-group">
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Reciclaje</th>
                <th>Valoración</th>
                <th>Gasto Energético</th>
                <th>Otro</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(formData.materiales).map((material) => (
                <tr key={material}>
                  <td>{material}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].reciclaje}
                      onChange={handleChange}
                      name={material}
                      value="reciclaje"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].valoracion}
                      onChange={handleChange}
                      name={material}
                      value="valoracion"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].gastoEnergetico}
                      onChange={handleChange}
                      name={material}
                      value="gastoEnergetico"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={formData.materiales[material].otro}
                      onChange={handleChange}
                      name={material}
                      value="otro"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
              </div>  */}

        <div className="form-group">
          <label>Registro ANLA</label>
          <select
            name="registro_anla"
            value={formData.registro_anla}
            onChange={(e) => setFormData({ ...formData, registro_anla: e.target.value })}
          >
            <option value="NO">NO</option>
            <option value="SI">SI</option>
          </select>
        </div>

        {formData.registro_anla === "SI" ? (
          <div className="form-group">
            <label>Número de Certificado</label>
            <input
              type="number"
              name="numero_certificado"
              value={formData.numero_certificado}
              onChange={handleChange}
            />
          </div>
        ) : null}
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

export default EditarTransformador;