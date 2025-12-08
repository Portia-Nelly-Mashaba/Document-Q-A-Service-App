import { useState, useEffect, useCallback } from 'react';
import { QA } from '../types';
import { mockQA } from '../utils/mockData';

function useQA(documentId?: string) {
  const [qaHistory, setQAHistory] = useState<QA[]>(mockQA);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredQA = qaHistory.filter(qa => 
    (!documentId || qa.documentId === documentId) &&
    (qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     qa.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
    searchQuery,
    setSearchQuery,
    exportHistory
  };
}

export default useQA;