import { Box, Typography } from '@mui/material';

const Entries = () => {
  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
        Welcome to Your Journal
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Use the buttons above to view your article history or create a new entry.
      </Typography>
    </Box>
  );
};

export default Entries;
