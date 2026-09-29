import React from 'react';
import { Container, Typography, Grid, Box, Button, useTheme } from '@mui/material';
import { FavoriteBorder, Home } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/MovieCard';

const Favorites = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const favorites = useSelector((s) => s.favorites.items);

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
          <Box sx={{ width: 4, height: 26, borderRadius: 4, bgcolor: '#E50914' }} />
          <Typography variant="h4" fontWeight={800}>My Favorites</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ ml: '20px' }}>
          {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved to your list
        </Typography>
      </Box>

      {favorites.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center', py: 10, px: 2, borderRadius: '20px',
            bgcolor: dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.025)',
            border: `1px dashed ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, borderRadius: '24px', mb: 3,
              bgcolor: 'rgba(229,9,20,0.07)', border: '1px solid rgba(229,9,20,0.15)',
            }}
          >
            <FavoriteBorder sx={{ fontSize: 36, color: '#E50914', opacity: 0.6 }} />
          </Box>
          <Typography variant="h5" fontWeight={700} gutterBottom>No favorites yet</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 4, maxWidth: 360, mx: 'auto' }}>
            Browse movies and tap the heart icon on any poster to save it here.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Home />}
            onClick={() => navigate('/')}
            size="large"
            sx={{ px: 5, py: 1.5, fontSize: '0.95rem' }}
          >
            Browse Movies
          </Button>
        </Box>
      ) : (
        <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
          {favorites.map((movie) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorites;
