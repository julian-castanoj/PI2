import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/custom-table.css';

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
      <h1 className="page-title">Gestor Gestor</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="search-input"
        />
      </div>
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
            <th>Acciones</th>
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
              <td>
                <Link to={`/editarGestorGestor/${item.id}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <div className="action-buttons">
        <Link to="/registrarGestorGestor" className="register-button">
          Registrar Transacción Gestor Gestor
        </Link>
      </div>
    </div>
  );
};

export default GestorGestor;




