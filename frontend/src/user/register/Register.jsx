import * as React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

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

export default function Register() {
  const [showPassword, setShowPassword]   = useState(false);
  const [showConfirm, setShowConfirm]     = useState(false);
  const [error, setError]                 = useState('');
  const [success, setSuccess]             = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});

  const strength = calcStrength(form.password);
  const mismatch =
    form.confirmPassword.length > 0 && form.confirmPassword !== form.password;

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setError('');
  };

  const validate = () => {
    const e = {};
    if (!form.fullName) e.fullName = 'Full name is required';
    if (!form.email) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email';
    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 8) e.password = 'Minimum 8 characters';
    if (!form.confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (form.confirmPassword !== form.password)
      e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:8090/api/users/register', {
        fullName: form.fullName,
        email:    form.email,
        password: form.password,
      });
      console.log('Register response:', response.data);
      setSuccess('Registration successful! You can now login.');
      setForm({ fullName: '', email: '', password: '', confirmPassword: '' });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <CssBaseline />

      {/* ── ROOT wrapper: flex row, full screen ── */}
      <Box sx={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden' }}>

        {/* ══════════════════════════════════════
            LEFT SIDE — image (flex: 1)
        ══════════════════════════════════════ */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },   // hidden on mobile
            flex: 1,
            position: 'relative',
            overflow: 'hidden',
            
          }}
        ><div
  style={{
    height: '100vh',       // 50% of viewport height
    width: '100vw',       // full width
    backgroundColor: 'rgb(51, 88, 168,0.5)', // blue with 50% opacity
    position:"absolute"
  }}
></div>
          {/* actual <img> tag — reliable in every browser */}

          <Box
            component="img"

            src="https://images.unsplash.com/photo-1662582631700-676a217d511f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwYm9va3MlMjBzaGVsdmVzfGVufDF8fHx8MTc3MTg0MTc1OXww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Register visual"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              display: 'block',
            }}
          />

          {/* gradient overlay + caption */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.05) 60%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              p: 5,
            }}
          >
            <Typography variant="h3" fontWeight={800} color="#fff" letterSpacing={-1}>
              Join us today.
            </Typography>
            <Typography variant="body1" color="rgba(255,255,255,0.75)" mt={1}>
              Create your account and start your journey.
            </Typography>
          </Box>
        </Box>

        {/* ══════════════════════════════════════
            RIGHT SIDE — form (flex: 1)
        ══════════════════════════════════════ */}
        <Box
          sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#fff',
            overflowY: 'auto',
            px: { xs: 3, sm: 6, md: 8 },
            py: 4,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 400 }}>

            {/* Avatar + Title */}
            <Box
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}
            >
              <Avatar sx={{ bgcolor: 'secondary.main', width: 56, height: 56, mb: 2 }}>
                <PersonOutlinedIcon />
              </Avatar>
              <Typography variant="h4" fontWeight={700} letterSpacing={-0.5}>
                Create Account
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={0.5}>
                Fill in the details below to get started
              </Typography>
            </Box>

            {/* ── ERROR / SUCCESS — shown at top ── */}
            {error && (
              <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ mb: 2.5, borderRadius: 2 }}>
                {success}
              </Alert>
            )}

            {/* Form */}
            <Box component="form" onSubmit={handleSubmit} noValidate>

              {/* Full Name */}
              <TextField
                label="Full name"
                fullWidth
                required
                autoComplete="name"
                value={form.fullName}
                onChange={handleChange('fullName')}
                error={Boolean(errors.fullName)}
                helperText={errors.fullName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2.5 }}
              />

              {/* Email */}
              <TextField
                label="Email address"
                type="email"
                fullWidth
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
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
                autoComplete="new-password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange('password')}
                error={Boolean(errors.password)}
                helperText={errors.password}
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

              {/* Strength Bar */}
              {form.password.length > 0 && (
                <Box sx={{ mb: 2 }}>
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
                  <Typography variant="caption" sx={{ color: STRENGTH_COLORS[strength] }}>
                    {STRENGTH_LABELS[strength]} password
                  </Typography>
                </Box>
              )}

              {/* Confirm Password */}
              <TextField
                label="Confirm password"
                fullWidth
                required
                autoComplete="new-password"
                type={showConfirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={handleChange('confirmPassword')}
                error={Boolean(errors.confirmPassword) || mismatch}
                helperText={
                  errors.confirmPassword || (mismatch ? 'Passwords do not match' : '')
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon fontSize="small" color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirm(!showConfirm)}
                        edge="end"
                        size="small"
                      >
                        {showConfirm ? (
                          <VisibilityOff fontSize="small" />
                        ) : (
                          <Visibility fontSize="small" />
                        )}
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
                color="secondary"
                sx={{
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 2,
                  boxShadow: '0 6px 20px rgba(156,39,176,0.3)',
                  '&:hover': {
                    boxShadow: '0 8px 26px rgba(156,39,176,0.45)',
                    transform: 'translateY(-1px)',
                  },
                  transition: 'all 0.2s',
                }}
              >
                Create Account
              </Button>

              {/* Login link */}
              <Typography
                variant="body2"
                align="center"
                color="text.secondary"
                sx={{ mt: 3 }}
              >
                Already have an account?{' '}
                <Link href="/login" underline="hover" fontWeight={600} color="secondary">
                  Sign in
                </Link>
              </Typography>

            </Box>
          </Box>
        </Box>

      </Box>
    </>
  );
}