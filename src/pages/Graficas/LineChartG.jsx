import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import React, { useEffect, useState } from 'react';

const LineChartT = () => {
  const [chartData, setChartData] = useState({});
  const [selectedGestor, setSelectedGestor] = useState('');
  const [gestores, setGestores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada al endpoint para obtener los datos
        const response = await fetch('https://backend-ac-production.up.railway.app/material-productores/pc');
        const dataFromAPI = await response.json();
        console.log('dataFromAPI:', dataFromAPI);

        // Obtener la lista de gestores disponibles
        const uniqueGestores = Array.from(new Set(dataFromAPI.map(item => item.productorId)));
        setGestores(uniqueGestores);

        // Procesar datos para adaptarlos a la estructura necesaria
        const processedData = dataFromAPI.map(item => ({
          productorId: item.productorId,
          fecha: item.fecha,
          cantidad: item.cantidad,
        }));

        // Filtrar datos según el gestor seleccionado
        const filteredByGestor = selectedGestor
          ? processedData.filter(item => item.productorId === parseInt(selectedGestor, 10))
          : processedData;

        const getRandomColor = () => {
          // Función para generar colores aleatorios
          return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        };

        const datasets = filteredByGestor.map(item => ({
          label: `Cantidad - Gestor ${item.productorId}`,
          data: [{ x: item.fecha, y: item.cantidad }],
          borderColor: getRandomColor(),
          backgroundColor: 'rgba(255, 255, 255, 0)',
        }));

        setChartData({
          datasets,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedGestor]);

  if (!chartData.datasets) {
    
    return null;
  }

  return (
    
    <div>
      <h1>Cantidad a lo largo del Tiempo</h1>
      <div>
        <label>
          Filtrar por Gestor:
          <select onChange={(e) => setSelectedGestor(e.target.value)}>
            <option value="">Todos</option>
            {gestores.map(id => (
              <option key={id} value={id}>
                Gestor {id}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Line
        data={{
          datasets: chartData.datasets,
        }}
        options={{
          plugins: {
            legend: {
              display: false, 
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                displayFormats: {
                  day: 'yyyy-MM-dd',
                },
              },
              title: {
                display: true,
                text: 'Fecha',
              },
            },
            y: {
              type: 'linear',
              beginAtZero: true,
              title: {
                display: true,
                text: 'Cantidad',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChartT;
