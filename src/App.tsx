import type { Component } from 'solid-js';
import { createResource, For } from 'solid-js';
import { SolidApexCharts } from 'solid-apexcharts';
import type { ApexOptions } from 'apexcharts';

interface OHLCData {
  time: number;
  open: string;
  high: string;
  low: string;
  close: string;
  vwap: string;
  volume: string;
  count: number;
}

interface KrakenResponse {
  error: string[];
  result: {
    XXBTZUSD: [number, string, string, string, string, string, string, number][];
    last: number;
  };
}

const App: Component = () => {
  const [data] = createResource(
    () => fetch('https://api.kraken.com/0/public/OHLC?interval=1440&pair=XXBTZUSD').then(res => res.json() as Promise<KrakenResponse>),
    { initialValue: { error: [], result: { XXBTZUSD: [], last: 0 } } }
  );

  const ohlc = () => {
    const raw = data()?.result?.XXBTZUSD || [];
    return raw.slice(0, 30).map((item): OHLCData => ({
      time: item[0],
      open: item[1],
      high: item[2],
      low: item[3],
      close: item[4],
      vwap: item[5],
      volume: item[6],
      count: item[7]
    }));
  };

  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: 450
    },
    title: {
      text: 'Bitcoin OHLC (XXBTZUSD) - Last 30 Days',
      align: 'center',
      style: {
        fontSize: '18px',
        fontWeight: 'bold'
      }
    },
    xaxis: {
      type: 'datetime',
      labels: {
        datetimeUTC: false
      }
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: '#00B746',
          downward: '#FF4343'
        },
        wick: {
          useFillColor: true
        }
      }
    },
    tooltip: {
      shared: true,
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`
      }
    }
  };

  const series = () => ({
    data: ohlc().map(item => ({
      x: new Date(item.time * 1000),
      y: [parseFloat(item.open), parseFloat(item.high), parseFloat(item.low), parseFloat(item.close)]
    }))
  });

  return (
    <div class="p-8">
      <h1 class="text-3xl font-bold text-center mb-8">Bitcoin OHLC Chart (Kraken API)</h1>
      <div class="max-w-5xl mx-auto">
        <SolidApexCharts
          options={options}
          series={[series()]}
          type="candlestick"
          height={450}
        />
      </div>
    </div>
  );
};

export default App;
