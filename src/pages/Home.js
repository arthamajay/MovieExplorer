import React, { useEffect } from 'react';
import { Box, Container, Typography, Grid, Button, Chip, useTheme } from '@mui/material';
import { TrendingUp, Search as SearchIcon, ExpandMore, LocalFireDepartment } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { getTrending, getSearchResults, getDiscoverResults, getGenres } from '../store/moviesSlice';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import MovieCard from '../components/MovieCard';
import LoadingGrid from '../components/LoadingGrid';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  const {
    trending, trendingPage, trendingTotalPages,
    searchResults, searchQuery, searchPage, searchTotalPages,
    discoverResults, discoverPage, discoverTotalPages,
    filters, loading, error,
  } = useSelector((s) => s.movies);

  useEffect(() => {
    dispatch(getTrending(1));
    dispatch(getGenres());
  }, [dispatch]);

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = filters.genreId || filters.year || filters.sortBy !== 'popularity.desc';
  const displayMovies = isSearching ? searchResults : isFiltering ? discoverResults : trending;
  const currentPage = isSearching ? searchPage : isFiltering ? discoverPage : trendingPage;
  const totalPages = isSearching ? searchTotalPages : isFiltering ? discoverTotalPages : trendingTotalPages;
  const hasMore = currentPage < totalPages;

  const handleLoadMore = () => {
    const next = currentPage + 1;
    if (isSearching) dispatch(getSearchResults({ query: searchQuery, page: next }));
    else if (isFiltering) dispatch(getDiscoverResults({ ...filters, page: next }));
    else dispatch(getTrending(next));
  };

  const sectionTitle = isSearching
    ? `Results for "${searchQuery}"`
    : isFiltering ? 'Filtered Results' : 'Trending This Week';

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          pt: { xs: 6, md: 10 }, pb: { xs: 5, md: 8 },
          textAlign: 'center', overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
            background: dark
              ? 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(229,9,20,0.1) 0%, transparent 65%)'
              : 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(229,9,20,0.07) 0%, transparent 65%)',
          }}
        />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, mb: 2.5 }}>
            <Box
              sx={{
                display: 'flex', alignItems: 'center', gap: 0.6,
                px: 1.5, py: 0.5, borderRadius: 999,
                bgcolor: 'rgba(229,9,20,0.12)', border: '1px solid rgba(229,9,20,0.25)',
              }}
            >
              <LocalFireDepartment sx={{ fontSize: 14, color: '#E50914' }} />
              <Typography variant="caption" fontWeight={700} color="#E50914">
                Powered by TMDb
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h2"
            sx={{
              mb: 2,
              background: dark
                ? 'linear-gradient(135deg, #FFFFFF 0%, #9090A8 100%)'
                : 'linear-gradient(135deg, #14141F 0%, #5A5A6E 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your
            <Box
              component="span"
              sx={{
                display: 'block',
                background: 'linear-gradient(135deg, #E50914, #FF6B35)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Favourite Films
            </Box>
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            Search millions of movies, explore trending picks, and build your personal watchlist.
          </Typography>

          <SearchBar />
        </Container>
      </Box>

      <Container maxWidth="xl" sx={{ pb: 8 }}>
        <FilterBar />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
          {isSearching
            ? <SearchIcon sx={{ color: '#E50914', fontSize: 22 }} />
            : <TrendingUp sx={{ color: '#E50914', fontSize: 22 }} />
          }
          <Typography variant="h5">{sectionTitle}</Typography>
          {displayMovies.length > 0 && (
            <Chip
              label={`${displayMovies.length} movies`}
              size="small"
              sx={{
                height: 22, fontSize: '0.7rem', fontWeight: 700,
                bgcolor: 'rgba(229,9,20,0.1)', color: '#E50914',
                border: '1px solid rgba(229,9,20,0.2)',
              }}
            />
          )}
        </Box>

        {error && <ErrorMessage message={error} onRetry={() => dispatch(getTrending(1))} />}

        {loading && displayMovies.length === 0 && <LoadingGrid count={12} />}

        {!loading && !error && displayMovies.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <SearchIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              {isSearching ? `No movies found for "${searchQuery}"` : 'Nothing to display yet.'}
            </Typography>
            <Typography variant="body2" color="text.disabled" mt={0.5}>
              {isSearching ? 'Try a different search term.' : 'Try adjusting the filters.'}
            </Typography>
          </Box>
        )}

        {displayMovies.length > 0 && (
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
            {displayMovies.map((movie) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        )}

        {displayMovies.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            {loading ? (
              <LoadingGrid count={6} />
            ) : hasMore ? (
              <Button
                variant="outlined"
                size="large"
                endIcon={<ExpandMore />}
                onClick={handleLoadMore}
                sx={{
                  px: 5, py: 1.4, fontSize: '0.9rem', fontWeight: 700,
                  borderColor: 'rgba(229,9,20,0.35)', color: '#E50914',
                  '&:hover': { borderColor: '#E50914', bgcolor: 'rgba(229,9,20,0.06)' },
                }}
              >
                Load More
              </Button>
            ) : (
              <Box
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 1,
                  px: 3, py: 1, borderRadius: 999,
                  bgcolor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                }}
              >
                <Typography variant="body2" color="text.disabled">
                  You've seen them all 🎬
                </Typography>
              </Box>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Home;
