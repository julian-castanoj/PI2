import React, { useState, useEffect } from 'react';
import '../styles/custom-table.css';
import { Link } from 'react-router-dom';

const ProductorGestor = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTransformador, setSearchTransformador] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/productorGestor');
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
      item.transformador.includes(searchTransformador)
    );

    setFilteredData(filtered);
  }, [searchTransformador, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteProductorGestor = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/productorGestor/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchData();
      } else {
        console.error('Error al eliminar el registro de Productor Gestor');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="about-page">
      <h1 className="page-title">Productor Gestor</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por Transformador"
          value={searchTransformador}
          onChange={(e) => setSearchTransformador(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Transformador</th>
            <th>Gestor ID</th>
            <th>Fecha</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.transformador}</td>
              <td>{item.gestor_id}</td>
              <td>{item.fecha}</td>
              <td>{item.observaciones}</td>
              <td>
                <button onClick={() => deleteProductorGestor(item.id)}>Eliminar</button>
                <Link to={`/editarProductorGestor/${item.id}`}>
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
        <Link to="/registrarProductorGestor" className="register-button">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default ProductorGestor;
