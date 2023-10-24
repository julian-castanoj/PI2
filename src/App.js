//import React from 'react';
import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Inicio from './pages/Inicio.jsx';
import Productores from './pages/Productores.jsx';
import Estadisticas from './pages/Estadisticas.jsx';
import Transacciones from './pages/Transacciones.jsx';
import Logout from './pages/Logout.jsx';
import RegistrarProductores from './pages/RegistrarProductores.jsx'
import Gestores from './pages/Gestores.jsx';
import Transformadores from './pages/Transformadores.jsx';
import RegistrarGestores from './pages/RegistrarGestores.jsx'
import RegistrarTransformadores from './pages/RegistrarTransformadores.jsx'
import RegistrarTransacciones from './pages/RegistrarTransacciones.jsx'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <div className="content-container"></div>
        <Sidebar isAuthenticated={isAuthenticated}>
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/inicio" />
                ) : (
                  <Navigate to="/inicio" replace />
                )
              }
            />
            <Route
              path="/inicio"
              element={<Inicio onLogin={setIsAuthenticated} loggedIn={isAuthenticated} />}
            />
  
            <Route exact path="/productores" element={<Productores />} />
            <Route exact path="/registrarProductores" element={<RegistrarProductores />} />
  
            <Route exact path="/gestores" element={<Gestores />} />
            <Route exact path="/registrarGestores" element={<RegistrarGestores />} />
  
            <Route exact path="/transformadores" element={<Transformadores />} />
            <Route exact path="/registrarTransformadores" element={<RegistrarTransformadores />} />
  
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/registrarTransacciones" element={<RegistrarTransacciones />} />
  
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/logout" element={<Logout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />} />
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

