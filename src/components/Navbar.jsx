import React from 'react';
import { useLocation } from 'react-router-dom';
import productoresIcon from '../images/Productores2.png';
import productores3Icon from '../images/Productores4.png';

import gestoresIcon from '../images/Gestores1.png';
import gestores2Icon from '../images/Gestores2.png';

import TransformadoresIcon from '../images/Transformadores2.png';
import Transformadores2Icon from '../images/Transformadores3.png';

import GestorEntidad2Icon from '../images/GestorEntidad.png';
import GestorEntidad1Icon from '../images/GestorEntidad1.png';

import GestorGestorIcon from '../images/GestorGestor2.png';
import GestorGestor1Icon from '../images/GestorGestor3.png';

import GestorTransformadorIcon from '../images/GestorTransformador2.png';
import GestorTransformador1Icon from '../images/GestorTrasformador1.png';

import EstadisticasIcon from '../images/Estadisticas1.png';

import ReportesIcon from '../images/Reportes.png';

import LogoIcon from '../images/logo.png';


import '../styles/Navbar.css';

const Navbar = () => {
  const { pathname } = useLocation();

  const obtenerNumeroProductor = (ruta) => {
    const match = ruta.match(/\/editarProductores\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };
  const obtenerNumeroGestor = (ruta) => {
    const match = ruta.match(/\/editarGestor\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };
  const obtenerNumeroTransformador = (ruta) => {
    const match = ruta.match(/\/editarTransformador\/(\d+)/);
    return match ? parseInt(match[1], 10) : null;
  };



  const getIconForRoute = (route) => {
    const numeroProductor = obtenerNumeroProductor(route);
    const numeroGestor = obtenerNumeroGestor(route);
    const NumeroTransformador = obtenerNumeroTransformador(route);
    switch (route) {
      case '/productores':
        return productoresIcon;
      case '/registrarproductores':
        return productores3Icon;
      case `/editarProductores/${numeroProductor}`:
        return productores3Icon;
      case '/gestores':
        return gestoresIcon;
      case '/registrarGestores':
        return gestores2Icon;
      case `/editarGestor/${numeroGestor}`:
        return gestores2Icon;
      case '/transformadores':
        return TransformadoresIcon;
      case '/registrarTransformadores':
        return Transformadores2Icon;
      case `/editarTransformador/${NumeroTransformador}`:
        return Transformadores2Icon;
      case '/gestorEntidadExterna':
        return GestorEntidad2Icon;
      case '/registrarGestorEntidadExterna':
        return GestorEntidad1Icon;
      case '/gestorGestor':
        return GestorGestorIcon;
      case '/registrarGestorGestor':
        return GestorGestor1Icon;
      case '/transacciones':
        return GestorTransformadorIcon;
      case '/registrarTransacciones':
        return GestorTransformador1Icon;
      case '/estadisticas':
        return EstadisticasIcon;
      case '/reportes':
        return ReportesIcon;
      case '/inicioS':
        return LogoIcon;

      default:
        return null; // Puedes retornar una imagen predeterminada si no coincide ninguna ruta
    }
  };

  const currentIcon = getIconForRoute(pathname);

  return (
    <div className="navbar-container" >
      {currentIcon && (
        <img
          src={currentIcon}
          alt={`Icon for ${pathname}`}
          className="navbar-image"
        />
      )}
    </div>
  );
};

export default Navbar;


















