import React, { useState } from 'react';
import { Document } from '../types';
import DocumentList from './DocumentList';
import ThemeToggle from './ThemeToggle';
import KeyboardShortcutsModal from './KeyboardShortcutsModal';

interface SidebarProps {
  documents: Document[];
  selectedDoc: Document | null;
  onSelectDoc: (doc: Document) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onExport: () => void;
  onUploadClick: () => void;
  loading?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  documents,
  selectedDoc,
  onSelectDoc,
  theme,
  onThemeToggle,
  onExport,
  onUploadClick,
  loading = false
}) => {
  const [showShortcuts, setShowShortcuts] = useState(false);
  return (
    <div className={`sidebar ${theme}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="4" fill="#000"/>
              <path d="M7 8H17M7 12H17M7 16H12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <h1>DocQ&A</h1>
            <p className="subtitle">Document Intelligence</p>
          </div>
        </div>
      </div>
      
      <button className="upload-button" onClick={onUploadClick}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4V16M4 10H16" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        Upload Document
      </button>
      
      <DocumentList
        documents={documents}
        selectedDoc={selectedDoc}
        onSelectDoc={onSelectDoc}
        loading={loading}
      />
      
      <div className="sidebar-footer">
        <button className="footer-link" onClick={onExport}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M8 11L3 6H7V1H9V6H13L8 11Z" fill="currentColor"/>
            <path d="M1 13H15V15H1V13Z" fill="currentColor"/>
          </svg>
          Export Q&A History
        </button>
        <button className="footer-link" onClick={() => setShowShortcuts(true)}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <rect x="2" y="4" width="12" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            <path d="M5 7H11M5 9H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          Keyboard Shortcuts
        </button>
        <ThemeToggle theme={theme} onToggle={onThemeToggle} />
      </div>
      {showShortcuts && (
        <KeyboardShortcutsModal onClose={() => setShowShortcuts(false)} />
      )}
    </div>
  );
};

export default Sidebar;