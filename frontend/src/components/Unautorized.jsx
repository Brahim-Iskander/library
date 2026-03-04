import React from "react";

function Unauthorized() {
  return (
    <div style={containerStyle}>
      
      {/* ===== LOGOS SECTION ===== */}
      <div style={logoContainer}>
        <img
          src="/university.png"
          alt="Logo 1"
          style={logoStyle}
        />

        <img
          src="/logofsm.png"
          alt="Logo 2"
          style={logoStyle}
        />
      </div>

      {/* ===== MESSAGE SECTION ===== */}
      <div style={cardStyle}>
        <h1 style={errorCode}>403</h1>
        <h2 style={title}>Access Denied</h2>
        <p style={message}>
          You do not have permission to access this page.
        </p>

        <button
          style={buttonStyle}
          onClick={() => window.history.back()}
        >
          Go Back
        </button>
      </div>

    </div>
  );
}

/* ================= STYLES ================= */

const containerStyle = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #0628bdff, #764ba2)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const logoContainer = {
  display: "flex",
  gap: "40px",
  marginBottom: "30px",
};

const logoStyle = {
  width: "120px",
  height: "120px",
  objectFit: "contain",
  padding: "10px",
  borderRadius: "12px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "40px",
  borderRadius: "16px",
  textAlign: "center",
  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  maxWidth: "400px",
  width: "100%",
};

const errorCode = {
  fontSize: "72px",
  margin: "0",
  color: "#764ba2",
};

const title = {
  margin: "10px 0",
};

const message = {
  color: "#555",
  marginBottom: "20px",
};

const buttonStyle = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#667eea",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Unauthorized;