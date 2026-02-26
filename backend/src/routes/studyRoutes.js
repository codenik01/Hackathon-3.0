import express from 'express';
import studyController from '../controllers/studyController.js';

const router = express.Router();

// Generate study material for a subject
router.get('/material/:subjectId', studyController.generateStudyMaterial);

export default router;