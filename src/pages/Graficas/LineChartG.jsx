import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import 'chart.js/auto';

const LineChartG = ({ endpoint }) => {
  const [chartData, setChartData] = useState({});
  const [selectedGestorRecibe, setSelectedGestorRecibe] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [gestoresRecibe, setGestoresRecibe] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos desde el endpoint
        const response = await fetch('http://localhost:3000/transacciones');
        const dataFromAPI = await response.json();

        // Obtener la lista de gestoresRecibe disponibles
        const uniqueGestoresRecibe = Array.from(new Set(dataFromAPI.map(item => item.gestorRecibe_id)));
        setGestoresRecibe(uniqueGestoresRecibe);

        // Procesar datos para adaptarlos a la estructura necesaria
        const processedData = dataFromAPI.map(item => {
          return {
            gestorRecibe: item.gestorRecibe_id,
            fecha: new Date(item.fecha),
            data: item.material.split(',').map((material, index) => ({
              label: `${material.trim()} - Gestor ${item.gestorRecibe_id}`,
              y: parseInt(item.cantidad.split(',')[index].trim(), 10),
            })),
          };
        });

        // Filtrar datos según el gestorRecibe seleccionado
        const filteredByGestorRecibe = selectedGestorRecibe
          ? processedData.filter(item => item.gestorRecibe === parseInt(selectedGestorRecibe, 10))
          : processedData;

        // Filtrar datos según el material seleccionado
        const filteredByMaterial = selectedMaterial
          ? filteredByGestorRecibe.map(item => ({
              ...item,
              data: item.data.filter(entry => entry.label.startsWith(selectedMaterial)),
            }))
          : filteredByGestorRecibe;

        const getRandomColor = () => {
          // Función para generar colores aleatorios
          return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        };

        const datasets = filteredByMaterial[0]?.data
          .filter(entry => entry.label !== '') // Filtrar gestoresRecibe sin materiales asociados
          .map((entry, materialIndex) => ({
            label: entry.label,
            data: filteredByMaterial.map(item => ({ x: item.fecha, y: item.data[materialIndex].y })),
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
  }, [selectedGestorRecibe, selectedMaterial, endpoint]);

  if (!chartData.datasets) {
    // Manejar el caso en que el estado chartData esté vacío
    return null;
  }

  return (
    <div>
      <h1>Cantidad de Material a lo largo del Tiempo</h1>
      <div>
        <label>
          Filtrar por Gestor Recibe:
          <select onChange={(e) => setSelectedGestorRecibe(e.target.value)}>
            <option value="">Todos</option>
            {gestoresRecibe.map(id => (
              <option key={id} value={id}>
                Gestor {id}
              </option>
            ))}
          </select>
        </label>
        <label>
          Filtrar por Material:
          <select onChange={(e) => setSelectedMaterial(e.target.value)}>
            <option value="">Todos</option>
            {['Papel', 'Vidrio', 'Plástico Flexible', 'Plástico Rígido', 'Cartón'].map((material, index) => (
              <option key={index} value={material}>
                {material}
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

export default LineChartG;
