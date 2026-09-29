import React from 'react';
import { Box, Typography, IconButton, Tooltip, Chip } from '@mui/material';
import { Favorite, FavoriteBorder, Star, PlayArrow } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addFavorite, removeFavorite } from '../store/favoritesSlice';
import { TMDB_IMAGE_BASE } from '../services/api';

const NO_POSTER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='750' viewBox='0 0 500 750'%3E%3Crect width='500' height='750' fill='%231C1C2E'/%3E%3Ctext x='50%25' y='48%25' dominant-baseline='middle' text-anchor='middle' font-family='Inter,sans-serif' font-size='22' fill='%23444455'%3ENo Poster%3C/text%3E%3Ctext x='50%25' y='56%25' dominant-baseline='middle' text-anchor='middle' font-size='40' fill='%23333344'%3E🎬%3C/text%3E%3C/svg%3E";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((s) => s.favorites.items);
  const isFav = favorites.some((m) => m.id === movie.id);

  const posterUrl = movie.poster_path ? `${TMDB_IMAGE_BASE}${movie.poster_path}` : NO_POSTER;
  const year = movie.release_date?.split('-')[0] ?? 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '—';

  const handleFav = (e) => {
    e.stopPropagation();
    isFav ? dispatch(removeFavorite(movie.id)) : dispatch(addFavorite(movie));
  };

  return (
    <Box
      className="movie-card-root"
      onClick={() => navigate(`/movie/${movie.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/movie/${movie.id}`)}
      aria-label={`View details for ${movie.title}`}
      sx={{
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        aspectRatio: '2/3',
        bgcolor: '#1C1C2E',
        outline: '1px solid rgba(255,255,255,0.07)',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.015)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.55), 0 0 0 2px rgba(229,9,20,0.35)',
        },
        '&:focus-visible': {
          outline: '2px solid #E50914',
          outlineOffset: 3,
        },
      }}
    >
      <img
        className="poster-img"
        src={posterUrl}
        alt={movie.title}
        loading="lazy"
        onError={(e) => { e.target.src = NO_POSTER; }}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />

      <Box
        sx={{
          position: 'absolute', top: 10, right: 10,
          bgcolor: 'rgba(0,0,0,0.72)',
          backdropFilter: 'blur(8px)',
          borderRadius: '8px', px: 1, py: 0.4,
          display: 'flex', alignItems: 'center', gap: 0.4,
          border: '1px solid rgba(255,255,255,0.12)',
        }}
      >
        <Star sx={{ fontSize: 13, color: '#F5A623' }} />
        <Typography variant="caption" fontWeight={700} color="#fff" lineHeight={1}>
          {rating}
        </Typography>
      </Box>

      <Box className="poster-overlay">
        <Box>
          <Typography
            variant="subtitle2"
            fontWeight={700}
            color="#fff"
            sx={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)', mb: 0.5, lineHeight: 1.3 }}
          >
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Chip
              label={year}
              size="small"
              sx={{
                height: 20, fontSize: '0.68rem', fontWeight: 700,
                bgcolor: 'rgba(255,255,255,0.15)', color: '#fff',
                backdropFilter: 'blur(4px)',
              }}
            />
            <Tooltip title={isFav ? 'Remove from favorites' : 'Add to favorites'}>
              <IconButton
                onClick={handleFav}
                size="small"
                aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                sx={{
                  bgcolor: isFav ? 'rgba(229,9,20,0.8)' : 'rgba(0,0,0,0.55)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  width: 30, height: 30,
                  '&:hover': { bgcolor: isFav ? '#E50914' : 'rgba(229,9,20,0.7)' },
                  transition: 'all 0.2s ease',
                }}
              >
                {isFav
                  ? <Favorite sx={{ fontSize: 15, color: '#fff' }} />
                  : <FavoriteBorder sx={{ fontSize: 15, color: '#fff' }} />
                }
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%) scale(0.6)',
          opacity: 0,
          transition: 'all 0.3s ease',
          bgcolor: 'rgba(229,9,20,0.85)',
          borderRadius: '50%',
          width: 52, height: 52,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 0 8px rgba(229,9,20,0.2)',
          '.movie-card-root:hover &': {
            opacity: 1,
            transform: 'translate(-50%, -50%) scale(1)',
          },
        }}
      >
        <PlayArrow sx={{ fontSize: 26, color: '#fff', ml: 0.5 }} />
      </Box>
    </Box>
  );
};

export default MovieCard;
