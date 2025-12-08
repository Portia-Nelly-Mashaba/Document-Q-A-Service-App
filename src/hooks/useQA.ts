import { useState, useEffect, useCallback } from 'react';
import { QA } from '../types';
import { mockQA } from '../utils/mockData';
import useDebounce from './useDebounce';

const STORAGE_KEY = 'qaHistory';

function useQA(documentId?: string) {
  const [qaHistory, setQAHistory] = useState<QA[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 400);

  // Load Q&A from localStorage or use mock data
  useEffect(() => {
    setInitialLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      
      if (stored) {
        const parsedQA: QA[] = JSON.parse(stored).map((qa: any) => ({
          ...qa,
          timestamp: new Date(qa.timestamp)
        }));
        setQAHistory(parsedQA);
      } else {
        // First time - use mock data
        setQAHistory(mockQA);
      }
    } catch (error) {
      console.error('Error loading Q&A history:', error);
      setQAHistory(mockQA);
    } finally {
      setInitialLoading(false);
    }
  }, []);

  // Save Q&A to localStorage whenever it changes
  useEffect(() => {
    if (qaHistory.length >= 0 && !initialLoading) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(qaHistory));
      } catch (error) {
        console.error('Error saving Q&A history:', error);
      }
    }
  }, [qaHistory, initialLoading]);

  const askQuestion = useCallback(async (question: string, docId: string) => {
    if (!question.trim()) return null;

    setLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newQA: QA = {
      id: Date.now().toString(),
      documentId: docId,
      question,
      answer: `This is a mock response to: "${question}". In a real application, this would come from an AI model analyzing the document.`,
      timestamp: new Date()
    };

    setQAHistory(prev => [newQA, ...prev]);
    setLoading(false);
    return newQA;
  }, []);

  // Filter Q&A based on documentId and debounced search query
  const filteredQA = qaHistory.filter(qa => {
    const matchesDocument = !documentId || qa.documentId === documentId;
    const matchesSearch = !debouncedSearchQuery || 
      qa.question.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      qa.answer.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesDocument && matchesSearch;
  });

  const exportHistory = useCallback(() => {
    const dataStr = JSON.stringify(filteredQA, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `qa-history-${new Date().toISOString()}.json`;
    link.click();
  }, [filteredQA]);

  return {
    qaHistory: filteredQA,
    askQuestion,
    loading,
    initialLoading,
    searchQuery,
    setSearchQuery,
    exportHistory
  };
}

export default useQA;