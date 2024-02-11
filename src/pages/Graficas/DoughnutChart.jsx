import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

const DoughnutChart = () => {
  const [estadisticaData, setEstadisticaData] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/material-total/pc');
        const data = await response.json();
        setEstadisticaData(data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  if (!estadisticaData) {
    // Mientras se obtienen los datos, podrías mostrar un indicador de carga o un mensaje
    return <p>Cargando...</p>;
  }

  const data = {
    labels: estadisticaData.material,
    datasets: [
      {
        data: estadisticaData.porcentajes,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8C76B3', '#4BC0C0'],
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      position: 'right',
    },
  };

  return (
    <div style={{ position: 'absolute', margin: '0 auto', paddingTop: '20px', left:'1400px' }}>
      
      <div style={{ height: '500px' }}> 
      <h1 style={{ textAlign: 'center' }}>Gráfico Circular</h1>
      <div>
        <p>Total: {estadisticaData.total}</p>
        <p>Plan Colectivo: {estadisticaData.planColectivo}</p>
      </div>
      <Doughnut data={data} options={options} />
    </div>
    </div>
  );
};

export default DoughnutChart;

