import { Outlet, Link } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import HistoryIcon from "@mui/icons-material/History";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import "./style.userlayout.css";
import { useUser } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import { useState } from "react";
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
        <h2>FSM Library</h2>

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
            <Link to="/user/dashbored">Dashboard</Link>
          </p>

          <p
            className={`btns ${clickedId === 2 ? "active" : ""}`}
            onClick={() => setClickedId(2)}
          >
            <MenuBookIcon style={{ marginRight: "8px" }} />
            <Link to="/user/books">Browse Books</Link>
          </p>

          <p
            className={`btns ${clickedId === 3 ? "active" : ""}`}
            onClick={() => setClickedId(3)}
          >
            <LibraryBooksIcon style={{ marginRight: "8px" }} />
            <Link to="/user/borrowed">My Borrowed Books</Link>
          </p>

          <p
            className={`btns ${clickedId === 4 ? "active" : ""}`}
            onClick={() => setClickedId(4)}
          >
            <HistoryIcon style={{ marginRight: "8px" }} />
            <Link to="/user/history">History</Link>
          </p>

          <p
            className={`btns ${clickedId === 5 ? "active" : ""}`}
            onClick={() => setClickedId(5)}
          >
            <PersonOutlineIcon style={{ marginRight: "8px" }} />
            <Link to="/user/profile">Profile</Link>
          </p>
        </nav>
        <button
        className="btnclose"
          onClick={() => {
            setUser(null);
             // Clear user data on logout
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
