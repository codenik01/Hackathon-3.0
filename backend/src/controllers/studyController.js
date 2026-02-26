import Subject from '../models/Subject.js';
import vectorService from '../services/vectorService.js';
import { OpenAI } from 'langchain/llms/openai';

const studyController = {
  async generateStudyMaterial(req, res) {
    try {
      const { subjectId } = req.params;

      const subject = await Subject.findById(subjectId);
      if (!subject) {
        return res.status(404).json({ error: 'Subject not found' });
      }

      // Get all chunks for the subject
      const allChunks = await vectorService.searchSimilar(subjectId, '*', 20);

      if (allChunks.length === 0) {
        return res.status(400).json({ 
          error: 'No notes found for this subject. Please upload notes first.' 
        });
      }

      const context = allChunks.map(chunk => chunk.content).join('\n\n');

      // Generate MCQs
      const mcqs = await generateMCQs(context, subject.name, allChunks);
      
      // Generate Short Answer Questions
      const shortQuestions = await generateShortQuestions(context, subject.name, allChunks);

      res.json({
        subject: subject.name,
        mcqs,
        shortQuestions
      });
    } catch (error) {
      console.error('Error generating study material:', error);
      res.status(500).json({ error: 'Failed to generate study material' });
    }
  }
};

async function generateMCQs(context, subjectName, chunks) {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.3,
    modelName: 'gpt-3.5-turbo'
  });

  const prompt = `
Based on the following notes for ${subjectName}, generate 5 multiple choice questions.
Context:
${context}

For each question, provide:
1. The question
2. 4 options (A, B, C, D)
3. The correct answer
4. A short explanation
5. Citation from the notes

Format each question as JSON:
{
  "question": "string",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "A",
  "explanation": "string",
  "citation": {
    "filename": "string",
    "evidence": "string"
  }
}

Return as a JSON array.
`;

  try {
    const response = await llm.call(prompt);
    const mcqs = JSON.parse(response);
    
    // Add confidence and map to chunks
    return mcqs.map((mcq, index) => ({
      ...mcq,
      confidence: 'High',
      citation: {
        ...mcq.citation,
        chunk: chunks[index % chunks.length]?.content.substring(0, 200) + '...'
      }
    }));
  } catch (error) {
    console.error('Error generating MCQs:', error);
    return [];
  }
}

async function generateShortQuestions(context, subjectName, chunks) {
  const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.3,
    modelName: 'gpt-3.5-turbo'
  });

  const prompt = `
Based on the following notes for ${subjectName}, generate 3 short answer questions.
Context:
${context}

For each question, provide:
1. The question
2. A model answer
3. Citation from the notes

Format each question as JSON:
{
  "question": "string",
  "modelAnswer": "string",
  "citation": {
    "filename": "string",
    "evidence": "string"
  }
}

Return as a JSON array.
`;

  try {
    const response = await llm.call(prompt);
    const questions = JSON.parse(response);
    
    // Add confidence and map to chunks
    return questions.map((q, index) => ({
      ...q,
      confidence: 'High',
      citation: {
        ...q.citation,
        chunk: chunks[index % chunks.length]?.content.substring(0, 200) + '...'
      }
    }));
  } catch (error) {
    console.error('Error generating short questions:', error);
    return [];
  }
}

export default studyController;