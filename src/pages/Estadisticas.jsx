import React from 'react';
import BarChart from '../pages/Graficas/BarChart';
import DoughnutChart from '../pages/Graficas/DoughnutChart';
import LineChartG from '../pages/Graficas/LineChartG';
import LineChartT from '../pages/Graficas/LineChartT';
import StatsLayout from '../components/StatsLayout';

const Estadisticas = () => {
  return (
    <div>
      
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
       
          <BarChart />
          <LineChartT />
          <LineChartG />
          <DoughnutChart />
        
      </div>
    </div >
  );
};

export default Estadisticas;
