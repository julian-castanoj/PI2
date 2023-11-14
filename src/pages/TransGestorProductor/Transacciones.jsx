import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/custom-table.css';

const Transactions = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState('');
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [gestoresData, setGestoresData] = useState([]);

  const [transformadoresData, setTransformadoresData] = useState([]); // Nueva variable de estado

  useEffect(() => {
    const fetchDataAndGestores = async () => {
      try {
        const [transaccionesResponse, gestoresResponse, transformadoresResponse] = await Promise.all([
          fetch('http://localhost:3000/transacciongt'),
          fetch('http://localhost:3000/gestor'),
          fetch('http://localhost:3000/transformador')
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
          setTransformadoresData(transformadoresResult); // Almacena los datos del transformador
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
    return transformador ? transformador.razon_social : 'Nombre no encontrado';
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transacciongt/${id}`, {
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
      <h1 className="page-title">Gestor Transformador</h1>

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

      <table className="custom-table">
        <thead>
          <tr>
            <th>Gestor</th>
            <th>Transformador</th>
            <th>Material</th>
            <th>Fecha</th>
            <th>Descripción</th>
            <th>Acciones</th>
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
              <td>
                <button onClick={() => deleteTransaction(item.id)}>Eliminar</button>
                <Link to={`/editarTransaccion/${item.id}`}>
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
        <Link to="/registrarTransacciones" className="register-button">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default Transactions;




