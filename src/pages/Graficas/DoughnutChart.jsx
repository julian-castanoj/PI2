import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2'; 
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

const DoughnutChart = () => {
  const [estadisticaData, setEstadisticaData] = useState(null);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/transacciones');
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
    <div>
      <h1>Gráfico Circular</h1>
      <div>
        <p>Total: {estadisticaData.total}</p>
        <p>Plan Colectivo: {estadisticaData.planColectivo}</p>
      </div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;

/*
/* 




import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';

const Estadisticas = ({ data }) => {
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    // Procesar los datos para adaptarlos a la estructura necesaria
    const processedData = data.map(item => ({
      label: item.planColectivo,
      total: item.cantidad,
      data: item.material.split(',').map((material, index) => ({
        label: material.trim(),
        value: parseInt(item.cantidad.split(',')[index].trim(), 10),
      })),
    }));

    // Crear un objeto para almacenar la información del gráfico
    const chartInfo = {
      labels: processedData.map(item => item.label),
      datasets: [{
        data: processedData.map(item => item.total),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8C76B3', '#4BC0C0'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8C76B3', '#4BC0C0'],
      }],
    };

    // Actualizar el estado del gráfico
    setChartData(chartInfo);
  }, [data]);

  return (
    <div>
      <h2>Diagrama de Pastel - Planes Colectivos</h2>
      <Pie data={chartData} />
    </div>
  );
};


*/ 