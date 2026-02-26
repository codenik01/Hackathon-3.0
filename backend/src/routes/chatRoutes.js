import express from 'express';
import chatController from '../controllers/chatController.js';

const router = express.Router();

// Ask a question
router.post('/ask', chatController.askQuestion);

// Get chat history for a subject
router.get('/history/:subjectId', chatController.getChatHistory);

// Clear chat history for a subject
router.delete('/history/:subjectId', chatController.clearChatHistory);

export default router;