import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const monthNames = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec"
];

function MonthlyEmpruntsChart({ data }) {

  const counts = new Array(12).fill(0);

  data.forEach(item => {
    counts[item.month - 1] = item.count;
  });

  const chartData = {
    labels: monthNames,
    datasets: [
      {
        label: "Emprunts per Month",
        data: counts,
        borderColor: "#6c5ce7",
        backgroundColor: "rgba(108,92,231,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <div style={{ height: "400px" }}>
      <Line data={chartData} />
    </div>
  );
}

export default MonthlyEmpruntsChart;