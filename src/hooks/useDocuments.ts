import { useState, useEffect } from 'react';
import { Document } from '../types';
import { mockDocuments } from '../utils/mockData';

function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    // Load initial mock data
    setDocuments(mockDocuments);
    if (mockDocuments.length > 0) {
      setSelectedDoc(mockDocuments[0]);
    }
  }, []);

  const uploadDocument = (file: File) => {
    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add new document
          const newDoc: Document = {
            id: Date.now().toString(),
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            uploadDate: new Date(),
            type: file.name.split('.').pop() || ''
          };
          
          setDocuments(prevDocs => [...prevDocs, newDoc]);
          setSelectedDoc(newDoc);
          setUploading(false);
          
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return {
    documents,
    selectedDoc,
    setSelectedDoc,
    uploadDocument,
    uploading,
    uploadProgress
  };
}

export default useDocuments;