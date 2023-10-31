import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../styles/ss.css';

const Sidebar = ({ children, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActorsOpen, setIsActorsOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false); // Nuevo estado para transacciones
  const toggle = () => setIsOpen(!isOpen);

  const toggleActors = () => setIsActorsOpen(!isActorsOpen);
  const toggleTransactions = () => setIsTransactionsOpen(!isTransactionsOpen); // Función para mostrar/ocultar transacciones

  const actorsSubMenu = [
    {
      path: "/productores",
      name: "Productores",
      icon: <FaUserAlt />,
    },
    {
      path: "/gestores",
      name: "Gestores",
      icon: <FaUserAlt />,
    },
    {
      path: "/transformadores",
      name: "Transformadores",
      icon: <FaUserAlt />,
    },
  ];

  const transactionsSubMenu = [ // Definición de submenú de transacciones
    {
      path: "/gestorEntidadExterna",
      name: "Gestor - Entidad Externa",
      icon: <FaCommentAlt />,
    },
    
    {
      path: "/gestorGestor",
      name: "Gestor - Gestor",
      icon: <FaCommentAlt />,
    },
    {
      path: "/transacciones",
      name: "Gestor - Transformador",
      icon: <FaCommentAlt />,
    },
    /*{
          path: "/transacciones",
          name: "Transacciones",
          icon: <FaCommentAlt />,
        },*/ 
  ];

  const menuItem = isAuthenticated
    ? [
        {
          path: "/estadisticas",
          name: "Estadisticas",
          icon: <FaRegChartBar />,
        },
        
        {
          path: "/logout",
          name: "Salir de sesion",
          icon: <FaShoppingBag />,
        },
      ]
    : [
        {
          path: "/inicio",
          name: "Inicio de Sesión",
          icon: <FaTh />,
        },
      ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {isAuthenticated && (
          <>
            <div className="link" onClick={toggleActors}>
              <div className="icon"><FaUserAlt /></div>
              <div className="link_text">Actores</div>
            </div>
            {isActorsOpen && (
              <div className="submenu">
                {actorsSubMenu.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link" activeClassName="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
            <div className="link" onClick={toggleTransactions}>
              <div className="icon"><FaCommentAlt /></div>
              <div className="link_text">Transacciones</div>
            </div>
            {isTransactionsOpen && ( // Mostrar submenú de transacciones cuando está abierto
              <div className="submenu">
                {transactionsSubMenu.map((item, index) => (
                  <NavLink to={item.path} key={index} className="link" activeClassName="active">
                    <div className="icon">{item.icon}</div>
                    <div className="link_text">
                      {item.name}
                    </div>
                  </NavLink>
                ))}
              </div>
            )}
          </>
        )}
        <div className="submenu">
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;


/*import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children, isAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/inicio",
      name: "Inicio",
      icon: <FaTh />,
    },
    {
      path: "/productores",
      name: "Productores",
      icon: <FaUserAlt />,
    },
    {
      path: "/gestores",
      name: "Gestores",
      icon: <FaUserAlt />,
    },
    {
      path: "/transformadores",
      name: "Transformadores",
      icon: <FaUserAlt />,
    },
    {
      path: "/estadisticas",
      name: "Estadisticas",
      icon: <FaRegChartBar />,
    },
    {
      path: "/transacciones",
      name: "Transacciones",
      icon: <FaCommentAlt />,
    },
    {
      path: "/logout",
      name: "Salir de sesion",
      icon: <FaShoppingBag />,
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {isAuthenticated ? (
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))
        ) : (
          <NavLink to="/inicio" className="link" activeClassName="active">
            <div className="icon"><FaTh /></div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">Inicio</div>
          </NavLink>
        )}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;*/