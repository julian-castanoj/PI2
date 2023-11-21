import React, { useEffect, useState } from 'react';
import 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';


const LineChartT = () => {
  const [chartData, setChartData] = useState({});
  const [selectedTrasformador, setSelectedTrasformador] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [transformadores, setTransformadores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada al endpoint para obtener los datos
        const response = await fetch('http://localhost:3000/transacciones');
        const dataFromAPI = await response.json();

        // Obtener la lista de transformadores disponibles
        const uniqueTransformadores = Array.from(new Set(dataFromAPI.map(item => item.trasformador_id)));
        setTransformadores(uniqueTransformadores);

        // Procesar datos para adaptarlos a la estructura necesaria
        const processedData = dataFromAPI.map(item => {
          return {
            trasformador: item.trasformador_id,
            fecha: item.fecha,
            data: item.materials.map(material => ({
              label: `${material} - Trasformador ${item.trasformador_id}`,
              y: item.cantidad,
            })),
          };
        });

        // Filtrar datos según el trasformador seleccionado
        const filteredByTrasformador = selectedTrasformador
          ? processedData.filter(item => item.trasformador === parseInt(selectedTrasformador, 10))
          : processedData;

        // Filtrar datos según el material seleccionado
        const filteredByMaterial = selectedMaterial
          ? filteredByTrasformador.map(item => ({
              ...item,
              data: item.data.filter(entry => entry.label.startsWith(selectedMaterial)),
            }))
          : filteredByTrasformador;

        const getRandomColor = () => {
          // Función para generar colores aleatorios
          return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`;
        };

        const datasets = filteredByMaterial[0]?.data
          .filter(entry => entry.label !== '') // Filtrar trasformadores sin materiales asociados
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
  }, [selectedTrasformador, selectedMaterial]);

  if (!chartData.datasets) {
    // Manejar el caso en que el estado chartData esté vacío
    return null;
  }

  return (
    <div>
      <h1>Cantidad de Material a lo largo del Tiempo</h1>
      <div>
        <label>
          Filtrar por Trasformador:
          <select onChange={(e) => setSelectedTrasformador(e.target.value)}>
            <option value="">Todos</option>
            {transformadores.map(id => (
              <option key={id} value={id}>
                Trasformador {id}
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

export default LineChartT;