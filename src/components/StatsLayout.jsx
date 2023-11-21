import React from 'react';

const StatsLayout = ({ children }) => {
  return (
    <div>
      {/* Agrega cualquier contenido compartido que desees */}
      <h1>Encabezado de Estadísticas</h1>
      <div>{children}</div>
      {/* Agrega cualquier contenido compartido que desees */}
      <footer>
        <p>Pie de página común para las páginas de estadísticas</p>
      </footer>
    </div>
  );
};

export default StatsLayout;