import React from 'react';
import BarChart from '../pages/Graficas/BarChart';
import DoughnutChart from '../pages/Graficas/DoughnutChart';
import LineChartG from '../pages/Graficas/LineChartG';
import LineChartT from '../pages/Graficas/LineChartT';
import StatsLayout from '../components/StatsLayout';

const Estadisticas = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <StatsLayout>            
            <DoughnutChart />
            <BarChart />
            <LineChartG />
            <LineChartT />         
        </StatsLayout>
    </div>
    </div >
  );
};

export default Estadisticas;
