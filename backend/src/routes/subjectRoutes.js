const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');
const fileService = require('../services/fileService');

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

module.exports = router;