import axios from 'axios';
import logger from '../utils/logger';

export interface IAIService {
  queryTutor(courseId: string, question: string, conversationId?: string): Promise<any>;
  forgeCourse(topic: string, level: string): Promise<any>;
  ingestMaterials(courseId: string, filePath: string): Promise<any>;
}

export class AIService implements IAIService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = process.env.AI_ENGINE_URL || 'http://localhost:8000';
  }

  async queryTutor(courseId: string, question: string, conversationId?: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/query`, {
        course_id: courseId,
        question: question,
        conversation_id: conversationId
      });
      return response.data;
    } catch (error) {
      logger.error('Error querying AI Engine:', error);
      throw error;
    }
  }

  async forgeCourse(topic: string, level: string) {
    try {
      const response = await axios.post(`${this.baseUrl}/forge`, {
        topic,
        level
      });
      return response.data;
    } catch (error) {
      logger.error('Error forging course:', error);
      throw error;
    }
  }

  async ingestMaterials(courseId: string, filePath: string) {
    try {
      const FormData = require('form-data');
      const fs = require('fs');
      const form = new FormData();
      form.append('course_id', courseId);
      form.append('file', fs.createReadStream(filePath));

      const response = await axios.post(`${this.baseUrl}/ingest`, form, {
        headers: { ...form.getHeaders() }
      });
      return response.data;
    } catch (error) {
      logger.error('Error ingesting into AI Engine:', error);
      throw error;
    }
  }
}
