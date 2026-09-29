import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box, Tooltip, Avatar } from '@mui/material';
import { Brightness4, Brightness7, Movie as MovieIcon, Favorite, Home, Logout } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../store/themeSlice';
import { logout } from '../store/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const themeMode = useSelector((s) => s.theme.mode);
  const { username } = useSelector((s) => s.auth);
  const dark = themeMode === 'dark';

  const navLinkStyle = ({ isActive }) => ({
    fontSize: '0.875rem',
    fontWeight: 600,
    borderRadius: 999,
    px: 2,
    py: 0.75,
    color: isActive ? '#E50914' : 'text.secondary',
    bgcolor: isActive
      ? (dark ? 'rgba(229,9,20,0.12)' : 'rgba(229,9,20,0.08)')
      : 'transparent',
    transition: 'all 0.2s ease',
    '&:hover': {
      color: 'text.primary',
      bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
    },
  });

  return (
    <AppBar position="sticky" elevation={0}>
      <Toolbar sx={{ maxWidth: 1400, mx: 'auto', width: '100%', px: { xs: 2, md: 4 }, gap: 1, minHeight: 64 }}>
        <Box
          component={NavLink}
          to="/"
          sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', mr: 3 }}
        >
          <Box
            sx={{
              width: 34, height: 34, borderRadius: '10px',
              background: 'linear-gradient(135deg, #E50914, #B00710)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(229,9,20,0.4)',
            }}
          >
            <MovieIcon sx={{ fontSize: 18, color: '#fff' }} />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: '-0.02em', color: 'text.primary' }}>
            MovieExplorer
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexGrow: 1 }}>
          <Button component={NavLink} to="/" end sx={navLinkStyle} startIcon={<Home sx={{ fontSize: '1rem !important' }} />}>
            Home
          </Button>
          <Button component={NavLink} to="/favorites" sx={navLinkStyle} startIcon={<Favorite sx={{ fontSize: '1rem !important' }} />}>
            Favorites
          </Button>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5, mr: 1 }}>
            <Avatar
              sx={{
                width: 30, height: 30, fontSize: '0.75rem', fontWeight: 700,
                bgcolor: 'rgba(229,9,20,0.15)', color: '#E50914', border: '1.5px solid rgba(229,9,20,0.4)',
              }}
            >
              {username ? username[0].toUpperCase() : 'U'}
            </Avatar>
            <Typography variant="caption" fontWeight={600} color="text.secondary">
              {username}
            </Typography>
          </Box>

          <Tooltip title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <IconButton
              onClick={() => dispatch(toggleTheme())}
              size="small"
              sx={{
                bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)',
                border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                borderRadius: '10px',
                width: 36, height: 36,
                '&:hover': { bgcolor: dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)' },
              }}
            >
              {dark
                ? <Brightness7 sx={{ fontSize: 18, color: '#F5A623' }} />
                : <Brightness4 sx={{ fontSize: 18, color: 'text.secondary' }} />
              }
            </IconButton>
          </Tooltip>

          <Tooltip title="Sign out">
            <IconButton
              onClick={() => { dispatch(logout()); navigate('/login'); }}
              size="small"
              sx={{
                bgcolor: dark ? 'rgba(229,9,20,0.08)' : 'rgba(229,9,20,0.06)',
                border: '1px solid rgba(229,9,20,0.2)',
                borderRadius: '10px',
                width: 36, height: 36,
                '&:hover': { bgcolor: 'rgba(229,9,20,0.15)' },
              }}
            >
              <Logout sx={{ fontSize: 18, color: '#E50914' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
