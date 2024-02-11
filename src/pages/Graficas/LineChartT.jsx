import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';

const LineChartT = () => {
  const [chartData, setChartData] = useState({});
  const [selectedTransformador, setSelectedTransformador] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [transformadores, setTransformadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada al endpoint para obtener los datos
        const response = await fetch('https://backend-ac-production.up.railway.app/material-productores/pc');
        const dataFromAPI = await response.json();
        console.log('dataFromAPI:', dataFromAPI);
        // Obtener la lista de transformadores disponibles
        const uniqueTransformadores = Array.from(new Set(dataFromAPI.map(item => item.transformadorid)));
        setTransformadores(uniqueTransformadores);

        // Procesar datos para adaptarlos a la estructura necesaria
        const processedData = dataFromAPI.map(item => ({
          transformador: item.transformadorid,
          fecha: item.fecha,
          cantidad: item.cantidad,
        }));

        // Filtrar datos según el transformador seleccionado
        const filteredByTransformador = selectedTransformador
          ? processedData.filter(item => item.transformador === parseInt(selectedTransformador, 10))
          : processedData;

        // Filtrar datos según el material seleccionado (si aplica)
        const filteredData = selectedMaterial
          ? filteredByTransformador.filter(item => item.material === selectedMaterial)
          : filteredByTransformador;

        const getRandomColor = () => {
          // Función para generar colores aleatorios
          return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        };

        const datasets = filteredData.map(item => ({
          label: `Cantidad de Material - Transformador ${item.transformador}`,
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
  }, [selectedTransformador, selectedMaterial]);

  if (!chartData.datasets) {
    // Manejar el caso en que el estado chartData esté vacío
    return null;
  }

  return (
    <div>
      <h1>Cantidad de Material a lo largo del Tiempo</h1>
      <div>
        <label>
          Filtrar por Transformador:
          <select onChange={(e) => setSelectedTransformador(e.target.value)}>
            <option value="">Todos</option>
            {transformadores.map(id => (
              <option key={id} value={id}>
                Transformador {id}
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
              display: false, // Oculta la leyenda
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
