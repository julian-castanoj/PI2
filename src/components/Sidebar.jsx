/*import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
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
          // Renderiza los elementos después del inicio de sesión
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div style={{ display: isOpen ? "block" : "none" }} className="link_text">
                {item.name}
              </div>
            </NavLink>
          ))
        ) : (
          // Renderiza solo el elemento "Inicio" cuando no está autenticado
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

export default Sidebar; */

import React, { useState } from 'react';
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

export default Sidebar;
