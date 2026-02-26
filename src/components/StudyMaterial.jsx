import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Quiz as QuizIcon,
  QuestionAnswer as QAIcon,
  MenuBook as BookIcon
} from '@mui/icons-material';
import axios from 'axios';

const StudyMaterial = ({ subject, API_BASE_URL }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [material, setMaterial] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    generateMaterial();
  }, [subject]);

  const generateMaterial = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(
        `${API_BASE_URL}/study/material/${subject._id}`
      );
      setMaterial(response.data);
    } catch (error) {
      console.error('Error generating study material:', error);
      setError(error.response?.data?.error || 'Failed to generate study material');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionIndex, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answer
    }));
  };

  const checkAnswer = (questionIndex, selected, correct) => {
    if (!showAnswers) return null;
    return selected === correct ? 'success' : 'error';
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!material) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No study material available. Please upload notes first.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Study Mode: {material.subject}
      </Typography>

      <Grid container spacing={3}>
        {/* MCQs Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<QuizIcon color="primary" />}
              title="Multiple Choice Questions"
              subheader="5 Questions"
            />
            <Divider />
            <CardContent>
              {material.mcqs.map((mcq, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">
                      Question {index + 1}: {mcq.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <FormControl component="fieldset" fullWidth>
                      <RadioGroup
                        value={selectedAnswers[`mcq_${index}`] || ''}
                        onChange={(e) => handleAnswerSelect(`mcq_${index}`, e.target.value)}
                      >
                        {mcq.options.map((option, optIndex) => (
                          <FormControlLabel
                            key={optIndex}
                            value={String.fromCharCode(65 + optIndex)}
                            control={<Radio />}
                            label={`${String.fromCharCode(65 + optIndex)}. ${option}`}
                            sx={{
                              color: checkAnswer(
                                `mcq_${index}`,
                                String.fromCharCode(65 + optIndex),
                                mcq.correctAnswer
                              ) === 'success' ? 'success.main' :
                              checkAnswer(
                                `mcq_${index}`,
                                String.fromCharCode(65 + optIndex),
                                mcq.correctAnswer
                              ) === 'error' ? 'error.main' : 'inherit'
                            }}
                          />
                        ))}
                      </RadioGroup>
                    </FormControl>

                    {showAnswers && (
                      <Box sx={{ mt: 2 }}>
                        <Chip
                          size="small"
                          label={`Confidence: ${mcq.confidence}`}
                          color={mcq.confidence === 'High' ? 'success' : 'warning'}
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Typography variant="body2" color="primary" gutterBottom>
                          Explanation: {mcq.explanation}
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                          <Typography variant="caption" color="textSecondary">
                            Source: {mcq.citation.filename}
                          </Typography>
                          <Typography variant="body2">
                            "{mcq.citation.evidence.substring(0, 150)}..."
                          </Typography>
                        </Paper>
                      </Box>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Short Answer Questions Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader
              avatar={<QAIcon color="secondary" />}
              title="Short Answer Questions"
              subheader="3 Questions"
            />
            <Divider />
            <CardContent>
              {material.shortQuestions.map((question, index) => (
                <Accordion key={index} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle2">
                      Question {index + 1}: {question.question}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    {showAnswers ? (
                      <Box>
                        <Chip
                          size="small"
                          label={`Confidence: ${question.confidence}`}
                          color={question.confidence === 'High' ? 'success' : 'warning'}
                          sx={{ mr: 1, mb: 1 }}
                        />
                        <Typography variant="body2" paragraph>
                          <strong>Model Answer:</strong> {question.modelAnswer}
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 1, bgcolor: 'grey.50' }}>
                          <Typography variant="caption" color="textSecondary">
                            Source: {question.citation.filename}
                          </Typography>
                          <Typography variant="body2">
                            "{question.citation.evidence.substring(0, 150)}..."
                          </Typography>
                        </Paper>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="textSecondary">
                        Answer will be revealed when you check answers.
                      </Typography>
                    )}
                  </AccordionDetails>
                </Accordion>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => setShowAnswers(!showAnswers)}
            >
              {showAnswers ? 'Hide Answers' : 'Check Answers'}
            </Button>
            <Button
              variant="outlined"
              onClick={generateMaterial}
            >
              Regenerate Material
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudyMaterial;