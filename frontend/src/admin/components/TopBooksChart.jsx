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

function TopBooksChart({ books }) {

  if (!books || books.length === 0) {
    return <p>No data available</p>;
  }

  const data = {
    labels: books.map(book => book.title),
    datasets: [
      {
        label: "Number of Emprunts",
        data: books.map(book => book.count),
        backgroundColor: "#6c5ce7",
        borderRadius: 6
      }
    ]
  };

  const options = {
    indexAxis: "y", // horizontal chart (better for titles)
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div style={{ height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default TopBooksChart;