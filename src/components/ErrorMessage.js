import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ReportProblemOutlined, Refresh } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { clearError } from '../store/moviesSlice';

const ErrorMessage = ({ message, onRetry }) => {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        my: 3, p: 3, borderRadius: '16px',
        bgcolor: 'rgba(229,9,20,0.07)', border: '1px solid rgba(229,9,20,0.25)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 2, textAlign: 'center', maxWidth: 500, mx: 'auto',
      }}
    >
      <ReportProblemOutlined sx={{ fontSize: 42, color: '#E50914' }} />
      <Box>
        <Typography variant="subtitle1" fontWeight={700} color="text.primary" gutterBottom>
          Something went wrong
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {message || 'Unable to fetch data. Please check your connection and try again.'}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        {onRetry && (
          <Button variant="contained" size="small" startIcon={<Refresh />} onClick={onRetry} sx={{ px: 3 }}>
            Retry
          </Button>
        )}
        <Button
          variant="outlined"
          size="small"
          onClick={() => dispatch(clearError())}
          sx={{
            px: 3, borderRadius: 999, borderColor: 'rgba(229,9,20,0.35)',
            color: '#E50914', '&:hover': { borderColor: '#E50914', bgcolor: 'rgba(229,9,20,0.06)' },
          }}
        >
          Dismiss
        </Button>
      </Box>
    </Box>
  );
};

export default ErrorMessage;
