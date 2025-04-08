import React, { useState } from 'react';
import styles from './Chart.module.css';
import { convertData } from '../../helpers/convertdata';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function Chart({ chart, setChart }) {
  const [type, setType] = useState("prices");
  const typeHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      const type = e.target.innerText.toLowerCase().replace(" ", "_");
      console.log('New Type:', type);
      setType(type);
    }
  };

  if (!chart) return null;

  const chartData = convertData(chart, type);
  console.log('Raw Chart Data:', chart);
  console.log('Converted Chart Data:', chartData);

  return (
    <div className={styles.backdrop} onClick={() => setChart(null)}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <span
          className={styles.close}
          onClick={(e) => {
            e.stopPropagation();
            setChart(null);
          }}
        >
          X
        </span>
        <div className={styles.chart}>
          <div className={styles.name}>
            <img src={chart.coin.image} alt="" />
            <p>{chart.coin.name}</p>
          </div>
          <div className={styles.graph}>
            <ChartComponent data={chartData} type={type} />
          </div>
          <div className={styles.types} onClick={typeHandler}>
            <button className={type === "prices" ? styles.selected : null}>Prices</button>
            <button className={type === "market_caps" ? styles.selected : null}>Market Caps</button>
            <button className={type === "total_volume" ? styles.selected : null}>Total Volume</button>
          </div>
          <div className={styles.details}>
            <div>
              <p>Prices:</p>
              <span>$ {chart.coin.current_price}</span>
            </div>
            <div>
              <p>ATH:</p>
              <span>$ {chart.coin.ath}</span>
            </div>
            <div>
              <p>Market Cap:</p>
              <span>$ {chart.coin.market_cap}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ChartComponent = ({ data, type }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid stroke="#404042" />
        <XAxis dataKey="date" hide />
        <YAxis dataKey={type} domain={["auto", "auto"]} />
        <Legend />
        <Tooltip contentStyle={{ background: '#fff', border: '1px solid #ccc', zIndex: 1000 }}
        formatter={(value, name) => [value.toLocaleString(), name]}
        labelFormatter={(label) => `Date: ${label}`}
        />
        <Line type="monotone" dataKey={type} stroke="#81405a" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;