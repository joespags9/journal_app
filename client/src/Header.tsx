import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        minHeight: '60px',
        flexShrink: 0,
        backgroundColor: 'rgba(42, 40, 41, 1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'white',
          cursor: 'pointer',
          '&:hover': {
            opacity: 0.8,
          }
        }}
        onClick={() => navigate('/')}
      >
        Journal
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate('/history')}
          sx={{ backgroundColor: 'rgba(224, 224, 220)', color: 'black', '&:hover': { backgroundColor: 'rgba(200, 200, 196)' } }}
        >
          Article History
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate('/entry')}
          sx={{ backgroundColor: 'rgba(224, 224, 220)', color: 'black', '&:hover': { backgroundColor: 'rgba(200, 200, 196)' } }}
        >
          New Entry
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
