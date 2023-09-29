import '../styles/custom-table.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const About = () => {

  const data = [
    {
      nombre: 'Juan Pérez',
      capacidad: '100',
      nit: '123456789',
      telefono: '555-123-456',
      direccion: 'Calle 123, Ciudad A',
    },
    {
      nombre: 'Ana López',
      capacidad: '75',
      nit: '987654321',
      telefono: '555-987-654',
      direccion: 'Avenida 456, Ciudad B',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10; // Cantidad de elementos por página
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="about-page">
      <h1 className="page-title">Gestores</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Capacidad</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>{item.capacidad}</td>
              <td>{item.nit}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion}</td>
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
        <button className="edit-button">Editar</button>
      </div>
    </div>
  );
};

export default About;
