import React, { useEffect, useState } from "react";
import axios from "axios";
import StatCard from "../../admin/components/StatCard";
import StatsBarChart from "../../admin/components/StatsBarChart";
import StatsPieChart from "../../admin/components/StatsPieChart";
import MonthlyEmpruntsChart from "../../admin/components/MonthlyEmpruntsChart";
import TopBooksChart from "../../admin/components/TopBooksChart";
import TopStudentsChart from "../../admin/components/TopStudentsChart";

function AdminDashboard() {
  const [stats, setStats] = useState({ students: 0, books: 0, emprunts: 0 });
  const [monthlyEmprunts, setMonthlyEmprunts] = useState([]);
  const [topBooks, setTopBooks] = useState([]);
  const [topStudents, setTopStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Global stats
    axios
      .get("http://localhost:8090/api/admin/stats", config)
      .then((res) => setStats(res.data))
      .catch((err) => console.error(err));

    // Monthly emprunts
    axios
      .get("http://localhost:8090/api/admin/monthly-emprunts", config)
      .then((res) => setMonthlyEmprunts(res.data))
      .catch((err) => console.error(err));

    // Top books
    axios
      .get("http://localhost:8090/api/admin/top-books", config)
      .then((res) => setTopBooks(res.data))
      .catch((err) => console.error(err));

    // Top students
    axios
      .get("http://localhost:8090/api/admin/top-students", config)
      .then((res) => setTopStudents(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>Admin Dashboard</h2>

      {/* ========== STAT CARDS ========== */}
      <div style={cardGrid}>
        <StatCard title="Students" value={stats.students} />
        <StatCard title="Books" value={stats.books} />
        <StatCard title="Emprunts" value={stats.emprunts} />
      </div>

      {/* ========== GLOBAL CHARTS ========== */}
      <div style={chartGrid}>
        <div style={chartBox}>
          <h3>Global Statistics</h3>
          <StatsBarChart
            students={stats.students}
            books={stats.books}
            loans={stats.emprunts}
          />
        </div>

        <div style={chartBox}>
          <h3>Distribution</h3>
          <StatsPieChart
            students={stats.students}
            books={stats.books}
            loans={stats.emprunts}
          />
        </div>
      </div>

      {/* ========== MONTHLY EMPRUNTS ========== */}
      <div style={fullWidthChart}>
        <h3>Monthly Emprunts</h3>
        <MonthlyEmpruntsChart data={monthlyEmprunts} />
      </div>

      {/* ========== TOP BOOKS ========== */}
      <div style={fullWidthChart}>
        <h3>Most Borrowed Books</h3>
        <TopBooksChart books={topBooks} />
      </div>

      {/* ========== TOP STUDENTS ========== */}
      <div style={fullWidthChart}>
        <h3>Most Active Students</h3>
        <TopStudentsChart students={topStudents} />
      </div>
    </div>
  );
}

// ===================== STYLES =====================
const containerStyle = {
  padding: "30px",
  backgroundColor: "#f4f6f9",
  minHeight: "100vh",
};

const cardGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  marginBottom: "40px",
};

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "40px",
};

const chartBox = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
};

const fullWidthChart = {
  background: "#ffffff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  marginBottom: "40px",
};

export default AdminDashboard;
