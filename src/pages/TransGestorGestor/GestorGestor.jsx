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

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transacciongg');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        console.error('Error al cargar datos de la API');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
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
            <th>ID</th>
            <th>Gestor Realiza ID</th>
            <th>Gestor Recibe ID</th>
            <th>Material ID</th>
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
              <td>{item.id}</td>
              <td>{item.gestorRealizaId}</td>
              <td>{item.gestorRecibeId}</td>
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



