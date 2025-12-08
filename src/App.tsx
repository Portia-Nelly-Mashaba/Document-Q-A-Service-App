import React, { useState, useEffect } from 'react';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Sidebar from './components/Sidebar';
import UploadModal from './components/UploadModal';
import QASection from './components/QASection';
import QAHistory from './components/QAHistory';
import Toast from './components/Toast';
import useDocuments from './hooks/useDocuments';
import useQA from './hooks/useQA';
import useLocalStorage from './hooks/useLocalStorage';
import { Theme } from './types';

function App() {
  const [theme, setTheme] = useLocalStorage<Theme>('theme', 'light');
  const [toast, setToast] = useState<{message: string; type: 'success' | 'error' | 'info'} | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const {
    documents,
    selectedDoc,
    setSelectedDoc,
    uploadDocument,
    uploading,
    uploadProgress,
    loading: documentsLoading
  } = useDocuments();

  const {
    qaHistory,
    askQuestion,
    loading: qaLoading,
    initialLoading: qaInitialLoading,
    searchQuery,
    setSearchQuery,
    exportHistory
  } = useQA(selectedDoc?.id);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (!uploading && uploadProgress === 100) {
      setTimeout(() => {
        setShowUploadModal(false);
      }, 500);
    }
  }, [uploading, uploadProgress]);

  const handleUpload = async (file: File) => {
    try {
      uploadDocument(file);
      showToast('Document uploaded successfully!', 'success');
    } catch (error) {
      showToast('Upload failed. Please try again.', 'error');
    }
  };

  const handleUploadError = (message: string) => {
    showToast(message, 'error');
  };

  const handleAskQuestion = async (question: string) => {
    if (!selectedDoc) {
      showToast('Please select a document first', 'info');
      return;
    }
    
    try {
      await askQuestion(question, selectedDoc.id);
      showToast('Answer generated!', 'success');
    } catch (error) {
      showToast('Failed to get answer', 'error');
    }
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  return (
    <ErrorBoundary>
      <div className={`app ${theme}`}>
        <Sidebar
          documents={documents}
          selectedDoc={selectedDoc}
          onSelectDoc={setSelectedDoc}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          onExport={exportHistory}
          onUploadClick={() => setShowUploadModal(true)}
          loading={documentsLoading}
        />
        
        <main className="main-content">
          <div className="content-header">
            <h2>{selectedDoc?.name || 'Select a document'}</h2>
            <p>Ask questions about this document</p>
          </div>
          
          <div className="qa-container">
            <QAHistory
              qaList={qaHistory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              theme={theme}
              loading={qaInitialLoading}
            />
            
            <QASection
              onAskQuestion={handleAskQuestion}
              loading={qaLoading}
            />
          </div>
        </main>

        <UploadModal
          isOpen={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          onUpload={handleUpload}
          uploading={uploading}
          progress={uploadProgress}
          onError={handleUploadError}
        />

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;