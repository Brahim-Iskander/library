import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatsPieChart({ students, books, loans }) {
  const data = {
    labels: ["Students", "Books", "Loans"],
    datasets: [
      {
        data: [students, books, loans],
        backgroundColor: ["#3498db", "#2ecc71", "#e74c3c"],
      },
    ],
  };

  return (
    <div style={{ height: "350px" }}>
      <Pie data={data} />
    </div>
  );
}

export default StatsPieChart;