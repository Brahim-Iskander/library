import React, { useState } from "react";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const DeleteUserByEmail = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useUser();

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8090/api/admin/delete-user",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "application/json",
          },
          data: { email },
        }
      );

      setMessage(response.data.message || "User deleted successfully ✅");
      setEmail("");
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || "Error deleting user ❌");
      } else {
        setMessage("Error connecting to server ❌");
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
        Delete User
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          width: "100%",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: "60%" }}>
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

        <button
          onClick={handleDelete}
          style={{
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            fontWeight: "600",
            fontSize: "15px",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#a71d2a")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#dc3545")}
        >
          Delete User
        </button>
      </div>

      {message && (
        <p
          style={{
            marginTop: "20px",
            textAlign: "center",
            color: message.includes("success") ? "#28a745" : "#dc3545",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default DeleteUserByEmail;