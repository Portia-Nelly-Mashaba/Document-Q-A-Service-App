import { useState, useEffect, useCallback } from 'react';
import { QA } from '../types';
import { mockQA } from '../utils/mockData';
import useDebounce from './useDebounce';

const STORAGE_KEY = 'qaHistory';
const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
// Updated endpoint - using stable API version
const GOOGLE_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent';

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
    const startTime = Date.now();

    let answer: string;
    let source: 'ai' | 'mock' = 'mock';
    let responseTime: number | undefined;
    let model = 'gemini-pro';
    let isError = false;

    // Try to use Google AI if API key is available
    if (GOOGLE_API_KEY) {
      try {
        console.log('🔵 Attempting Google AI API call...');
        console.log('📍 Endpoint:', GOOGLE_API_URL);
        console.log('🔑 API Key configured:', !!GOOGLE_API_KEY);

        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: question
                }
              ]
            }
          ]
        };

        console.log('📤 Request body:', JSON.stringify(requestBody, null, 2));

        const response = await fetch(`${GOOGLE_API_URL}?key=${GOOGLE_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        responseTime = Date.now() - startTime;

        console.log('📥 Response status:', response.status);
        console.log('📥 Response headers:', Object.fromEntries(response.headers));

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ Error response body:', errorText);
          throw new Error(`API request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        
        console.log('📦 Parsed response:', JSON.stringify(data, null, 2));

        // Extract the generated text from the response
        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
          answer = data.candidates[0].content.parts[0].text;
          source = 'ai';
          console.log(`✓ Google AI Response (${responseTime}ms):`, answer.substring(0, 100) + '...');
        } else {
          console.error('❌ Unexpected response format:', data);
          throw new Error('Invalid response format from Google AI');
        }
      } catch (error) {
        console.warn('⚠ Google AI API failed, using mock data:', error);
        console.error('Error details:', error instanceof Error ? error.message : String(error));
        isError = true;
        responseTime = Date.now() - startTime;
        // Fallback to mock data
        answer = `This is a simulated response to: "${question}". \n\nNote: The Google AI API encountered an issue. Please check your API key configuration and try again.`;
      }
    } else {
      console.warn('⚠ Google API key not configured, using mock data');
      responseTime = 0;
      // No API key available, use mock data
      answer = `This is a simulated response to: "${question}". \n\nℹ️ Tip: To enable real AI responses, configure the REACT_APP_GOOGLE_API_KEY environment variable with your Google Generative AI API key.`;
    }

    const newQA: QA = {
      id: Date.now().toString(),
      documentId: docId,
      question,
      answer,
      timestamp: new Date(),
      metadata: {
        source,
        responseTime,
        model: source === 'ai' ? model : undefined,
        isError: source === 'mock' && isError ? true : undefined
      }
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