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

          <blockquote>
            <BarChart />
          </blockquote>
          <blockquote>
            <DoughnutChart />
          </blockquote>
          <blockquote>
            <LineChartG />
          </blockquote>
          <blockquote>
            <LineChartT />
          </blockquote>

          
        </StatsLayout>
      

    </div>
    </div >
  );
};

export default Estadisticas;
