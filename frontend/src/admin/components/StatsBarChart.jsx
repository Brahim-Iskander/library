import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function StatsBarChart({ students, books, loans }) {
  const data = {
    labels: ["Students", "Books", "Loans"],
    datasets: [
      {
        data: [students, books, loans],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // important to stop moving
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div style={{ height: "350px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default StatsBarChart;