import React, { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Paper
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  PictureAsPdf as PdfIcon,
  Description as TxtIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon
} from '@mui/icons-material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const FileUpload = ({ subjectId, onUploadSuccess }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      status: 'pending',
      progress: 0
    }));
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt']
    },
    maxSize: 10485760 // 10MB
  });

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append('subjectId', subjectId);
    files.forEach(({ file }) => {
      formData.append('files', file);
    });

    try {
      const response = await axios.post(`${API_BASE_URL}/subjects/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setUploadStatus({
        type: 'success',
        message: `Successfully uploaded ${response.data.files.length} files`
      });
      
      setFiles([]);
      
      // Refresh subject data
      if (onUploadSuccess) {
        const subjectResponse = await axios.get(`${API_BASE_URL}/subjects/${subjectId}`);
        onUploadSuccess(subjectResponse.data);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus({
        type: 'error',
        message: error.response?.data?.error || 'Failed to upload files'
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getFileIcon = (type) => {
    if (type === 'application/pdf') return <PdfIcon color="error" />;
    return <TxtIcon color="primary" />;
  };

  return (
    <Box>
      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          border: '2px dashed',
          borderColor: isDragActive ? 'primary.main' : 'grey.300',
          backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          textAlign: 'center',
          mb: 2
        }}
      >
        <input {...getInputProps()} />
        <UploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
        <Typography variant="body1">
          {isDragActive
            ? 'Drop the files here...'
            : 'Drag & drop PDF or TXT files here, or click to select'}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Maximum file size: 10MB
        </Typography>
      </Paper>

      {files.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Selected Files:
          </Typography>
          <List dense>
            {files.map((file, index) => (
              <ListItem key={index} secondaryAction={
                <Button size="small" color="error" onClick={() => removeFile(index)}>
                  Remove
                </Button>
              }>
                <ListItemIcon>
                  {getFileIcon(file.file.type)}
                </ListItemIcon>
                <ListItemText
                  primary={file.file.name}
                  secondary={`${(file.file.size / 1024).toFixed(2)} KB`}
                />
              </ListItem>
            ))}
          </List>

          {uploading && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress variant="determinate" value={uploadProgress} />
              <Typography variant="caption" align="center" display="block">
                Uploading... {uploadProgress}%
              </Typography>
            </Box>
          )}

          <Button
            variant="contained"
            onClick={uploadFiles}
            disabled={uploading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {uploading ? 'Uploading...' : `Upload ${files.length} File${files.length > 1 ? 's' : ''}`}
          </Button>
        </Box>
      )}

      {uploadStatus && (
        <Alert severity={uploadStatus.type} sx={{ mt: 2 }}>
          {uploadStatus.message}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;