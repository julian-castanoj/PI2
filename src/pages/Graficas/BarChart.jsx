import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

const BarChart = () => {
  const [data, setData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Sumatoria',
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
    const endpoint = 'http://localhost:3000/material-productores/total';

    fetch(endpoint)
      .then(response => response.json())
      .then(dataFromApi => {
        const labels = dataFromApi.data ? dataFromApi.data.map(item => item.productorNombre) : [];
        const sumatorias = dataFromApi.data ? dataFromApi.data.map(item => parseInt(item.sumatoria)) : [];


        setData({
          labels: labels,
          datasets: [
            {
              label: 'Sumatoria',
              data: sumatorias,
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        });
      })
      .catch(error => console.error('Error al obtener datos:', error));
  }, []);

  return (
    <div style={{ width: '50%', margin: '0 auto', paddingTop: '20px', position:'absolute',left:'400px' }}>
      <h1 style={{ textAlign: 'center' }}>Gráfico de Barras</h1>
      <div style={{ height: '500px' }}> 
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};
export default BarChart;
