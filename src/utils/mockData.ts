import { Document, QA } from '../types';

// Mock documents data
export const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'Project_Requirements.pdf',
    size: '2.3 MB',
    sizeInBytes: 2411725, // 2.3 * 1024 * 1024
    uploadDate: new Date('2024-01-15'),
    type: 'pdf'
  },
  {
    id: '2',
    name: 'Technical_Specification.docx',
    size: '1.2 MB',
    sizeInBytes: 1258291, // 1.2 * 1024 * 1024
    uploadDate: new Date('2024-01-16'),
    type: 'docx'
  },
  {
    id: '3',
    name: 'API_Documentation.md',
    size: '554.6 KB',
    sizeInBytes: 567910, // 554.6 * 1024
    uploadDate: new Date('2024-01-17'),
    type: 'md'
  },
  {
    id: '4',
    name: 'Coding_TypesScript_Interview_Package.pdf',
    size: '691 KB',
    sizeInBytes: 707584, // 691 * 1024
    uploadDate: new Date('2024-01-18'),
    type: 'pdf'
  }
];

// Mock Q&A data
export const mockQA: QA[] = [
  {
    id: '1',
    documentId: '1',
    question: 'What are the main requirements?',
    answer: 'The document provides detailed specifications:\n\n```typescript\ninterface Configuration {\n  maxConnections: number;\n  timeout: number;\n  retryAttempts: number;\n}\n```\n\nThese settings should be configured based on your **environment requirements**.',
    timestamp: new Date(Date.now() - 23 * 60 * 1000) // 23 minutes ago
  }
];