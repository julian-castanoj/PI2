import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

const BarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Cantidad',
        data: [],
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  });

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    // Reemplaza la siguiente URL con la que corresponda a tu endpoint
    const endpoint = 'http://localhost:3000/productor/total';
    
    fetch(endpoint)
      .then(response => response.json())
      .then(dataFromApi => {
        const labels = dataFromApi.map(item => item.id);
        const cantidades = dataFromApi.map(item => item.cantidad);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidades,
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        });
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, []); // El segundo argumento del useEffect asegura que se ejecute solo una vez al montar el componente

  return (
    <div>
      <h1>Gráfico de Barras</h1>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;