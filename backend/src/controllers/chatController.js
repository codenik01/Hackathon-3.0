import ChatHistory from '../models/ChatHistory.js';
import Subject from '../models/Subject.js';
import vectorService from '../services/vectorService.js';

const chatController = {
  async askQuestion(req, res) {
    try {
      const { subjectId, question } = req.body;

      if (!subjectId || !question) {
        return res.status(400).json({ error: 'Subject ID and question are required' });
      }

      // Get subject details
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }

      // Search for relevant chunks
      const relevantChunks = await vectorService.searchSimilar(subjectId, question, 5);

      if (relevantChunks.length === 0) {
        return res.json({
          answer: `Not found in your notes for ${subject.name}`,
          citations: [],
          confidence: 'Low',
          evidence: ''
        });
      }

      // Generate answer using LLM
      const response = await vectorService.generateAnswer(
        subject.name,
        question,
        relevantChunks
      );

      // Check if answer was found
      const notFound = await vectorService.checkIfNotFound(response.answer, subject.name);
      
      if (notFound) {
        return res.json({
          answer: `Not found in your notes for ${subject.name}`,
          citations: [],
          confidence: 'Low',
          evidence: ''
        });
      }

      // Save to chat history
      let chatHistory = await ChatHistory.findOne({ subjectId });
      
      if (!chatHistory) {
        chatHistory = new ChatHistory({
          subjectId,
          messages: []
        });
      }

      // Add user message
      chatHistory.messages.push({
        role: 'user',
        content: question
      });

      // Add assistant message
      chatHistory.messages.push({
        role: 'assistant',
        content: response.answer,
        citations: response.citations,
        confidence: response.confidence,
        evidence: response.evidence
      });

      await chatHistory.save();

      res.json({
        answer: response.answer,
        citations: response.citations,
        confidence: response.confidence,
        evidence: response.evidence
      });
    } catch (error) {
      console.error('Error processing question:', error);
      res.status(500).json({ error: 'Failed to process question' });
    }
  },

  async getChatHistory(req, res) {
    try {
      const { subjectId } = req.params;

      const chatHistory = await ChatHistory.findOne({ subjectId });
      
      if (!chatHistory) {
        return res.json({ messages: [] });
      }

      res.json(chatHistory);
    } catch (error) {
      console.error('Error fetching chat history:', error);
      res.status(500).json({ error: 'Failed to fetch chat history' });
    }
  },

  async clearChatHistory(req, res) {
    try {
      const { subjectId } = req.params;

      await ChatHistory.findOneAndDelete({ subjectId });

      res.json({ message: 'Chat history cleared successfully' });
    } catch (error) {
      console.error('Error clearing chat history:', error);
      res.status(500).json({ error: 'Failed to clear chat history' });
    }
  }
};

export default chatController;