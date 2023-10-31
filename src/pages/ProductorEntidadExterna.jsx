import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProductorEntidadExterna = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/productorEntidadExterna'); // Cambia la URL para obtener datos de productorEntidadExterna
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
      <h1 className="page-title">Productor Entidad Externa</h1>
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
            <th>ID</th> {/* Nueva columna para el ID de la transacción */}
            <th>ID Productor</th>
            <th>Nombre de Entidad</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.idTransaccion}</td> {/* Muestra el ID de la transacción */}
              <td>{item.idProductor}</td> {/* Cambia el nombre del campo según tu estructura de datos */}
              <td>{item.nombreEntidad}</td> {/* Cambia el nombre del campo según tu estructura de datos */}
              <td>{item.fecha}</td>
              <td>{item.observaciones}</td>
              <td>
                <Link to={`/editarProductorEntidadExterna/${item.id}`}>
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
        <Link to="/registrarProductorEntidadExterna" className="register-button">
          Registrar Transacción Productor Entidad Externa
        </Link>
      </div>
    </div>
  );
};

export default ProductorEntidadExterna;
