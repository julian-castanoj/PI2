import '../styles/custom-table.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState(''); 
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const [filteredData, setFilteredData] = useState([]); 

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/transformador'); 
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

  const handleEditarClick = (id) => {
    navigate(`/editarTransformador/${id}`);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.nit.includes(searchNit)
    );
    setFilteredData(filtered);
  }, [searchNit, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const eliminarTransformador = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/transformador/${id}`, {
        method: 'DELETE',
      }); 
      if (response.ok) {
        await fetchData();
      } else {
        console.error('Error al eliminar el transformador');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  return (
    <div className="about-page">
      <h1 className="page-title">Transformadores</h1>
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
            
            <th>Razón Social</th>
            <th>Representante Legal</th>
            <th>NIT</th>
            <th>Corre</th>
            <th>Telefono</th>
            <th>Dirección Principal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              
              <td>{item.razon_social}</td>
              <td>{item.representante_legal}</td>
              <td>{item.nit}</td>
              <td>{item.correo}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion_principal}</td>
              <td>
                <button onClick={() => eliminarTransformador(item.id)}>Eliminar</button>
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
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>

      <div className="action-buttons">
        <Link to="/registrarTransformadores" className="register-button">
          Registrar
        </Link>
      </div>
    </div>
  );
};

export default About;
