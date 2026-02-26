import express from 'express';
import subjectController from '../controllers/subjectController.js';
import fileService from '../services/fileService.js';

const router = express.Router();

// Initialize 3 subjects
router.post('/initialize', subjectController.initializeSubjects);

// Get all subjects
router.get('/', subjectController.getAllSubjects);

// Get subject details
router.get('/:id', subjectController.getSubjectDetails);

// Upload files for a subject
router.post(
  '/upload',
  fileService.getUploadMiddleware(),
  subjectController.uploadFiles
);

// Delete subject
router.delete('/:id', subjectController.deleteSubject);

export default router;