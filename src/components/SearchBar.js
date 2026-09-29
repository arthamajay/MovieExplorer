import React, { useState, useEffect } from 'react';
import { Paper, InputBase, IconButton, Tooltip, Box, Typography } from '@mui/material';
import { Search, Clear, TrendingUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, getSearchResults, clearSearchResults } from '../store/moviesSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((s) => s.movies.searchQuery);
  const lastSearched = localStorage.getItem('lastSearchedMovie');
  const [value, setValue] = useState(searchQuery || '');

  useEffect(() => {
    if (!value.trim()) {
      dispatch(clearSearchResults());
      return;
    }
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(value.trim()));
      dispatch(getSearchResults({ query: value.trim(), page: 1 }));
    }, 480);
    return () => clearTimeout(timer);
  }, [value, dispatch]);

  const handleClear = () => {
    setValue('');
    dispatch(clearSearchResults());
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 640, mx: 'auto' }}>
      <Paper
        component="form"
        onSubmit={(e) => e.preventDefault()}
        elevation={0}
        sx={(theme) => ({
          display: 'flex',
          alignItems: 'center',
          borderRadius: 999,
          px: 2.5,
          py: 1.2,
          bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.055)',
          border: `1.5px solid ${theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
          transition: 'border-color 0.2s, box-shadow 0.2s',
          '&:focus-within': {
            borderColor: '#E50914',
            boxShadow: '0 0 0 3px rgba(229,9,20,0.18)',
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.09)' : '#fff',
          },
        })}
      >
        <Search sx={{ mr: 1.5, color: 'text.disabled', fontSize: 22 }} />
        <InputBase
          placeholder="Search movies, genres, actors…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          fullWidth
          inputProps={{ 'aria-label': 'search movies' }}
          sx={{ fontSize: '1rem', fontWeight: 500, '& input': { py: 0 } }}
        />
        {value && (
          <Tooltip title="Clear">
            <IconButton size="small" onClick={handleClear} aria-label="clear search" sx={{ ml: 0.5 }}>
              <Clear fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Paper>

      {!value && lastSearched && (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1.5, gap: 0.5 }}>
          <TrendingUp sx={{ fontSize: 14, color: 'text.disabled' }} />
          <Typography variant="caption" color="text.disabled">Last searched:</Typography>
          <Typography
            variant="caption"
            color="primary"
            sx={{ cursor: 'pointer', fontWeight: 600, '&:hover': { textDecoration: 'underline' } }}
            onClick={() => setValue(lastSearched)}
          >
            {lastSearched}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
