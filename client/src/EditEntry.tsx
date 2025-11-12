import { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ImageDrop } from './ImageUpload';

const EditEntry = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [text, setText] = useState('');
  const [caption, setCaption] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAI, setLoadingAI] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchJournal = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${id}`);
        const journal = response.data;
        setTitle(journal.title || '');
        setAuthor(journal.author || '');
        setImageUrl(journal.image || '');
        setText(journal.text || '');
        setCaption(journal.caption || '');
      } catch (err) {
        console.error('Error fetching journal:', err);
        setError('Failed to load journal entry.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJournal();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!title.trim()) {
      setError('Please enter a title');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/${id}`, {
        title,
        author,
        image: imageUrl,
        text,
        caption
      });

      setSuccess(true);
      setError('');

      setTimeout(() => navigate('/history'), 1500);
    } catch (err) {
      console.error('Error updating journal entry:', err);
      setError('Failed to update entry. Please try again.');
    }
  };

  const generateAICaption = async () => {
    if (loadingAI) return;
    setLoadingAI(true);

    try {
      const res = await axios.post('http://localhost:3000/api/openai', {
        prompt: `Generate a short, engaging caption for this journal entry: "${text || 'No text provided'}"`,
      });

      setCaption(res.data.response || '');
    } catch (err) {
      console.error('Error generating caption with AI:', err);
      setError('Failed to generate AI caption. Try again.');
    } finally {
      setLoadingAI(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Edit Journal Entry
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Entry updated successfully! Redirecting...
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

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
        <TextField
          fullWidth
          label="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Enter a caption for image generation..."
        />
        <Box
          component="img"
          src="/openai.png"
          alt="Generate with OpenAI"
          sx={{
            height: 56,
            width: 'auto',
            cursor: loadingAI ? 'not-allowed' : 'pointer',
            borderRadius: '8px',
            transition: 'transform 0.2s',
            objectFit: 'contain',
            opacity: loadingAI ? 0.5 : 1,
            '&:hover': {
              transform: loadingAI ? 'none' : 'scale(1.1)',
            },
          }}
          onClick={() => {
            if (!loadingAI) generateAICaption();
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="outlined"
          onClick={() => navigate('/history')}
          sx={{
            borderColor: 'rgba(42, 40, 41)',
            color: 'rgba(42, 40, 41)',
            '&:hover': {
              borderColor: 'rgba(60, 58, 59)',
              backgroundColor: 'rgba(60, 58, 59, 0.04)',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: 'rgba(42, 40, 41)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(60, 58, 59)' },
          }}
        >
          Update Entry
        </Button>
      </Box>
    </Box>
  );
};

export default EditEntry;
