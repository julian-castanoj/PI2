import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Inicio from './pages/Inicio.jsx';
import Usuarios from './pages/Usuarios.jsx';
import Estadisticas from './pages/Estadisticas.jsx';
import Transacciones from './pages/Transacciones.jsx';
import Logout from './pages/Logout.jsx';
import RegistrarMiembros from './pages/RegistrarMiembros.jsx'
import Gestores from './pages/Gestores.jsx';
import Transformadores from './pages/Transformadores.jsx';
import RegistrarGestores from './pages/RegistrarGestores.jsx'
import RegistrarTransformadores from './pages/RegistrarTransformadores.jsx'
import RegistrarTransacciones from './pages/RegistrarTransacciones.jsx'



const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />


          <Route exact path="/usuarios" element={<Usuarios />} />
          <Route exact path="/registrarMiembros" element={<RegistrarMiembros />} />

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
    </BrowserRouter>
  );
};

export default App;