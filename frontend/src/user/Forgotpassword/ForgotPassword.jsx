import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined';
import axios from "axios"
export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    if (!email) { setEmailError('Email is required'); return false; }
    if (!/\S+@\S+\.\S+/.test(email)) { setEmailError('Invalid email address'); return false; }
    setEmailError('');
    return true;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:8090/api/password/forgot-password",
      { email } // or { email: form.email }
    );

    console.log("Response:", response.data);
    setSent(true); // show success message
  } catch (error) {
    if (error.response) {
      console.log("Server Error:", error.response.data);
    } else {
      console.log("Error:", error.message);
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <Container maxWidth={false} disableGutters>
        <Grid container sx={{ height: '100vh',display:"flex",justifyContent:"center",alignItems:"center" }}>

          {/* ── LEFT SIDE — Image Background ── */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random/900x1200?abstract)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* ── RIGHT SIDE — Forgot Password Form ── */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#fff',
              px: { xs: 3, sm: 6, md: 8 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: 400 }}>

              {/* Back link */}
              <Box sx={{ mb: 3 }}>
                <Link
                  href="/login"
                  underline="none"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: 'text.secondary',
                    fontSize: 14,
                    '&:hover': { color: 'primary.main' },
                    transition: 'color 0.2s',
                  }}
                >
                  <ArrowBackIosNewIcon sx={{ fontSize: 13 }} />
                  Back to Sign In
                </Link>
              </Box>

              {/* Avatar + Title */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar sx={{ bgcolor: 'warning.main', width: 56, height: 56, mb: 2 }}>
                  {sent
                    ? <MarkEmailReadOutlinedIcon />
                    : <LockResetOutlinedIcon />
                  }
                </Avatar>
                <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
                  {sent ? 'Check your email' : 'Forgot password?'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                  align="center"
                  sx={{ maxWidth: 300 }}
                >
                  {sent
                    ? `We sent a reset link to ${email}`
                    : "No worries — we'll send you reset instructions"}
                </Typography>
              </Box>

              {/* Form or Success state */}
              {!sent ? (
                <Box component="form" onSubmit={handleSubmit} noValidate>

                  <TextField
                    label="Email address"
                    type="email"
                    fullWidth
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    error={Boolean(emailError)}
                    helperText={emailError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailOutlinedIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    color="warning"
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: 2,
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(237,108,2,0.3)',
                      '&:hover': {
                        boxShadow: '0 8px 26px rgba(237,108,2,0.45)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                  </Button>

                  <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 3 }}>
                    Remembered it?{' '}
                    <Link href="/login" underline="hover" fontWeight={600} color="warning.main">
                      Sign in
                    </Link>
                  </Typography>

                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    Reset link sent! Check your inbox.
                  </Alert>
                  <Button
                    variant="outlined"
                    fullWidth
                    size="large"
                    color="warning"
                    sx={{ borderRadius: 2, py: 1.4, fontWeight: 600 }}
                    onClick={() => setSent(false)}
                  >
                    Resend email
                  </Button>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    color="warning"
                    href="/login"
                    sx={{
                      borderRadius: 2,
                      py: 1.4,
                      fontWeight: 700,
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(237,108,2,0.3)',
                    }}
                  >
                    Back to Sign In
                  </Button>
                </Box>
              )}

            </Box>
          </Grid>

        </Grid>
      </Container>
    </>
  );
}