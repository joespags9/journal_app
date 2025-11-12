import { Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Header';
import Entries from './Home';
import ArticleList from './ArticleList';
import InfoEntry from './InfoEntry';
import EditEntry from './EditEntry';
import ReadArticle from './ReadArticle';

const App = () => {
  return (
    <BrowserRouter>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Header />
        <Box
          sx={{
            flex: 1,
            backgroundColor: 'rgba(224, 224, 220)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '80%',
              height: '80%',
              backgroundColor: 'rgba(224, 224, 220)',
              borderRadius: '8px',
              overflow: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<Entries />} />
              <Route path="/history" element={<ArticleList />} />
              <Route path="/entry" element={<InfoEntry />} />
              <Route path="/edit/:id" element={<EditEntry />} />
              <Route path="/article/:id" element={<ReadArticle />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
