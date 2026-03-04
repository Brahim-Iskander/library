import * as React from "react";
import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useUser } from "../../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const { setUser } = useUser();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8090/api/users/login",
        form,
      );
      console.log("API response:", response.data);

      // Save the token if login successful
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        if (response.data.role === "ADMIN") {
          navigate("/admin/dashbored");
        } else if (response.data.role === "LIBRARIAN") {
          navigate("/librarian/dashbored");
        } else if (response.data.role === "STUDENT") {
          navigate("/user/dashbored");
        }


    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    }
  };
  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Grid
          container
          sx={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* ── LEFT SIDE — Image Background ── */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: { xs: "none", md: "block" }, // hidden on mobile
            }}
          />

          {/* ── RIGHT SIDE — Login Form ── */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#fff",
              px: { xs: 3, sm: 6, md: 8 },
            }}
          >
            <Box sx={{ width: "100%", maxWidth: 400 }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              {/* Avatar + Title */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mb: 4,
                }}
              >
                <Avatar
                  sx={{ bgcolor: "primary.main", width: 56, height: 56, mb: 2 }}
                >
                  <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
                  Sign In
                </Typography>
                <Typography variant="body2" color="text.secondary" mt={0.5}>
                  Welcome back — enter your credentials
                </Typography>
              </Box>

              {/* Form */}
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {/* Email */}
                <TextField
                  label="Email address"
                  type="email"
                  placeholder="iskanderbrahim@fsm-monastir.tn"
                  fullWidth
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange("email")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 2.5 }}
                />

                {/* Password */}
                <TextField
                  label="Password"
                  fullWidth
                  required
                  placeholder="*********"
                  autoComplete="current-password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange("password")}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" color="action" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? (
                            <VisibilityOff fontSize="small" />
                          ) : (
                            <Visibility fontSize="small" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 1 }}
                />

                {/* Forgot Password */}
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}
                >
                  <Link
                    href="/forgot-password"
                    variant="body2"
                    underline="hover"
                    color="primary"
                  >
                    Forgot password?
                  </Link>
                </Box>

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    py: 1.5,
                    fontWeight: 700,
                    fontSize: 15,
                    borderRadius: 2,
                    boxShadow: "0 6px 20px rgba(25,118,210,0.35)",
                    "&:hover": {
                      boxShadow: "0 8px 26px rgba(25,118,210,0.5)",
                      transform: "translateY(-1px)",
                    },
                    transition: "all 0.2s",
                  }}
                >
                  Sign In
                </Button>

                {/* Register link */}
                <Typography
                  variant="body2"
                  align="center"
                  color="text.secondary"
                  sx={{ mt: 3 }}
                >
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    underline="hover"
                    fontWeight={600}
                    color="primary"
                  >
                    Create one
                  </Link>
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
