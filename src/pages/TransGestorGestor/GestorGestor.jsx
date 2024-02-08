import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../../styles/Tablas/new-table4.css';
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const GestorGestor = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);
  const [gestoresData, setGestoresData] = useState([]);

  const fetchGestoresData = async () => {
    try {
      const response = await fetch('http://localhost:3000/gestor');
      if (response.ok) {
        const result = await response.json();
        console.log('Gestores Data:', result); // Agrega este console log
        setGestoresData(result);
      } else {
        console.error('Error al cargar datos de la API de gestores');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de gestores:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transacciones/gg');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Error al cargar datos de la API de transaccionesgg');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud de transaccionesgg:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndGestores = async () => {
      try {
        const [transaccionesResponse, gestoresResponse] = await Promise.all([
          fetch('http://localhost:3000/transacciones/gg'),
          fetch('http://localhost:3000/gestor')
        ]);

        if (transaccionesResponse.ok && gestoresResponse.ok) {
          const transaccionesResult = await transaccionesResponse.json();
          const gestoresResult = await gestoresResponse.json();

          setData(transaccionesResult);
          setGestoresData(gestoresResult);

          console.log('Transacciones Data:', transaccionesResult);
          console.log('Gestores Data:', gestoresResult);
        } else {
          console.error('Error al cargar datos de la API');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchDataAndGestores();
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

  const getGestorNameById = (gestor) => {
    return gestor ? gestor.nombre : 'Nombre no encontrado';
  };

  return (
    <div className="about-page">
      
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
            <th>Gestor Realiza</th>
            <th>Gestor Recibe</th>
            <th>Material</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Ubicación</th>
           
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{getGestorNameById(item.gestor_realiza)}</td>
              <td>{getGestorNameById(item.gestor_recibe)}</td>
              <td>{item.materialId}</td>
              <td>{item.cantidad}</td>
              <td>{item.fecha}</td>
              <td>{item.descripcion}</td>
              <td>{item.ubicacion}</td>
              
            </tr>
          ))}
        </tbody>
      </table> */}

<div className="GESTORGESTOR">
        <div className="contenido-wrapper">
          <div className="contenido">
            <div className="tabla">

              <div>
                {paginatedData.map((item) => (
                  <div className="MEETING" key={item.id}>
                    <div className="group">
                      <div className="text-wrapper-12">{getGestorNameById(item.gestor_realiza)}</div>
                      <div className="text-wrapper-10">{getGestorNameById(item.gestor_recibe)}</div>
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


      <div className="registrarGg">
        <div className='oGg'>
          <Link to="/registrarGestorGestor" className="dGg">
            Registrar
          </Link>
        </div>
      </div>
    </div>

  );
};

export default GestorGestor;




