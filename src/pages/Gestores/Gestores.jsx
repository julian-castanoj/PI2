import '../../styles/Tablas/new-table1.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline } from "react-icons/io5";
import { BiSolidEdit } from "react-icons/bi";

import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";


const Gestores = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchNit, setSearchNit] = useState('');
  const itemsPerPage = 10;
  const [filteredData, setFilteredData] = useState([]);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  //Funcion para traer los datos de los gestores
  const fetchData = async () => {
    try {
      const response = await fetch('backend-ac-production.up.railway.app/gestor');
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

  // Funcion para filtrar los datos por NIT
  useEffect(() => {
    const filtered = data.filter((item) => item.nit.toString().includes(searchNit));
    setFilteredData(filtered);
  }, [searchNit, data]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Funcion para editar gestores por id
  const handleEditarClick = (id) => {
    navigate(`/editarGestor/${id}`);
  };

  // Funcion para eliminar gestores
  const eliminarGestor = async (id) => {
    const userConfirmed = window.confirm('¿Estás seguro de que deseas eliminar a este miembro?');
    if (userConfirmed) {
      try {
        const response = await fetch(`backend-ac-production.up.railway.app/gestor/${id}`, {
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
    }
  };

  return (
    <div className="gestores-page">

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar por NIT"
          value={searchNit}
          onChange={(e) => setSearchNit(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="GESTORES">
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

                    <button onClick={() => handleEditarClick(item.id)} className="edit-buttonPG">
                      <BiSolidEdit />
                    </button>
                    <button onClick={() => eliminarGestor(item.id)} className="delete-buttonPG">
                      <div className="icon-containerPG">
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
          <span style={{ marginRight: '10px' }}>Anterior</span>
        </button>
        <span style={{ marginRight: '10px' }}>Página {currentPage} de {totalPages}</span>
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
          <span style={{ marginRight: '10px' }}>Siguiente</span>
          <HiOutlineArrowCircleRight style={{ color: '#069877', marginLeft: '5px', fontSize: '40px' }} />
        </button>
      </div>

      <div className="registrarGe" style={{ textAlign: 'center' }}>
        <div className='oGe'>
          <Link to="/registrarGestores" className="dGe">
            Registrar
          </Link>
        </div>
      </div>

    </div>
    
  );
};

export default Gestores;
