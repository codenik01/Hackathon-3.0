import { ChromaClient } from 'chromadb';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from 'langchain/llms/openai';
import { Chroma } from 'langchain/vectorstores/chroma';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import dotenv from 'dotenv';

dotenv.config();

class VectorService {
  constructor() {
    this.client = new ChromaClient({
      path: process.env.CHROMA_DB_PATH
    });
    this.embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY
    });
    this.llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
      modelName: 'gpt-3.5-turbo'
    });
  }

  async createCollection(subjectId) {
    try {
      const collection = await this.client.createCollection({
        name: `subject_${subjectId}`,
        metadata: { "subject-id": subjectId }
      });
      return collection;
    } catch (error) {
      console.error('Error creating collection:', error);
      throw error;
    }
  }

  async getCollection(subjectId) {
    try {
      const collections = await this.client.listCollections();
      const collectionName = `subject_${subjectId}`;
      
      if (collections.includes(collectionName)) {
        return await this.client.getCollection({ name: collectionName });
      }
      return null;
    } catch (error) {
      console.error('Error getting collection:', error);
      return null;
    }
  }

  async addDocuments(subjectId, documents, metadata) {
    try {
      let collection = await this.getCollection(subjectId);
      if (!collection) {
        collection = await this.createCollection(subjectId);
      }

      const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
      });

      const docs = await textSplitter.createDocuments(
        documents,
        [metadata]
      );

      const vectorStore = await Chroma.fromDocuments(
        docs,
        this.embeddings,
        {
          collectionName: `subject_${subjectId}`,
          url: process.env.CHROMA_DB_PATH
        }
      );

      return docs.length;
    } catch (error) {
      console.error('Error adding documents:', error);
      throw error;
    }
  }

  async searchSimilar(subjectId, query, k = 5) {
    try {
      const vectorStore = await Chroma.fromExistingCollection(
        this.embeddings,
        {
          collectionName: `subject_${subjectId}`,
          url: process.env.CHROMA_DB_PATH
        }
      );

      const results = await vectorStore.similaritySearchWithScore(query, k);
      
      return results.map(([doc, score]) => ({
        content: doc.pageContent,
        metadata: doc.metadata,
        score: score
      }));
    } catch (error) {
      console.error('Error searching similar:', error);
      return [];
    }
  }

  async generateAnswer(subjectName, question, relevantChunks) {
    try {
      const context = relevantChunks.map(chunk => chunk.content).join('\n\n');
      
      const prompt = `
You are a study assistant that ONLY answers questions based on the provided notes.
Context from the notes:
${context}

Question: ${question}

Instructions:
1. Answer based ONLY on the context provided above
2. If the answer cannot be found in the context, say "Not found in your notes for ${subjectName}"
3. Include citations referencing the specific chunks used
4. Rate your confidence (High/Medium/Low) based on how directly the context answers the question

Answer format:
Answer: [Your answer based only on context]

Citations:
- File: [filename], Page: [page if available]
Evidence: [Direct quote from context]

Confidence: [High/Medium/Low]
`;

      const response = await this.llm.call(prompt);
      return this.parseResponse(response, relevantChunks);
    } catch (error) {
      console.error('Error generating answer:', error);
      throw error;
    }
  }

  parseResponse(response, chunks) {
    const lines = response.split('\n');
    let answer = '';
    let citations = [];
    let confidence = 'Low';
    let evidence = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('Answer:')) {
        answer = line.substring(7).trim();
      } else if (line.startsWith('Confidence:')) {
        confidence = line.substring(11).trim();
      } else if (line.startsWith('Evidence:')) {
        evidence = line.substring(9).trim();
      }
    }

    // Extract citations
    if (chunks && chunks.length > 0) {
      citations = chunks.map(chunk => ({
        filename: chunk.metadata?.filename || 'Unknown',
        pageNumber: chunk.metadata?.pageNumber || 1,
        chunk: chunk.content.substring(0, 200) + '...',
        confidence: confidence,
        evidence: chunk.content
      }));
    }

    return {
      answer,
      citations,
      confidence,
      evidence
    };
  }

  async checkIfNotFound(answer, subjectName) {
    return answer.includes(`Not found in your notes for ${subjectName}`);
  }
}

export default new VectorService();