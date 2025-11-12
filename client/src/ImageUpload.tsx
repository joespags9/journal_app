import { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const ImageDrop = ({ setImageUrl }: { setImageUrl: (url: string) => void }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [urlInput, setUrlInput] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
          setUploading(true);
          const res = await axios.post('http://localhost:3000/api/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          setImageUrl(res.data.url);
          setUploadedImageUrl(res.data.url);
        } catch (err) {
          console.error('Upload failed:', err);
        } finally {
          setUploading(false);
        }
      }
    }
  });

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setImageUrl(urlInput);
      setUploadedImageUrl(urlInput);
    }
  };

  const openGoogleImageSearch = () => {
    window.open('https://images.google.com/', '_blank');
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start', my: 2 }}>
      {/* Left side: Buttons and URL input */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: '200px' }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={openGoogleImageSearch}
          sx={{
            backgroundColor: 'rgba(42, 40, 41)',
            color: 'white',
            '&:hover': { backgroundColor: 'rgba(60, 58, 59)' },
          }}
        >
          Google Images
        </Button>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="Image URL"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            size="small"
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <Button
            variant="outlined"
            onClick={handleUrlSubmit}
            sx={{
              borderColor: 'rgba(42, 40, 41)',
              color: 'rgba(42, 40, 41)',
              '&:hover': {
                borderColor: 'rgba(60, 58, 59)',
                backgroundColor: 'rgba(42, 40, 41, 0.04)',
              },
            }}
          >
            Load URL
          </Button>
        </Box>
      </Box>

      {/* Right side: Drop zone */}
      <Box
        {...getRootProps()}
        sx={{
          flex: 1,
          aspectRatio: '1',
          maxWidth: '400px',
          border: '2px dashed',
          borderColor: isDragActive ? '#1976d2' : 'gray',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: isDragActive ? 'rgba(25, 118, 210, 0.05)' : 'transparent',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: '#1976d2',
            backgroundColor: 'rgba(25, 118, 210, 0.02)',
          }
        }}
      >
        <input {...getInputProps()} />

        {uploadedImageUrl ? (
          <Box
            component="img"
            src={uploadedImageUrl}
            alt="Uploaded"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        ) : (
          <Box sx={{ textAlign: 'center', p: 3 }}>
            {uploading ? (
              <Typography>Uploading...</Typography>
            ) : isDragActive ? (
              <Typography>Drop the image here...</Typography>
            ) : (
              <Typography>Drag & drop an image here, or click to select</Typography>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};