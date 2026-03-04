import { Outlet, Link } from "react-router-dom";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import "./style.userlayout.css";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { useState } from "react";
import { Box } from "@mui/material";
function Layout() {
  const [clickedId, setClickedId] = useState(1);
  const { setUser } = useUser();
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}

      <div
        style={{
          width: "250px",
          background: "#1e3a8a",
          color: "white",
          padding: "20px",
          position: "fixed",
          height: "100vh",
        }}
      >
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>FSM Library</h2>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "20px",
            justifyContent: "space-around",
          }}
        >
          <img
            src="/logofsm.png"
            alt="User Avatar"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
          <img
            src="/university.png"
            alt="University Logo"
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              marginBottom: "10px",
            }}
          />
        </Box>

        <nav
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            borderTop: "1px solid rgba(255, 255, 255, 0.2)",
            paddingTop: "20px",
            gap: "15px",
          }}
        >
          <p
            className={`btns ${clickedId === 1 ? "active" : ""}`}
            onClick={() => setClickedId(1)}
          >
            <DashboardCustomizeIcon style={{ marginRight: "8px" }} />
            <Link to="/admin/dashbored">Dashboard</Link>
          </p>
          <p
            className={`btns ${clickedId === 2 ? "active" : ""}`}
            onClick={() => setClickedId(2)}
          >
            <ManageAccountsIcon style={{ marginRight: "8px" }} />
            <Link to="/admin/manage-librarian">Manage Librarian</Link>
          </p>
          <p
            className={`btns ${clickedId === 4 ? "active" : ""}`}
            onClick={() => setClickedId(4)}
          >
            <LibraryBooksIcon style={{ marginRight: "8px" }} />
            <Link to="/admin/manage-books">Manage Books</Link>
          </p>

          <p
            className={`btns ${clickedId === 3 ? "active" : ""}`}
            onClick={() => setClickedId(3)}
          >
            <PersonOutlineIcon style={{ marginRight: "8px" }} />
            <Link to="/admin/profile">Profile</Link>
          </p>
        </nav>
        <button
          className="btnclose"
          onClick={() => {
            setUser(null);
            localStorage.clear();
            navigate("/login"); // Redirect to login page
          }}
        >
          Logout
        </button>
      </div>

      {/* Right Content */}
      <div
        style={{
          marginLeft: "290px",
          width: "100%",
        }}
      >
        <UserNavbar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
