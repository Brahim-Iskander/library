import ManageUser from "../components/ManageUser";
import DeleteUserByEmail from "../components/deletuser";

export default function Manage() {
  return (
    <div style={pageStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>User Management</h1>
        <p style={descriptionStyle}>
          Here you can change user roles or delete users from the system.
        </p>
      </div>

      <div style={cardContainer}>
        <ManageUser />
        <DeleteUserByEmail />
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const pageStyle = {
  minHeight: "100vh",
  backgroundColor: "#f4f6f9",
  padding: "40px 20px",
};

const headerStyle = {
  textAlign: "center",
  marginBottom: "40px",
};

const titleStyle = {
  fontSize: "28px",
  marginBottom: "10px",
  textAlign: "left",
  color: "#333",
};

const descriptionStyle = {
  color: "#666",
  fontSize: "15px",
    textAlign: "left",

};

const cardContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "40px",
  flexWrap: "wrap",
};