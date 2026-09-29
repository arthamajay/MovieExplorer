import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Chip, useTheme } from '@mui/material';
import { Tune, Refresh } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, getDiscoverResults } from '../store/moviesSlice';

const FilterBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';
  const { genres, filters } = useSelector((s) => s.movies);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  const handleChange = (field) => (e) => dispatch(setFilters({ [field]: e.target.value }));
  const handleApply = () => dispatch(getDiscoverResults({ ...filters, page: 1 }));
  const handleReset = () => {
    dispatch(setFilters({ genreId: '', year: '', sortBy: 'popularity.desc' }));
    dispatch(getDiscoverResults({ page: 1 }));
  };

  const selectSx = {
    minWidth: 140,
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      bgcolor: dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
      '&:hover fieldset': { borderColor: '#E50914' },
      '&.Mui-focused fieldset': { borderColor: '#E50914' },
    },
    '& .MuiInputLabel-root.Mui-focused': { color: '#E50914' },
  };

  const activeCount = [filters.genreId, filters.year, filters.sortBy !== 'popularity.desc'].filter(Boolean).length;

  return (
    <Box
      sx={{
        display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center',
        p: 2, borderRadius: '16px', my: 2,
        bgcolor: dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.025)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)'}`,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mr: 0.5 }}>
        <Tune sx={{ fontSize: 18, color: 'text.secondary' }} />
        <Box component="span" sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.secondary', display: { xs: 'none', sm: 'block' } }}>
          Filters
        </Box>
        {activeCount > 0 && (
          <Chip label={activeCount} size="small" color="primary" sx={{ height: 18, fontSize: '0.68rem', minWidth: 18 }} />
        )}
      </Box>

      <FormControl size="small" sx={selectSx}>
        <InputLabel>Genre</InputLabel>
        <Select value={filters.genreId} label="Genre" onChange={handleChange('genreId')}>
          <MenuItem value="">All Genres</MenuItem>
          {genres.map((g) => <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...selectSx, minWidth: 105 }}>
        <InputLabel>Year</InputLabel>
        <Select value={filters.year} label="Year" onChange={handleChange('year')}>
          <MenuItem value="">Any Year</MenuItem>
          {years.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
        </Select>
      </FormControl>

      <FormControl size="small" sx={{ ...selectSx, minWidth: 165 }}>
        <InputLabel>Sort By</InputLabel>
        <Select value={filters.sortBy} label="Sort By" onChange={handleChange('sortBy')}>
          <MenuItem value="popularity.desc">Most Popular</MenuItem>
          <MenuItem value="vote_average.desc">Highest Rated</MenuItem>
          <MenuItem value="release_date.desc">Newest First</MenuItem>
          <MenuItem value="release_date.asc">Oldest First</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" size="small" onClick={handleApply} sx={{ px: 3, py: 0.9, fontSize: '0.8rem' }}>
        Apply
      </Button>

      {activeCount > 0 && (
        <Button
          variant="outlined"
          size="small"
          onClick={handleReset}
          startIcon={<Refresh sx={{ fontSize: '16px !important' }} />}
          sx={{
            px: 2, py: 0.9, fontSize: '0.8rem', borderRadius: 999,
            borderColor: 'divider', color: 'text.secondary',
            '&:hover': { borderColor: '#E50914', color: '#E50914' },
          }}
        >
          Reset
        </Button>
      )}
    </Box>
  );
};

export default FilterBar;
