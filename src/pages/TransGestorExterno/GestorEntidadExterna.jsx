import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const GestorEntidadExterna = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchId, setSearchId] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transaccionge'); // Reemplaza con la URL correcta
      if (response.ok) {
        const result = await response.json();
        setData(result);
        setError(null); // Borra el mensaje de error si la solicitud tiene éxito
        
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
  }, [data]);

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
      <h1 className="page-title">Gestor Entidad Externa</h1>

      {error && ( // Muestra el mensaje de error si existe
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
      <table className="custom-table">
        <thead>
          <tr>
            
            <th>ID Gestor</th>
            <th>Material</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Archivo de Imagen</th>
            <th>Nombre de Entidad</th>
            <th>Descripción</th>
            <th>Ubicación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              
              <td>{item.gestor_id}</td>
              <td>{item.material}</td>
              <td>{item.cantidad}</td>
              <td>{item.fecha}</td>
              <td>{item.archivoImagen ? item.archivoImagen : 'NULL'}</td>
              <td>{item.entidad_externa}</td>
              <td>{item.descripcion}</td>
              <td>{item.ubicacion}</td>
              <td>
                <Link to={`/editarGestorEntidadExterna/${item.id}`}>
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
        <Link to="/registrarGestorEntidadExterna" className="register-button">
          Registrar Transacción Gestor Entidad Externa
        </Link> 
      </div>
    </div>
  );
};

export default GestorEntidadExterna;

