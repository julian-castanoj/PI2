import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio.jsx';
import Reportes from './pages/Reportes.jsx';
import InicioS from './pages/inicioS.jsx';

import Productores from './pages/Productores/Productores.jsx';
import Estadisticas from './pages/Estadisticas.jsx';


import Logout from './pages/Logout.jsx';
import RegistrarProductores from './pages/Productores/RegistrarProductores.jsx';

import Gestores from './pages/Gestores/Gestores.jsx';
import Transformadores from './Transformador/Transformadores.jsx';

import RegistrarGestores from './pages/Gestores/RegistrarGestores.jsx';

import RegistrarTransformadores from './Transformador/RegistrarTransformadores.jsx';

import EditarGestor from './pages/Gestores/EditarGestor';
import EditarTransformador from './Transformador/EditarTransformador.jsx';
import EditarProductores from './pages/Productores/EditarProductores';

import EditarTransacciones from './pages/TransGestorTransformador/EditarGestorTransformador.jsx';
import RegistrarTransacciones from './pages/TransGestorTransformador/RegistrarGestorTransformador.jsx';
import Transacciones from './pages/TransGestorTransformador/GestorTransformador.jsx';

import GestorGestor from './pages/TransGestorGestor/GestorGestor';
import RegistrarGestorGestor from './pages/TransGestorGestor/RegistrarGestorGestor';
import EditarGestorGestor from './pages/TransGestorGestor/EditarGestorGestor';

import GestorEntidadExterna from './pages/TransGestorExterno/GestorEntidadExterna';
import RegistrarGestorEntidadExterna from './pages/TransGestorExterno/RegistrarGestorEntidadExterna';
import EditarGestorEntidadExterna from './pages/TransGestorExterno/EditarGestorEntidadExterna';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un token de acceso en localStorage
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    // Limpia el token de acceso y marca al usuario como no autenticado
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        {/* Navbar y Sidebar solo si no estamos en /inicio */}
        {isAuthenticated && (
          <>
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <div className="content-container"></div>
            <Sidebar className="full-height-sidebar" isAuthenticated={isAuthenticated}>
              <Routes>

                <Route exact path="/inicioS" element={<InicioS />} />

                <Route exact path="/productores" element={<Productores />} />
                <Route exact path="/registrarProductores" element={<RegistrarProductores />} />
                <Route path="/editarProductores/:id" element={<EditarProductores />} />

                <Route exact path="/gestores" element={<Gestores />} />
                <Route exact path="/registrarGestores" element={<RegistrarGestores />} />
                <Route path="/editarGestor/:id" element={<EditarGestor />} />

                <Route exact path="/transformadores" element={<Transformadores />} />
                <Route exact path="/registrarTransformadores" element={<RegistrarTransformadores />} />
                <Route path="/editarTransformador/:id" element={<EditarTransformador />} />

                {/*  Productor - entidad externa  */}
                <Route path="/gestorEntidadExterna" element={<GestorEntidadExterna />} />
                <Route path="/registrarGestorEntidadExterna" element={<RegistrarGestorEntidadExterna />} />
                <Route path="/editarGestorEntidadExterna" element={<EditarGestorEntidadExterna />} />

                {/* Gestor - Gestor   */}
                <Route path="/gestorGestor" element={<GestorGestor />} />
                <Route path="/registrarGestorGestor" element={<RegistrarGestorGestor />} />
                <Route path="/editarGestorGestor" element={<EditarGestorGestor />} />

                {/* Gestor - Transformador   */}
                <Route path="/gestorTransformador" element={<Transacciones />} />
                <Route path="/registrarGestorTransformador" element={<RegistrarTransacciones />} />
                <Route path="/editarGesorTransformador" element={<EditarTransacciones />} />





                <Route path="/estadisticas" element={<Estadisticas />} />

                <Route path="/reportes" element={<Reportes />} />

                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
              </Routes>
            </Sidebar>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/inicioS" />
              ) : (
                <Navigate to="/inicio" replace />
              )
            }
          />
          <Route path="/inicio" element={<Inicio onLogin={setIsAuthenticated} loggedIn={isAuthenticated} />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
};

export default App;






