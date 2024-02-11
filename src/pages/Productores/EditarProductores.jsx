import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/PRODUCTORESREGIST.css';

const EditarProductores = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    correo: '',
    nombre: '',
    nit: 0,
    telefono: 0,
    direccion: '',
    material: '',
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
        const response = await fetch(`backend-ac-production.up.railway.app/productor/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            cantidad: getCantidadesString(formData),
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
      const response = await fetch(`backend-ac-production.up.railway.app/productor/${productId}`);
      
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
  
    const cantidadesArray = ((data.cantidad || '').toString()).split(',').map(str => str.trim());
  
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
  <div className="registrar-miembros-page2">
    <div className="label">
      <p className="text-wrapper">Formulario de edición de productores</p>
    </div>
    <form onSubmit={handleGuardarCambios}>
      <div className="box1 ${showBox1 ? 'show-box1' : ''}`">
        <div className="form1">
          <div className="overlap">
            <div className="group1">
              <input
                className="overlapgroup textwrapper-placeholder"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="overlapgroupwrapper">
              <input
                className="overlapgroup div-placeholder"
                type="text"
                name="correo"
                placeholder="Correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </div>
            <div className="overlapgroupwrapper1">
              <input
                className="overlapgroup div-placeholder"
                type="number"
                name="nit"
                placeholder="NIT"
                value={formData.nit || ''}
                onChange={handleChange}
              />
            </div>
            <div className="overlapgroupwrapper2">
              <input
                className="overlapgroup div-placeholder"
                type="number"
                name="telefono"
                placeholder="Telefono"
                value={formData.telefono || ''}
                onChange={handleChange}
              />
            </div>
            <div className="group2">
              <input
                className="divwrapper div-placeholder"
                type="text"
                name="direccion"
                placeholder="Direccion"
                value={formData.direccion}
                onChange={handleChange}
              />
              <div className="textwrapper2">Información</div>
            </div>
          </div>
        </div>
      </div>

      <div className="box">
        <div className="form">
          <p className="text-wrapper">Materiales de empaques puestos en el mercado</p>
          <div className="div">Papel</div>
          <div className="text-wrapper-2">Cantidad</div>
          <div className="text-wrapper-3">Cartón</div>
          <div className="text-wrapper-4">Vidrio</div>
          <div className="text-wrapper-5">Plástico rígido</div>
          <div className="text-wrapper-6">Plástico flexible</div>
          <input className="group"
            type="number"
            name="papel"
            value={formData.papel || ''}
            onChange={handleInputChange}
          />
          <input className="group-2" type="number"
            name="carton"
            value={formData.carton || ''}
            onChange={handleInputChange}
          />
          <input className="group-3" type="number"
            name="vidrio"
            value={formData.vidrio || ''}
            onChange={handleInputChange}
          />
          <input className="group-4" name="plasticoRigido" type="number"
            value={formData.plasticoRigido || ''}
            onChange={handleInputChange}
          />
          <input className="group-5" name="plasticoFlexible" type="number"
            value={formData.plasticoFlexible || ''}
            onChange={handleInputChange}
          />
        </div>
      </div>

      

      <div className="box2">
        <div className="CR">
          <button type="button" className="cancelar" onClick={handleCancelar}>
            <div className="og">
              <div className="tw">Cancelar</div>
            </div>
          </button>
          
            <button type="button" className="editar" onClick={handleGuardarCambios}>
              <div className="d">Guardar Edición</div>
            </button>
         
          
        </div>
      </div>
    </form>
  </div>
);

};

export default EditarProductores;

