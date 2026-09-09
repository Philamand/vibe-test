import type { Component } from 'solid-js';
import { SolidApexCharts } from 'solid-apexcharts';
import type { ApexOptions } from 'apexcharts';

const App: Component = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false
      }
    },
    series: [{
      name: 'Sales',
      data: [30, 40, 45, 50, 49, 60, 70, 91]
    }],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    }
  };

  return (
    <div class="p-8">
      <h1 class="text-3xl font-bold text-center mb-8">ApexCharts with Solid.js</h1>
      <div class="max-w-4xl mx-auto">
        <SolidApexCharts options={options} series={options.series} type="bar" height={350} />
      </div>
    </div>
  );
};

export default App;
