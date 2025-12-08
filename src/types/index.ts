// Define all TypeScript interfaces for the project

export interface Document {
    id: string;
    name: string;
    size: string;
    uploadDate: Date;
    type: string;
  }
  
  export interface QA {
    id: string;
    documentId: string;
    question: string;
    answer: string;
    timestamp: Date;
  }
  
  export interface Configuration {
    maxConnections: number;
    timeout: number;
    retryAttempts: number;
  }
  
  export type Theme = 'light' | 'dark';