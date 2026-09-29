import React from 'react';
import { Grid, Skeleton, Box } from '@mui/material';

/**
 * LoadingGrid — skeleton cards that mirror the real movie grid shape (2:3 poster).
 */
const LoadingGrid = ({ count = 12 }) => (
  <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
    {Array.from({ length: count }).map((_, i) => (
      <Grid item xs={6} sm={4} md={3} lg={2} key={i}>
        <Box sx={{ borderRadius: '14px', overflow: 'hidden' }}>
          <Skeleton
            variant="rectangular"
            sx={{ aspectRatio: '2/3', borderRadius: '14px', transform: 'none' }}
          />
        </Box>
      </Grid>
    ))}
  </Grid>
);

export default LoadingGrid;
