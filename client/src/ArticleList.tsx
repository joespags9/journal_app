import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  CircularProgress,
  Box
} from '@mui/material';

interface Journal {
  _id: string;
  title: string;
  author: string;
  date: string;
  caption: string;
  image: string;
  text: string;
}

const ArticleList = () => {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/');
        setJournals(response.data.data.journals);
      } catch (error) {
        console.error('Error fetching journals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJournals();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
        Article History
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 3,
        }}
      >
        {journals.map((journal) => (
          <Box
            key={journal._id}
            onClick={() => navigate(`/article/${journal._id}`)}
            sx={{
              aspectRatio: '1',
              backgroundColor: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              },
            }}
          >
            {journal.image && (
              <Box
                component="img"
                src={journal.image}
                alt={journal.title}
                sx={{
                  width: '100%',
                  height: '50%',
                  objectFit: 'cover',
                }}
              />
            )}
            <Box
              sx={{
                p: 2,
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 0.5,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {journal.title || 'Untitled'}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mb: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  By {journal.author || 'Unknown'}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {journal.caption}
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                {new Date(journal.date).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ArticleList;
