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

function TopStudentsChart({ students }) {
  if (!students || students.length === 0) return <p>No data</p>;

  const data = {
    labels: students.map(s => s.studentName),
    datasets: [
      {
        label: "Number of Emprunts",
        data: students.map(s => s.empruntCount),
        backgroundColor: "#00b894",
        borderRadius: 6
      }
    ]
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    plugins: { legend: { display: false } }
  };

  return <div style={{ height: "400px" }}><Bar data={data} options={options} /></div>;
}

export default TopStudentsChart;