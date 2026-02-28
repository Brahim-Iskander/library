import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Avatar, Divider } from "@mui/material";
import { useUser } from "../../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Profile() {
    const { user } = useUser();

  useEffect(() => {
  const fetchEmprunts = async () => {
    try {
      const res = await axios.get("http://localhost:8090/api/emprunts/my", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setEmprunts(res.data);
    } catch (error) {
      console.error("Error fetching emprunts", error);
    }
  };

  fetchEmprunts();
}, []);
  const [emprunts, setEmprunts] = useState([]);
  const totalBorrowed = emprunts.length;

const activeLoans = emprunts.filter(
  (e) => e.status === "borrowed"
).length;
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} color="text.primary">
          Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage your account information
        </Typography>
      </Box>

      {/* Top Card — Avatar + Stats */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          p: 3,
          mb: 3,
          borderRadius: 3,
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "#fff",
          boxShadow: "0 4px 20px rgba(25, 118, 210, 0.3)",
        }}
      >
        <Avatar
          sx={{
            width: 72,
            height: 72,
            fontSize: 28,
            fontWeight: 700,
            bgcolor: "rgba(255,255,255,0.25)",
            border: "3px solid rgba(255,255,255,0.5)",
          }}
        >
          {}
        </Avatar>
        {/* Left: Name + Member Since */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h5" fontWeight={700}>
            {user ? user.fullname : "John Doe"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.85, mt: 0.25 }}>
            Member since{" "}
            {user
              ? new Date(user.memberSince).toLocaleDateString()
              : "Jan 2023"}
          </Typography>
        </Box>

        {/* Right: Stats aligned in column */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            minWidth: 160,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Total Borrowed
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {totalBorrowed}
            </Typography>
          </Box>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.85 }}>
              Active Loans
            </Typography>
            <Typography variant="body1" fontWeight={700}>
              {activeLoans}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Account Information Card */}
      <Box
        sx={{
          p: 3,
          borderRadius: 3,
          border: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 2.5 }}>
          Account Information
        </Typography>
        <Grid
          container
          spacing={2.5}
          sx={{ display: "flex", flexWrap: "wrap", flexDirection: "column" }}
        >
          {[
            {
              icon: <PersonOutlineIcon />,
              label: "Full Name",
              value: user ? user.fullname : "",
            },
            {
              icon: <EmailOutlinedIcon />,
              label: "Email",
              value: user ? user.email : "",
            },
            {
              icon: <CalendarTodayIcon />,
              label: "Member Since",
              value: user
                ? new Date(user.memberSince).toLocaleDateString()
                : "",
            },
            {
              icon: <MenuBookIcon />,
              label: "Books Borrowed",
              value: totalBorrowed,
            },
          ].map(({ icon, label, value }) => (
            <Grid item xs={12} sm={6} key={label}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",

                  gap: 1.5,
                  p: 2,
                  borderRadius: 2,
                  bgcolor: "grey.50",
                  border: "1px solid",
                  borderColor: "grey.100",
                }}
              >
                <Box
                  sx={{
                    color: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: 1.5,
                    bgcolor: "primary.50",
                  }}
                >
                  {icon}
                </Box>
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    display="block"
                  >
                    {label}
                  </Typography>
                  <Typography variant="body2" fontWeight={600}>
                    {value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
