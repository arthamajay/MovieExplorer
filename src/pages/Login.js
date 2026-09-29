import React, { useState } from 'react';
import { Box, Paper, Typography, TextField, Button, InputAdornment, IconButton, Alert, useTheme } from '@mui/material';
import { Visibility, VisibilityOff, Movie as MovieIcon, Lock, AlternateEmail } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!username.trim()) { setError('Please enter your username.'); return; }
    if (password.length < 4) { setError('Password must be at least 4 characters.'); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    dispatch(login(username.trim()));
    navigate('/');
  };

  const fieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '14px',
      bgcolor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
      '&:hover fieldset': { borderColor: '#E50914' },
      '&.Mui-focused fieldset': { borderColor: '#E50914', borderWidth: 2 },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#E50914' },
    mb: 2.5,
  };

  return (
    <Box
      sx={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        bgcolor: dark ? '#0A0A0F' : '#F4F3F8', p: 2,
      }}
    >
      <Box
        sx={{
          position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
          background: dark
            ? 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,9,20,0.12) 0%, transparent 70%)'
            : 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(229,9,20,0.07) 0%, transparent 70%)',
        }}
      />
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute', borderRadius: '50%', zIndex: 0, pointerEvents: 'none',
            width:  [200, 150, 320, 100, 260, 180][i],
            height: [200, 150, 320, 100, 260, 180][i],
            top:    ['5%', '70%', '20%', '85%', '45%', '10%'][i],
            left:   ['10%', '5%', '75%', '80%', '50%', '60%'][i],
            background: 'radial-gradient(circle, rgba(229,9,20,0.05) 0%, transparent 70%)',
            filter: 'blur(20px)',
          }}
        />
      ))}

      <Paper
        elevation={0}
        className="fade-in"
        sx={{
          position: 'relative', zIndex: 1,
          p: { xs: 3.5, sm: 5 }, width: '100%', maxWidth: 440, borderRadius: '24px',
          bgcolor: dark ? '#12121A' : '#ffffff',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'}`,
          boxShadow: dark
            ? '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)'
            : '0 32px 80px rgba(0,0,0,0.12)',
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 64, height: 64, borderRadius: '18px', mb: 2,
              background: 'linear-gradient(135deg, #E50914, #B00710)',
              boxShadow: '0 8px 28px rgba(229,9,20,0.45)',
            }}
          >
            <MovieIcon sx={{ fontSize: 32, color: '#fff' }} />
          </Box>
          <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.025em', mb: 0.5 }}>
            MovieExplorer
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to discover and explore films
          </Typography>
        </Box>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError('')}
            sx={{
              mb: 2.5, borderRadius: '12px',
              bgcolor: 'rgba(229,9,20,0.1)', color: '#E50914',
              '& .MuiAlert-icon': { color: '#E50914' },
              border: '1px solid rgba(229,9,20,0.25)',
            }}
          >
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AlternateEmail sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
            sx={fieldSx}
          />

          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{ fontSize: 18, color: 'text.disabled' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    size="small"
                    tabIndex={-1}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword
                      ? <VisibilityOff sx={{ fontSize: 18 }} />
                      : <Visibility sx={{ fontSize: 18 }} />
                    }
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ ...fieldSx, mb: 3.5 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              py: 1.6, fontSize: '1rem', fontWeight: 700, letterSpacing: '0.02em',
              background: 'linear-gradient(135deg, #E50914, #B00710)',
              boxShadow: '0 6px 24px rgba(229,9,20,0.4)',
              '&:hover': {
                background: 'linear-gradient(135deg, #FF3D3D, #E50914)',
                boxShadow: '0 8px 32px rgba(229,9,20,0.55)',
                transform: 'translateY(-1px)',
              },
              '&:active': { transform: 'translateY(0)' },
              transition: 'all 0.2s ease',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </Button>
        </Box>

        <Box
          sx={{
            mt: 3, pt: 3, textAlign: 'center',
            borderTop: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          }}
        >
          <Typography variant="caption" color="text.disabled" lineHeight={1.6}>
            Demo — enter any username and a password of 4+ characters.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
