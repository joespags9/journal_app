import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface Journal {
  _id: string;
  title: string;
  author: string;
  date: string;
  caption: string;
  image: string;
  text: string;
}

const ReadArticle = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Journal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/${id}`);
        setArticle(response.data.data.journal);
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) return <CircularProgress />;
  if (!article) return <Typography>Article not found</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ mb: 3 }}
      >
        Go Back
      </Button>
      <Typography variant="h3" sx={{ mb: 2, fontWeight: 600 }}>
        {article.title}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        By {article.author} - {new Date(article.date).toLocaleDateString()}
      </Typography>
      {article.image && (
        <Box
          component="img"
          src={article.image}
          alt={article.title}
          sx={{ width: '100%', maxHeight: '400px', objectFit: 'cover', mb: 3, borderRadius: '8px' }}
        />
      )}
      <Typography variant="h6" sx={{ mb: 2, fontStyle: 'italic' }}>
        {article.caption}
      </Typography>
      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
        {article.text}
      </Typography>
    </Box>
  );
};

export default ReadArticle;
