import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const SubjectSetup = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [subjects, setSubjects] = useState([
    { name: '', description: '' },
    { name: '', description: '' },
    { name: '', description: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const steps = ['Subject 1', 'Subject 2', 'Subject 3'];

  const handleSubjectChange = (index, field, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const handleNext = () => {
    if (!subjects[activeStep].name.trim()) {
      setError('Subject name is required');
      return;
    }
    setError('');
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    // Validate all subjects
    for (let i = 0; i < subjects.length; i++) {
      if (!subjects[i].name.trim()) {
        setError(`Subject ${i + 1} name is required`);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_BASE_URL}/subjects/initialize`, {
        subjects: subjects
      });
      
      onComplete(response.data.subjects);
    } catch (error) {
      console.error('Error creating subjects:', error);
      setError(error.response?.data?.error || 'Failed to create subjects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        Set Up Your 3 Study Subjects
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 4 }}>
        You need exactly 3 subjects to use AskMyNotes
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Subject Name"
              value={subjects[activeStep].name}
              onChange={(e) => handleSubjectChange(activeStep, 'name', e.target.value)}
              placeholder="e.g., Database Management Systems"
              disabled={loading}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description (Optional)"
              value={subjects[activeStep].description}
              onChange={(e) => handleSubjectChange(activeStep, 'description', e.target.value)}
              placeholder="Brief description of the subject"
              multiline
              rows={2}
              disabled={loading}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={handleBack}
          disabled={activeStep === 0 || loading}
        >
          Back
        </Button>
        <Box>
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Complete Setup'}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default SubjectSetup;