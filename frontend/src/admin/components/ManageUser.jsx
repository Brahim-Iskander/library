import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const ManageUser = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [message, setMessage] = useState("");
  const { user } = useUser();
  const handleChangeRole = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8090/api/admin/change-role",
        { email, newRole: role },
        { headers: { Authorization: `Bearer ${user.token}` } },
      );
      setMessage(response.data.message); // ✅ safe access
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Error occurred");
      } else {
        setMessage("Error connecting to server");
      }
    }
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "50px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
        backgroundColor: "#fff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "20px", color: "#333", textAlign: "center" }}>
        Manage User Role
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ marginBottom: "5px", fontWeight: "500", color: "#555" }}
          >
            Email
          </label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
            }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label
            style={{ marginBottom: "5px", fontWeight: "500", color: "#555" }}
          >
            Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: "14px",
              cursor: "pointer",
            }}
          >
            <option value="STUDENT">STUDENT</option>
            <option value="LIBRARIAN">LIBRARIAN</option>
          </select>
        </div>

        <button
          onClick={handleChangeRole}
          style={{
            padding: "12px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Change Role
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: "#28a745",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ManageUser;
