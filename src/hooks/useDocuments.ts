import { useState, useEffect } from 'react';
import { Document } from '../types';
import { mockDocuments } from '../utils/mockData';

const STORAGE_KEY = 'documents';
const SELECTED_DOC_KEY = 'selectedDocument';

function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load documents from localStorage or use mock data
  useEffect(() => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedSelected = localStorage.getItem(SELECTED_DOC_KEY);
      
      if (stored) {
        const parsedDocs: Document[] = JSON.parse(stored).map((doc: any) => ({
          ...doc,
          uploadDate: new Date(doc.uploadDate),
          // Ensure sizeInBytes exists for backward compatibility
          sizeInBytes: doc.sizeInBytes || 0
        }));
        setDocuments(parsedDocs);
        
        if (storedSelected && parsedDocs.length > 0) {
          const selectedId = JSON.parse(storedSelected);
          const found = parsedDocs.find(doc => doc.id === selectedId);
          setSelectedDoc(found || parsedDocs[0]);
        } else if (parsedDocs.length > 0) {
          setSelectedDoc(parsedDocs[0]);
        }
      } else {
        // First time - use mock data
        setDocuments(mockDocuments);
        if (mockDocuments.length > 0) {
          setSelectedDoc(mockDocuments[0]);
        }
      }
    } catch (error) {
      console.error('Error loading documents:', error);
      setDocuments(mockDocuments);
      if (mockDocuments.length > 0) {
        setSelectedDoc(mockDocuments[0]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Save documents to localStorage whenever they change (but not during initial load)
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }
    
    if (documents.length > 0 && !loading) {
      try {
        // Ensure all documents have sizeInBytes before saving
        const documentsToSave = documents.map(doc => ({
          ...doc,
          sizeInBytes: doc.sizeInBytes ?? 0 // Ensure sizeInBytes is always present
        }));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(documentsToSave));
      } catch (error) {
        console.error('Error saving documents:', error);
      }
    }
  }, [documents, loading, isInitialLoad]);

  // Save selected document to localStorage
  useEffect(() => {
    if (selectedDoc && !loading) {
      try {
        localStorage.setItem(SELECTED_DOC_KEY, JSON.stringify(selectedDoc.id));
      } catch (error) {
        console.error('Error saving selected document:', error);
      }
    }
  }, [selectedDoc, loading]);

  const uploadDocument = (file: File) => {
    // Prevent duplicate uploads
    if (uploading) {
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          // Add new document with unique ID based on timestamp and file name
          const newDoc: Document = {
            id: `${Date.now()}-${file.name}-${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
            sizeInBytes: file.size, // Save raw file size in bytes
            uploadDate: new Date(),
            type: file.name.split('.').pop()?.toLowerCase() || ''
          };
          
          setDocuments(prevDocs => {
            // Check if document with same name and size already exists
            const exists = prevDocs.some(doc => 
              doc.name === newDoc.name && 
              doc.size === newDoc.size &&
              doc.sizeInBytes === file.size
            );
            if (exists) {
              return prevDocs;
            }
            // Ensure sizeInBytes is included
            const docWithSize = {
              ...newDoc,
              sizeInBytes: newDoc.sizeInBytes ?? file.size
            };
            return [...prevDocs, docWithSize];
          });
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
    uploadProgress,
    loading
  };
}

export default useDocuments;