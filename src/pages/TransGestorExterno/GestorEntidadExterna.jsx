import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Tablas/new-table3.css';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const GestorEntidadExterna = () => {
  const [data, setData] = useState([]);
  const [gestoresData, setGestoresData] = useState([]); // Estado para almacenar los datos de los gestores
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const transacciongeResponse = await fetch('https://backend-ac-production.up.railway.app/transacciones/ge');
      const gestoresResponse = await fetch('https://backend-ac-production.up.railway.app/gestor');

      if (transacciongeResponse.ok && gestoresResponse.ok) {
        const transacciongeResult = await transacciongeResponse.json();
        const gestoresResult = await gestoresResponse.json();

        setData(transacciongeResult);
        setGestoresData(gestoresResult);



        setError(null);
      } else {
        console.error('Error al cargar datos de la API');
        setError('Error al cargar datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error al realizar la solicitud');
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.id.toString().includes(searchId)
    );

    setFilteredData(filtered);
  }, [searchId, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getGestorNameById = (gestor_recibe) => {
    const gestor = gestoresData.find((gestor) => gestor.id === Number(gestor_recibe));
    return gestor ? gestor.nombre : 'Nombre no encontrado';
  };

  return (
    <div className="about-page">
     

      {error && (
        <div className="error-message">
          Error: {error}
        </div>
      )}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
      </div>
      {/* 
      <table className="custom-table">
        <thead>
          <tr>
            <th>Gestor</th>
            <th>Material</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Archivo de Imagen</th>
            <th>Nombre de Entidad</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.gestor ? item.gestor.nombre : 'Nombre no encontrado'}</td>
              <td>{item.material }</td>
              <td>{item.cantidad}</td>
              <td>{item.fecha}</td>
              <td>{item.archivoImagen ? item.archivoImagen : 'NULL'}</td>
              <td>{item.entidad_externa}</td>
              <td>{item.descripcion}</td>
              <td>{item.ubicacion}</td>
              
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="GESTORENTIDAD">
        <div className="contenido-wrapper">
          <div className="contenido">
            <div className="tabla">

              <div>
                {paginatedData.map((item) => (
                  <div className="MEETING" key={item.id}>
                    <div className="group">
                      <div className="text-wrapper-12">{item.nombre ? item.gestor.nombre : 'Nombre no encontrado'}</div>
                      <div className="text-wrapper-10">{item.imagen ? item.gestor.nombre : 'Imagen no encontrado'}</div>
                      <div className="text-wrapper-2">{item.fecha}</div>
                      <div className="text-wrapper-3">{item.entidad_externa}</div>
                      <div className="text-wrapper1">{item.descripcion ? item.gestor.nombre : 'Descripcion no encontrado'}</div>
                      <div className="text-wrapper-11">{item.ubicacion ? item.gestor.nombre : 'Ubicacion no encontrado'}</div>
                    </div>
                    <div className="navbar">
                      <div className="text-wrapper-4">Gestor</div>
                      <div className="text-wrapper-5">Imagen</div>
                      <div className="text-wrapper-13">fecha</div>
                      <div className="text-wrapper-6">Nombre Entidad</div>
                      <div className="text-wrapper-7">Descripcion</div>
                      <div className="text-wrapper-8">Ubicacion</div>
                    </div>





                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pagination" style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: 'transparent',
            color: '#069877',
            fontSize: '18px',
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HiOutlineArrowCircleLeft style={{ color: '#069877', marginRight: '5px', fontSize: '40px' }} />
          <span style={{ marginRight: '10px' }}>Anterior</span> {/* Quitamos el margen izquierdo */}
        </button>
        <span style={{ marginRight: '10px' }}>Página {currentPage} de {totalPages}</span> {/* Agregamos un margen derecho */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: 'transparent',
            color: '#069877',
            fontSize: '18px',
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px' }}>Siguiente</span> {/* Agregamos un margen derecho */}
          <HiOutlineArrowCircleRight style={{ color: '#069877', marginLeft: '5px', fontSize: '40px' }} />
        </button>
      </div>


      <div className="registrarGe">
        <div className='oGe'>
          <Link to="/registrarGestorEntidadExterna" className="dGe">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GestorEntidadExterna;


