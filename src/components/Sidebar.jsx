import React, { useState } from 'react';
import { FaTh, FaBars, FaUserAlt, FaRegChartBar, FaCommentAlt, FaShoppingBag } from "react-icons/fa";
import { GoHome, GoArrowSwitch } from "react-icons/go";
import { MdPersonOutline } from "react-icons/md";


import { BiCoffeeTogo } from "react-icons/bi";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { CiTrophy } from "react-icons/ci";

import { FaCodeCompare, FaCodePullRequest, FaCodeMerge } from "react-icons/fa6";
import { TbReportSearch } from "react-icons/tb";

import { NavLink } from 'react-router-dom';
import '../styles/ss.css';

const Sidebar = ({ children, isAuthenticated }) => {
  const [isActorsOpen, setIsActorsOpen] = useState(false);
  const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

  const toggleActors = () => setIsActorsOpen(!isActorsOpen);
  const toggleTransactions = () => setIsTransactionsOpen(!isTransactionsOpen);

  

  const actorsSubMenu = [
    {
      path: "/productores",
      name: "Productores",
      icon: <BiCoffeeTogo />,
    },
    {
      path: "/gestores",
      name: "Gestores",
      icon: <IoExtensionPuzzleOutline />,
    },
    {
      path: "/transformadores",
      name: "Transformadores",
      icon: <CiTrophy />,
    },
  ];

  const transactionsSubMenu = [
    {
      path: "/gestorEntidadExterna",
      name: "Gestor - Entidad Externa",
      icon: <FaCodePullRequest />,
    },
    {
      path: "/gestorGestor",
      name: "Gestor - Gestor",
      icon: <FaCodeCompare />,
    },
    {
      path: "/transacciones",
      name: "Gestor - Transformador",
      icon: <FaCodeMerge />,
    },
  ];

  const menuItem = isAuthenticated
    ? [
        {
          path: "/estadisticas",
          name: "Estadisticas",
          icon: <FaRegChartBar />,
        },
        {
          path: "/reportes",
          name: "Reportes",
          icon: <TbReportSearch />,
        },
        {
          path: "/logout",
          name: "Salir de sesion",
          icon: <FaShoppingBag />,
        },
      ]
    : [];

  return (
    <div className="container">
      <div className="sidebar">

      <NavLink to="/inicioS" className="link" activeClassName="active" style={{ color: '#94989D', fontFamily: 'Lato, sans-serif' }}>
              <div className="icon"><GoHome /></div>
              <div className="link_text">Inicio</div>
            </NavLink>        

        {isAuthenticated && (


          <>
            <div className="link" onClick={toggleActors} style={{color: '#94989D', fontFamily: 'Lato, sans-serif'}}>
              <div className="icon"><MdPersonOutline /></div>
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
            <div className="link" onClick={toggleTransactions} style={{color: '#94989D' , fontFamily: 'Lato, sans-serif',  textAlign: 'left', alignItems: 'flex-start'}}>
              <div className="icon"><GoArrowSwitch /></div>
              <div className="link_text">Transacciones</div >
            </div>
            {isTransactionsOpen && (
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



