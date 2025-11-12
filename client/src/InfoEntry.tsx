import { useState } from 'react';
import { Box, TextField, Button, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImageDrop } from './ImageUpload';

const InfoEntry = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    try {
      await axios.post('http://localhost:3000/api/', {
        title,
        author,
        image: imageUrl,
        text,
      });

      setSuccess(true);
      setError('');
      setTitle('');
      setAuthor('');
      setImageUrl('');
      setText('');

      setTimeout(() => navigate('/history'), 1500);
    } catch (err) {
      console.error('Error creating journal entry:', err);
      setError('Failed to create entry. Please try again.');
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Create New Journal Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Entry created successfully! Redirecting...
        </Alert>
      )}

      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        sx={{ mb: 2 }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        sx={{ mb: 2 }}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />

      <ImageDrop setImageUrl={setImageUrl} />

      <TextField
        fullWidth
        multiline
        rows={8}
        label="Journal Entry"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
        placeholder="Write your journal entry here..."
      />

      <Button
        variant="contained"
        onClick={handleSubmit}
        sx={{
          backgroundColor: 'rgba(42, 40, 41)',
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(60, 58, 59)' },
        }}
      >
        Create Entry
      </Button>
    </Box>
  );
};

export default InfoEntry;
