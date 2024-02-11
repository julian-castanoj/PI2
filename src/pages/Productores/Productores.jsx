import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Tablas/new-table.css';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";


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
      const response = await fetch('backend-ac-production.up.railway.app/productor');
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
      item.nit.includes(searchNit)
    );

    setFilteredData(filtered);
  }, [searchNit, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const deleteMember = async (id) => {
    const userConfirmed = window.confirm('¿Estás seguro de que deseas eliminar a este miembro?');
    if (userConfirmed) {
      try {
        const response = await fetch(`backend-ac-production.up.railway.app/productor/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          await fetchData();
        } else {
          console.error('Error al eliminar el productor');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    }
  };

  const handleEditarClick = (id) => {
    navigate(`/editarProductores/${id}`);
  };


  return (
    <div className="about-page">

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por NIT"
          value={searchNit}
          onChange={(e) => setSearchNit(e.target.value)}
          className="search-input"
        />
      </div>


      {/*  <table className="custom-table">
        <thead>
          <tr>
            
            <th>Nombre</th>
            <th>Correo</th>
            <th>NIT</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item.id}>
              
              <td>{item.nombre}</td>
              <td>{item.correo}</td>
              <td>{item.nit}</td>
              <td>{item.telefono}</td>
              <td>{item.direccion}</td>
              <td>
                <button onClick={() => deleteMember(item.id)}>Eliminar</button>
                <button onClick={() => handleEditarClick(item.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}

      <div className="PRODUCTORES">
        <div className="contenido-wrapper">
          <div className="contenido">
            <div className="tabla">

              <div>
                {paginatedData.map((item) => (
                  <div className="MEETING" key={item.id}>
                    <div className="group">
                      <div className="text-wrapper">{item.nombre}</div>
                      <div className="text-wrapper-10">{item.correo}</div>
                      <div className="text-wrapper-2">{item.nit}</div>
                      <div className="text-wrapper-3">{item.telefono}</div>
                      <div className="direcarrera">
                        {item.direccion.split("\n").map((line, index) => (
                          <p key={index}>{line}</p>
                        ))}
                      </div>
                    </div>
                    <div className="navbar">
                      <div className="text-wrapper-4">Nombre</div>
                      <div className="text-wrapper-5">Correo</div>
                      <div className="text-wrapper-9">NIT</div>
                      <div className="text-wrapper-6">Teléfono</div>
                      <div className="text-wrapper-7">Dirección</div>
                      <div className="text-wrapper-8">Acciones</div>
                    </div>


                    <button onClick={() => handleEditarClick(item.id)} className="edit-buttonPT">
                      <BiSolidEdit />
                    </button>

                    <button onClick={() => deleteMember(item.id)} className="delete-buttonPT">
                      <div className="icon-containerPT">
                        <IoTrashOutline />
                      </div>
                    </button>


                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pagination" style={{ display: 'flex', alignItems: 'center' }}>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            backgroundColor: 'transparent',
            color: '#069877',
            fontSize: '18px',
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <HiOutlineArrowCircleLeft style={{ color: '#069877', marginRight: '5px', fontSize: '40px' }} />
          <span style={{ marginRight: '10px' }}>Anterior</span> {/* Quitamos el margen izquierdo */}
        </button>
        <span style={{ marginRight: '10px' }}>Página {currentPage} de {totalPages}</span> {/* Agregamos un margen derecho */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: 'transparent',
            color: '#069877',
            fontSize: '18px',
            padding: '8px 12px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span style={{ marginRight: '10px' }}>Siguiente</span> {/* Agregamos un margen derecho */}
          <HiOutlineArrowCircleRight style={{ color: '#069877', marginLeft: '5px', fontSize: '40px' }} />
        </button>
      </div>


      <div className="registrarPr">
        <div className='oPr'>
          <Link to="/registrarProductores" className="dPr">
            Registrar
          </Link>
        </div>
      </div>

    </div>
  );
};

export default About;