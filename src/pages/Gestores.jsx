import '../styles/custom-table.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const About = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState(''); // Cambiado a searchNit
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]); // Para almacenar los resultados de la búsqueda

  const fetchData = async () => {
    try {
      const response = await fetch('http://tuapi.com/gestores'); // Reemplaza con la URL de tu API
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
    // Filtrar los datos en tiempo real mientras se ingresa el NIT
    const filtered = data.filter((item) =>
      item.nit.includes(searchNit)
    );

    setFilteredData(filtered);
  }, [searchNit, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const eliminarGestor = async (id) => {
    try {
      const response = await fetch(`http://tuapi.com/gestores/${id}`, {
        method: 'DELETE',
      }); // Reemplaza con la URL de tu API
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
    <div className="about-page">
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
                <Link to={`/editarGestor/${item.id}`}>
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
        <Link to="/registrarGestores" className="register-button">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default About;

