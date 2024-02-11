import '../../styles/Tablas/new-table5.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const Transactions = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);


  const [gestoresData, setGestoresData] = useState([]);

  const [transformadoresData, setTransformadoresData] = useState([]);

  useEffect(() => {
    const fetchDataAndGestores = async () => {
      try {
        const [transaccionesResponse, gestoresResponse, transformadoresResponse] = await Promise.all([
          fetch('backend-ac-production.up.railway.app/transacciones/gt'),
          fetch('backend-ac-production.up.railway.app/gestor'),
          fetch('backend-ac-production.up.railway.app/transformador')
        ]);

        if (transaccionesResponse.ok && gestoresResponse.ok && transformadoresResponse.ok) {
          const transaccionesResult = await transaccionesResponse.json();
          const gestoresResult = await gestoresResponse.json();
          const transformadoresResult = await transformadoresResponse.json();

          console.log('Transacciones Data:', transaccionesResult);
          console.log('Gestores Data:', gestoresResult);
          console.log('Transformadores Data:', transformadoresResult);

          setData(transaccionesResult);
          setFilteredData(transaccionesResult);
          setGestoresData(gestoresResult);
          setTransformadoresData(transformadoresResult);
        } else {
          console.error('Error al cargar datos de la API');
          setError('Error al cargar datos de la API');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        setError('Error al realizar la solicitud');
      }
    };

    fetchDataAndGestores();
  }, []);

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value;
    setSearchNit(searchTerm);

    const filtered = data.filter((item) =>
      item.nit.includes(searchTerm)
    );

    setFilteredData(filtered);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTransformadorNameById = (transformadorId) => {
    const transformador = transformadoresData.find((t) => t.id === transformadorId);
    return transformador ? transformador.nombre : 'Nombre no encontrado';
  };

  const getGestoresNameById = (gestorId) => {
    const gestor = gestoresData.find((t) => t.id === gestorId);
    return gestor ? gestor.nombre : 'Nombre no encontrado';
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`backend-ac-production.up.railway.app/transacciones/gt/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Remove the deleted item from the data array
        const updatedData = data.filter((item) => item.id !== id);
        setData(updatedData);
        setFilteredData(updatedData);
      } else {
        console.error('Error al eliminar la transacción');
        setError('Error al eliminar la transacción');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      setError('Error al realizar la solicitud');
    }
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
          value={searchNit}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/*
      <table className="custom-table">
        <thead>
          <tr>
            <th>Gestor</th>
            <th>Transformador</th>
            <th>Material</th>
            <th>Fecha</th>
            <th>Descripción</th>
            
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.gestor ? item.gestor.nombre : 'Nombre no encontrado'}</td>
              <td>{item.transformador ? getTransformadorNameById(item.transformador.id) : 'Nombre no encontrado'}</td>



              <td>{item.material}</td>
              <td>{item.fecha}</td>
              <td>{item.descripcion}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
          */}

      <div className="GESTORTRANSFORMADOR">
        <div className="contenido-wrapper">
          <div className="contenido">
            <div className="tabla">

              <div>
                {paginatedData.map((item) => (
                  <div className="MEETING" key={item.id}>
                    <div className="group">
                      <div className="text-wrapper-12">{getGestoresNameById(item.gestor_realiza)}</div>
                      <div className="text-wrapper-10">{getTransformadorNameById(item.transformador_recive)}</div>
                      <div className="text-wrapper-2">{item.imagen ? item.gestor.nombre : 'Imagen no encontrado'}</div>
                      <div className="text-wrapper-3">{item.fecha}</div>
                      <div className="text-wrapper1">{item.descripcion ? item.gestor.nombre : 'Descripcion no encontrado'}</div>
                      <div className="text-wrapper-11">{item.ubicacion ? item.gestor.nombre : 'Ubicacion no encontrado'}</div>
                    </div>
                    <div className="navbar">
                      <div className="text-wrapper-4">Gestor realiza</div>
                      <div className="text-wrapper-5">Gestor Recive</div>
                      <div className="text-wrapper-13">Imagen</div>
                      <div className="text-wrapper-6">Fecha</div>
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


      <div className="registrarGTr">
        <div className='oGTr'>
          <Link to="/registrarGestorTransformador" className="dGTr">
            Registrar
          </Link>
        </div>
      </div>





    </div>






  );
};

export default Transactions;




