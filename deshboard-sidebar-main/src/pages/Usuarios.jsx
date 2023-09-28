import '../styles/custom-table.css';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const About = () => {

    const data = [
        {
          razonSocial: 'Empresa A',
          nombre: 'Juan Pérez',
          nit: '123456789',
          nacionalidad: 'Mexicana',
        },
        {
          razonSocial: 'Empresa B',
          nombre: 'Ana López',
          nit: '987654321',
          nacionalidad: 'Colombiana',
        },
        // Agrega más filas de datos según sea necesario
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
          <h1 className="page-title">Registar miembros</h1>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Razón Social</th>
                <th>Nombre</th>
                <th>NIT</th>
                <th>Nacionalidad</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.razonSocial}</td>
                  <td>{item.nombre}</td>
                  <td>{item.nit}</td>
                  <td>{item.nacionalidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
    
          {/* Botón para cambiar el número de página */}
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
    
          {/* Botones para registrar y editar */}
          <div className="action-buttons">
          <Link to="/registrarMiembros" className="register-button">
          Registrar
        </Link>
            <button className="edit-button">Editar</button>
          </div>
        </div>
      );
    };

export default About;