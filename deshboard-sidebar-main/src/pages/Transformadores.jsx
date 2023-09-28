import '../styles/custom-table.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const About = () => {

  const data = [
    {
      razonSocial: 'Empresa A',
      representanteLegal: 'Juan Pérez',
      nit: '123456789',
      telefono: '555-123-456',
      direccionPrincipal: 'Calle 123, Ciudad A',
    },
    {
      razonSocial: 'Empresa B',
      representanteLegal: 'Ana López',
      nit: '987654321',
      telefono: '555-987-654',
      direccionPrincipal: 'Avenida 456, Ciudad B',
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
      <h1 className="page-title">Transformadores</h1>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Razón Social</th>
            <th>Representante Legal</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Dirección Principal</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index}>
              <td>{item.razonSocial}</td>
              <td>{item.representanteLegal}</td>
              <td>{item.nit}</td>
              <td>{item.telefono}</td>
              <td>{item.direccionPrincipal}</td>
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
        <button className="edit-button">Editar</button>
      </div>
    </div>
  );
};

export default About;
