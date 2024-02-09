import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/registrarTransformadores.css';

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
    materiales: '',
    registro_anla: false,
    numero_certificado: 0,
    material_produce: '',
    
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
    <div className="registrar-miembros-page2">

      <form onSubmit={(e) => handleGuardarCambios(e)}>

        <div className="TRANSFORMADORES-REGISTRO">
          <div className="overlap-wr">
            <div className="ov">
              <div className="contenidoT">
                <div className="overlap-gr">
                  <div className="formT">
                    <div className="divT">



                      <div className="overlap-gr-wrapper">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="representante_legal"
                          value={formData.representante_legal}
                          onChange={handleChange}
                          placeholder="Representante legal"
                        />
                      </div>


                      <div className="groupT">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="correo"
                          value={formData.correo}
                          onChange={handleChange}
                          placeholder="Correo"
                        />
                      </div>



                      <div className="groupT-2">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="number"
                          name="nit"
                          value={formData.nit}
                          onChange={handleChange}
                          placeholder="NIT"
                        />
                      </div>


                      <div className="groupT-3">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="number"
                          name="telefono"
                          value={formData.telefono}
                          onChange={handleChange}
                          placeholder='Teléfono'
                        />
                      </div>


                      <div className="overlap-2">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="direccion_principal"
                          value={formData.direccion_principal}
                          onChange={handleChange}
                          placeholder='Dirección principal'
                        />
                      </div>



                      <div className="overlap-3">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="direccion_planta"
                          value={formData.direccion_planta}
                          onChange={handleChange}
                          placeholder='Dirección planta'
                        />

                      </div>

                      <div className="overlap-4">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="departamento"
                          value={formData.departamento}
                          onChange={handleChange}
                          placeholder='Departamento'
                        />
                      </div>

                      <div className="overlap-5">
                        <input
                          className="div-wrapperT text-wrapperT"
                          type="text"
                          name="municipio"
                          value={formData.municipio}
                          onChange={handleChange}
                          placeholder='Municipio'
                        />
                      </div>





                    </div>

                  </div>
                  <p className="p">Formulario de edicion de Transformadores</p>
                  <div className="groupT-5">

                    <div className="div-wrapperT">
                      <input
                        className="div-wrapperT text-wrapperT"
                        type="text"
                        name="razon_social"
                        value={formData.razon_social}
                        onChange={handleChange}
                        placeholder="Razón social"
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="groupT-4">
            <div className="text-wrapperT-3">Información</div>
          </div>
        </div>




        <div className=" TRANSFORMADOR-REGISTRO1 ">
          <div className="overlap-group-wrappertr">
            <div className="overlap-grouptr">
              <div className="contenidotr">
                <div className="formtr">
                  <p className="text-wrapper-materiales-transforma">Materiales de empaques puestos en el mercado</p>

                  {materiales.map((material, index) => (
                    <div key={index}>

                      <div className="divtr">{material}</div>
                      <div className="text-wrapper-2tr">Seleccionar</div>
                      <input className="checkbox"
                        type="checkbox"
                        name={material}
                        checked={formData.material_produce.includes(material)}
                        onChange={handleMaterialChange}
                      />
                    </div>

                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className="TRANSFORMADOR-REGISTRO2">
          <label className="anla-wrapper">
            <div className="anla">Regitro ANLA</div>
          </label>
          <select
            className="selectoutline1"
            style={{ width: '130px', backgroundColor: '#f5f6fa', color: '#7c7d7f' }}
            name="registro_anla"
            value={formData.registro_anla}
            onChange={(e) => setFormData({ ...formData, registro_anla: e.target.value })}
          >
            <option value="NO">No</option>
            <option value="SI">Si</option>
          </select>

        </div>

        {formData.registro_anla === "SI" ? (
          <div className="overlap-6">
            <input
              className="div-wrapperT text-wrapperT"
              type="number"
              name="numero_certificado"
              value={formData.numero_certificado}
              onChange={handleChange}
              placeholder='Número de Certificado'
            />
          </div>

        ) : null}

        <div className="boxT">
          <div className="CRT">
            <button type="button" className="cancelarT" onClick={handleCancelar}>
              <div className="ogT">
                <div className="twT">Cancelar</div>
              </div>
            </button>


            <button type="submit" className="registrarT" >
              <div className="dT">Guardar Edición</div>
            </button>

          </div>
        </div>
      </form>
    </div>
  );

};

export default EditarTransformador;