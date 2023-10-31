import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Gestores = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState('');
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/gestor');
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
    // Filtrar los datos por NIT
    const filtered = data.filter((item) => item.nit.toString().includes(searchNit));

    setFilteredData(filtered);
  }, [searchNit, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEditarClick = (id) => {
    navigate(`/editarGestor/${id}`);
  };

  const eliminarGestor = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/gestor/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        await fetchData();
      } else {
        console.error('Error al eliminar el gestor');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="gestores-page">
      <h1 className="page-title">Gestores</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por NIT"
          value={searchNit}
          onChange={(e) => setSearchNit(e.target.value)}
          className="search-input"
        />
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>{item.capacidad}</td>
              <td>{item.nit}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion}</td>
              <td>
                <button onClick={() => eliminarGestor(item.id)}>Eliminar</button>
                <button onClick={() => handleEditarClick(item.id)}>Editar</button>
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
        <span>Página {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= paginatedData.length}
        >
          Siguiente
        </button>
      </div>
      <div className="action-buttons">
        <Link to="/registrarGestores" className="register-button">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Gestores;

