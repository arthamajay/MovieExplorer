import React, { useEffect, useState } from 'react';
import {
  Box, Container, Typography, Grid, Chip, Button,
  Avatar, IconButton, Dialog, DialogContent,
  Tooltip, CircularProgress, useTheme,
} from '@mui/material';
import {
  Favorite, FavoriteBorder, ArrowBack, PlayCircle,
  Star, Close, CalendarToday, AccessTime, Language, HowToReg,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { fetchMovieDetails, TMDB_IMAGE_BASE, TMDB_BACKDROP_BASE } from '../services/api';
import ErrorMessage from '../components/ErrorMessage';

const TMDB_FACE = 'https://image.tmdb.org/t/p/w185';

const NO_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%231C1C2E'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,sans-serif' font-size='22' fill='%23444455'%3ENo Poster%3C/text%3E%3C/svg%3E";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const favorites = useSelector((s) => s.favorites.items);

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);

  const isFav = movie ? favorites.some((m) => m.id === movie.id) : false;

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchMovieDetails(id);
        setMovie(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 2 }}>
        <CircularProgress size={52} thickness={3} sx={{ color: '#E50914' }} />
        <Typography variant="body2" color="text.disabled">Loading…</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 6 }}>
        <ErrorMessage message={error} onRetry={() => window.location.reload()} />
      </Container>
    );
  }

  if (!movie) return null;

  const trailer = movie.videos?.results?.find(
    (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
  );
  const backdropUrl = movie.backdrop_path ? `${TMDB_BACKDROP_BASE}${movie.backdrop_path}` : null;
  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : NO_POSTER;
  const releaseYear = movie.release_date?.split('-')[0] ?? 'N/A';
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null;
  const rating = movie.vote_average?.toFixed(1) ?? '—';
  const cast = movie.credits?.cast?.slice(0, 10) ?? [];

  return (
    <Box sx={{ pb: 8 }}>
      <Box
        sx={{
          position: 'relative',
          height: { xs: 220, sm: 340, md: 480 },
          overflow: 'hidden',
          mb: { xs: -6, md: -12 },
        }}
      >
        {backdropUrl && (
          <Box
            component="img"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        )}
        <Box
          sx={{
            position: 'absolute', inset: 0,
            background: dark
              ? 'linear-gradient(to bottom, rgba(10,10,15,0) 0%, rgba(10,10,15,0.4) 40%, rgba(10,10,15,0.88) 75%, #0A0A0F 100%)'
              : 'linear-gradient(to bottom, rgba(244,243,248,0) 0%, rgba(244,243,248,0.5) 50%, rgba(244,243,248,0.95) 80%, #F4F3F8 100%)',
          }}
        />
      </Box>

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, pt: { xs: 8, md: 14 } }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          size="small"
          sx={{
            mb: 4, borderRadius: 999, pl: 2, pr: 2.5,
            bgcolor: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)',
            color: 'text.secondary',
            border: `1px solid ${dark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            '&:hover': { bgcolor: dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.1)', color: 'text.primary' },
          }}
        >
          Back
        </Button>

        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
            <Box
              component="img"
              src={posterUrl}
              alt={movie.title}
              loading="lazy"
              onError={(e) => { e.target.src = NO_POSTER; }}
              sx={{
                width: '100%',
                maxWidth: { xs: 200, sm: '100%' },
                mx: { xs: 'auto', sm: 0 },
                display: 'block',
                borderRadius: '18px',
                boxShadow: dark
                  ? '0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.06)'
                  : '0 24px 60px rgba(0,0,0,0.2)',
              }}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={9} lg={10}>
            <Typography variant="h3" fontWeight={800} sx={{ mb: 0.5, lineHeight: 1.2 }}>
              {movie.title}
              {releaseYear !== 'N/A' && (
                <Typography
                  component="span"
                  sx={{ fontWeight: 400, fontSize: '0.55em', color: 'text.secondary', ml: 1.5, verticalAlign: 'middle' }}
                >
                  {releaseYear}
                </Typography>
              )}
            </Typography>

            {movie.tagline && (
              <Typography variant="body1" color="text.secondary" fontStyle="italic" sx={{ mb: 2 }}>
                "{movie.tagline}"
              </Typography>
            )}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2.5 }}>
              {movie.genres?.map((g) => (
                <Chip
                  key={g.id}
                  label={g.name}
                  size="small"
                  sx={{
                    borderRadius: '8px', fontWeight: 600, fontSize: '0.72rem',
                    bgcolor: 'rgba(229,9,20,0.1)', color: '#E50914',
                    border: '1px solid rgba(229,9,20,0.25)',
                  }}
                />
              ))}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 3, alignItems: 'center' }}>
              <Box
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1,
                  px: 2, py: 1, borderRadius: '12px',
                  bgcolor: dark ? 'rgba(245,166,35,0.1)' : 'rgba(245,166,35,0.12)',
                  border: '1px solid rgba(245,166,35,0.3)',
                }}
              >
                <Star sx={{ fontSize: 18, color: '#F5A623' }} />
                <Typography variant="subtitle1" fontWeight={800} lineHeight={1}>{rating}</Typography>
                <Typography variant="caption" color="text.secondary" lineHeight={1}>/ 10</Typography>
              </Box>

              {runtime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <AccessTime sx={{ fontSize: 16, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary">{runtime}</Typography>
                </Box>
              )}
              {movie.release_date && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <CalendarToday sx={{ fontSize: 16, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary">{movie.release_date}</Typography>
                </Box>
              )}
              {movie.vote_count > 0 && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <HowToReg sx={{ fontSize: 16, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary">
                    {movie.vote_count.toLocaleString()} votes
                  </Typography>
                </Box>
              )}
              {movie.original_language && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Language sx={{ fontSize: 16, color: 'text.disabled' }} />
                  <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'uppercase' }}>
                    {movie.original_language}
                  </Typography>
                </Box>
              )}
            </Box>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3.5, maxWidth: 720, lineHeight: 1.85 }}>
              {movie.overview || 'No overview available.'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {trailer && (
                <Button
                  variant="contained"
                  startIcon={<PlayCircle />}
                  onClick={() => setTrailerOpen(true)}
                  size="large"
                  sx={{ px: 4, py: 1.5, fontSize: '0.95rem' }}
                >
                  Watch Trailer
                </Button>
              )}
              <Button
                variant={isFav ? 'contained' : 'outlined'}
                startIcon={isFav ? <Favorite /> : <FavoriteBorder />}
                onClick={() => isFav ? dispatch(removeFavorite(movie.id)) : dispatch(addFavorite(movie))}
                size="large"
                sx={{
                  px: 4, py: 1.5, fontSize: '0.95rem', borderRadius: 999,
                  ...(isFav
                    ? { bgcolor: 'rgba(229,9,20,0.15)', color: '#E50914', border: '1px solid rgba(229,9,20,0.4)', '&:hover': { bgcolor: 'rgba(229,9,20,0.25)' } }
                    : { borderColor: 'rgba(229,9,20,0.3)', color: '#E50914', '&:hover': { borderColor: '#E50914', bgcolor: 'rgba(229,9,20,0.06)' } }
                  ),
                  boxShadow: 'none',
                  background: 'none',
                }}
              >
                {isFav ? 'In Favorites' : 'Add to Favorites'}
              </Button>
            </Box>
          </Grid>
        </Grid>

        {cast.length > 0 && (
          <Box sx={{ mt: 8 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Box sx={{ width: 4, height: 22, borderRadius: 4, bgcolor: '#E50914' }} />
              <Typography variant="h5">Top Cast</Typography>
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(2, 1fr)',
                  sm: 'repeat(4, 1fr)',
                  md: 'repeat(5, 1fr)',
                  lg: 'repeat(10, 1fr)',
                },
                gap: 2,
              }}
            >
              {cast.map((actor) => (
                <Box
                  key={actor.cast_id ?? actor.id}
                  sx={{
                    textAlign: 'center', p: 1.5, borderRadius: '14px',
                    bgcolor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
                    transition: 'transform 0.2s, background 0.2s',
                    '&:hover': { transform: 'translateY(-4px)', bgcolor: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)' },
                  }}
                >
                  <Avatar
                    src={actor.profile_path ? `${TMDB_FACE}${actor.profile_path}` : undefined}
                    alt={actor.name}
                    sx={{ width: 56, height: 56, mx: 'auto', mb: 1, border: '2px solid rgba(229,9,20,0.2)' }}
                  />
                  <Typography variant="caption" fontWeight={700} display="block" noWrap title={actor.name}>
                    {actor.name}
                  </Typography>
                  <Typography variant="caption" color="text.disabled" display="block" noWrap title={actor.character}>
                    {actor.character}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>

      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: '20px', overflow: 'hidden', bgcolor: '#000' } }}
      >
        <DialogContent sx={{ p: 0, position: 'relative' }}>
          <Tooltip title="Close">
            <IconButton
              onClick={() => setTrailerOpen(false)}
              aria-label="Close trailer"
              sx={{
                position: 'absolute', top: 10, right: 10, zIndex: 10,
                bgcolor: 'rgba(0,0,0,0.6)', color: '#fff', width: 36, height: 36,
                backdropFilter: 'blur(4px)',
                '&:hover': { bgcolor: 'rgba(229,9,20,0.8)' },
              }}
            >
              <Close sx={{ fontSize: 18 }} />
            </IconButton>
          </Tooltip>
          {trailer && (
            <Box sx={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                title={`${movie.title} Trailer`}
                src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MovieDetails;
