import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

function calcStrength(pwd) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return score;
}

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong'];
const STRENGTH_COLORS = ['', '#f44336', '#ff9800', '#2196f3', '#4caf50'];

export default function ResetPassword() {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({ newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const strength = calcStrength(form.newPassword);
  const mismatch = form.confirmPassword.length > 0 && form.confirmPassword !== form.newPassword;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.newPassword) e.newPassword = 'Password is required';
    else if (form.newPassword.length < 8) e.newPassword = 'Minimum 8 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.confirmPassword !== form.newPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // POST /api/auth/reset-password  { token: fromURL, newPassword }
    console.log('Reset password payload:', { newPassword: form.newPassword });
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSuccess(true);
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth={false} disableGutters>
        <Grid container sx={{ height: '100vh',display:"flex",justifyContent:"center",alignItems:"center" }}>

          {/* ── LEFT SIDE — Image Background ── */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random/900x1200?forest)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: { xs: 'none', md: 'block' },
            }}
          />

          {/* ── RIGHT SIDE — Reset Password Form ── */}
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
              {!success && (
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
                      '&:hover': { color: 'success.main' },
                      transition: 'color 0.2s',
                    }}
                  >
                    <ArrowBackIosNewIcon sx={{ fontSize: 13 }} />
                    Back to Sign In
                  </Link>
                </Box>
              )}

              {/* Avatar + Title */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
                <Avatar sx={{ bgcolor: 'success.main', width: 56, height: 56, mb: 2 }}>
                  {success
                    ? <CheckCircleOutlineIcon />
                    : <LockOutlinedIcon />
                  }
                </Avatar>
                <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
                  {success ? 'Password reset!' : 'Reset password'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  mt={0.5}
                  align="center"
                  sx={{ maxWidth: 300 }}
                >
                  {success
                    ? 'Your password has been changed successfully.'
                    : 'Choose a strong new password for your account.'}
                </Typography>
              </Box>

              {/* Form or Success */}
              {!success ? (
                <Box component="form" onSubmit={handleSubmit} noValidate>

                  {/* New Password */}
                  <TextField
                    label="New password"
                    fullWidth
                    required
                    autoComplete="new-password"
                    type={showNew ? 'text' : 'password'}
                    value={form.newPassword}
                    onChange={handleChange('newPassword')}
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowNew(!showNew)} edge="end" size="small">
                            {showNew ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 1 }}
                  />

                  {/* Strength Bar */}
                  {form.newPassword.length > 0 && (
                    <Box sx={{ mb: 2.5 }}>
                      <LinearProgress
                        variant="determinate"
                        value={strength * 25}
                        sx={{
                          height: 5,
                          borderRadius: 3,
                          bgcolor: '#eee',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: STRENGTH_COLORS[strength],
                            borderRadius: 3,
                            transition: 'all 0.4s ease',
                          },
                        }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" sx={{ color: STRENGTH_COLORS[strength] }}>
                          {STRENGTH_LABELS[strength]}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Min. 8 characters
                        </Typography>
                      </Box>
                    </Box>
                  )}

                  {/* Confirm Password */}
                  <TextField
                    label="Confirm new password"
                    fullWidth
                    required
                    autoComplete="new-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={handleChange('confirmPassword')}
                    error={Boolean(errors.confirmPassword) || mismatch}
                    helperText={errors.confirmPassword || (mismatch ? 'Passwords do not match' : '')}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockOutlinedIcon fontSize="small" color="action" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowConfirm(!showConfirm)} edge="end" size="small">
                            {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ mb: 3 }}
                  />

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    color="success"
                    disabled={loading || mismatch}
                    sx={{
                      py: 1.5,
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: 2,
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(46,125,50,0.3)',
                      '&:hover': {
                        boxShadow: '0 8px 26px rgba(46,125,50,0.45)',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'all 0.2s',
                    }}
                  >
                    {loading ? 'Resetting...' : 'Reset Password'}
                  </Button>

                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Alert severity="success" sx={{ borderRadius: 2 }}>
                    Your password has been reset successfully!
                  </Alert>
                  <Button
                    variant="contained"
                    fullWidth
                    size="large"
                    color="success"
                    href="/login"
                    sx={{
                      borderRadius: 2,
                      py: 1.5,
                      fontWeight: 700,
                      color: '#fff',
                      boxShadow: '0 6px 20px rgba(46,125,50,0.3)',
                    }}
                  >
                    Continue to Sign In
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