//import React from 'react';
// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio.jsx';
import Productores from './pages/Productores.jsx';
import Estadisticas from './pages/Estadisticas.jsx';

import Logout from './pages/Logout.jsx';
import RegistrarProductores from './pages/RegistrarProductores.jsx';
import Gestores from './pages/Gestores.jsx';
import Transformadores from './pages/Transformadores.jsx';
import RegistrarGestores from './pages/RegistrarGestores.jsx';
import RegistrarTransformadores from './pages/RegistrarTransformadores.jsx';

import EditarGestor from './pages/EditarGestor';
import EditarTransformador from './pages/EditarTransformador';
import EditarProductores from './pages/EditarProductores';

import EditarTransacciones from './pages/TransGestorProductor/EditarTransaccion';
import RegistrarTransacciones from './pages/TransGestorProductor/RegistrarTransacciones.jsx';
import Transacciones from './pages/TransGestorProductor/Transacciones.jsx';

import GestorGestor from './pages/TransGestorGestor/GestorGestor';
import RegistrarGestorGestor from './pages/TransGestorGestor/RegistrarGestorGestor';
import EditarGestorGestor from './pages/TransGestorGestor/EditarGestorGestor';



import GestorEntidadExterna from './pages/TransGestorExterno/GestorEntidadExterna';
import RegistrarGestorEntidadExterna from './pages/TransGestorExterno/RegistrarGestorEntidadExterna';
import EditarGestorEntidadExterna from './pages/TransGestorExterno/EditarGestorEntidadExterna';

import ProductorGestor from './pages/ProductorGestor';
import EditarProductorGestor from './pages/EditarProductorGestor';
import RegistrarProductorGestor from './pages/RegistrarProductorGestor';


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
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <div className="content-container"></div>
        <Sidebar isAuthenticated={isAuthenticated}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/panel-de-control" />
                ) : (
                  <Navigate to="/inicio" replace />
                )
              }
            />
            <Route path="/inicio" element={<Inicio onLogin={setIsAuthenticated} loggedIn={isAuthenticated} />} />

            <Route exact path="/productores" element={<Productores />} />
            <Route exact path="/registrarProductores" element={<RegistrarProductores />} />
            <Route path="/editarProductores/:id" element={<EditarProductores />} />

            <Route exact path="/gestores" element={<Gestores />} />
            <Route exact path="/registrarGestores" element={<RegistrarGestores />} />
            <Route path="/editarGestor/:id" element={<EditarGestor />} />

            <Route exact path="/transformadores" element={<Transformadores />} />
            <Route exact path="/registrarTransformadores" element={<RegistrarTransformadores />} />
            <Route path="/editarTransformador/:id" element={<EditarTransformador />} />

            {/* Gestor - Transformador   */}
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/registrarTransacciones" element={<RegistrarTransacciones />} />
            <Route path="/editarTransaccion" element={<EditarTransacciones />} />

            {/*  Productor - entidad externa  */}
            <Route path="/gestorEntidadExterna" element={<GestorEntidadExterna />} />
            <Route path="/registrarGestorEntidadExterna" element={<RegistrarGestorEntidadExterna />} />
            <Route path="/editarGestorEntidadExterna" element={<EditarGestorEntidadExterna />} />

            {/* Gestor - Gestor   */}
            <Route path="/gestorGestor" element={<GestorGestor />} />
            <Route path="/registrarGestorGestor" element={<RegistrarGestorGestor />} />
            <Route path="/editarGestorGestor" element={<EditarGestorGestor />} />

            {/* Productor-Gestor   */}
            <Route path="/productorGestor" element={<ProductorGestor />} />
            <Route path="/registrarProductorGestor" element={<RegistrarProductorGestor />} />
            <Route path="/editarProductorGestor" element={<EditarProductorGestor />} />


          

            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          </Routes>
        </Sidebar>
      </div>
    </BrowserRouter>
  );
};

export default App;




/*const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content-container"></div>
        <Sidebar>
          <Routes>

            <Route path="/" element={<Inicio />} />
            <Route path="/inicio" element={<Inicio />} />


            <Route exact path="/Productores" element={<Productores />} />
            <Route exact path="/registrarProductores" element={<RegistrarProductores />} />

            <Route exact path="/gestores" element={<Gestores />} />
            <Route exact path="/registrarGestores" element={<RegistrarGestores />} />

            <Route exact path="/transformadores" element={<Transformadores />} />
            <Route exact path="/registrarTransformadores" element={<RegistrarTransformadores />} />

            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/registrarTransacciones" element={<RegistrarTransacciones />} />

            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Sidebar>
      </div>
    
    </BrowserRouter >
  );
}; */

