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



const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />


          <Route exact path="/usuarios" element={<Usuarios />} />
          <Route exact path="/registrarMiembros" element={<RegistrarMiembros />} />

          <Route path="/transacciones" element={<Transacciones />} />
          <Route path="/estadisticas" element={<Estadisticas />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;