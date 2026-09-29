import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline, Box, alpha } from '@mui/material';
import store from './store';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import Favorites from './pages/Favorites';

const COLORS = {
  red:          '#E50914',
  redLight:     '#FF3D3D',
  redDark:      '#B00710',
  amber:        '#F5A623',
  darkBase:     '#0A0A0F',
  darkPaper:    '#12121A',
  darkCard:     '#1C1C2E',
  lightBase:    '#F4F3F8',
  lightPaper:   '#FFFFFF',
  lightCard:    '#F0EFF7',
};

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

const AppShell = () => {
  const themeMode = useSelector((s) => s.theme.mode);
  const isLoggedIn = useSelector((s) => s.auth.isLoggedIn);
  const dark = themeMode === 'dark';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: themeMode,
          primary:   { main: COLORS.red, light: COLORS.redLight, dark: COLORS.redDark },
          secondary: { main: COLORS.amber },
          warning:   { main: COLORS.amber },
          background: {
            default: dark ? COLORS.darkBase  : COLORS.lightBase,
            paper:   dark ? COLORS.darkPaper : COLORS.lightPaper,
          },
          text: {
            primary:   dark ? '#F0F0F5' : '#14141F',
            secondary: dark ? '#9090A8' : '#5A5A6E',
            disabled:  dark ? '#444455' : '#BBBBCC',
          },
          divider: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)',
        },
        typography: {
          fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          h1: { fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',   fontWeight: 800, lineHeight: 1.15, letterSpacing: '-0.02em' },
          h2: { fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',   fontWeight: 800, lineHeight: 1.2,  letterSpacing: '-0.015em' },
          h3: { fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',   fontWeight: 700, lineHeight: 1.25, letterSpacing: '-0.01em' },
          h4: { fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)', fontWeight: 700, lineHeight: 1.3 },
          h5: { fontSize: '1.25rem',   fontWeight: 700, lineHeight: 1.4 },
          h6: { fontSize: '1.05rem',   fontWeight: 600, lineHeight: 1.4 },
          subtitle1: { fontSize: '1rem',     fontWeight: 600, lineHeight: 1.5 },
          subtitle2: { fontSize: '0.875rem', fontWeight: 600, lineHeight: 1.4 },
          body1:  { fontSize: '0.975rem', lineHeight: 1.75 },
          body2:  { fontSize: '0.875rem', lineHeight: 1.6 },
          caption:{ fontSize: '0.75rem',  lineHeight: 1.5 },
          button: { fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'none' },
        },
        shape: { borderRadius: 12 },
        components: {
          MuiCssBaseline: {
            styleOverrides: { body: { scrollbarWidth: 'thin' } },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                backgroundColor: dark ? COLORS.darkCard : COLORS.lightCard,
                backgroundImage: 'none',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.06)'}`,
              },
            },
          },
          MuiPaper: {
            styleOverrides: { root: { backgroundImage: 'none' } },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 999,
                boxShadow: 'none',
                '&:hover': { boxShadow: 'none' },
              },
              contained: {
                background: `linear-gradient(135deg, ${COLORS.red}, ${COLORS.redDark})`,
                '&:hover': { background: `linear-gradient(135deg, ${COLORS.redLight}, ${COLORS.red})` },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: { borderRadius: 6, fontWeight: 600, fontSize: '0.75rem' },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
                backgroundColor: dark ? alpha(COLORS.darkPaper, 0.85) : alpha(COLORS.lightPaper, 0.88),
                backdropFilter: 'blur(16px) saturate(180%)',
                borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
                boxShadow: 'none',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: { '& .MuiOutlinedInput-root': { borderRadius: 12 } },
            },
          },
          MuiSelect: {
            styleOverrides: { outlined: { borderRadius: 12 } },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                backgroundColor: dark ? COLORS.darkCard : COLORS.lightPaper,
                borderRadius: 20,
              },
            },
          },
          MuiSkeleton: {
            styleOverrides: {
              root: {
                backgroundColor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)',
                '&::after': {
                  background: dark
                    ? 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)'
                    : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
                },
              },
            },
          },
        },
        shadows: [
          'none',
          '0 1px 3px rgba(0,0,0,0.12)',
          '0 2px 8px rgba(0,0,0,0.16)',
          '0 4px 16px rgba(0,0,0,0.2)',
          '0 8px 24px rgba(0,0,0,0.24)',
          '0 12px 32px rgba(0,0,0,0.28)',
          '0 16px 40px rgba(0,0,0,0.32)',
          '0 20px 50px rgba(0,0,0,0.36)',
          '0 24px 60px rgba(0,0,0,0.4)',
          ...Array(16).fill('0 24px 60px rgba(0,0,0,0.4)'),
        ],
      }),
    [themeMode, dark]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
          {isLoggedIn && <Navbar />}
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/movie/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
            <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <AppShell />
    </Provider>
  );
}
