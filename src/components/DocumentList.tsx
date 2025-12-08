import React from 'react';
import { Document } from '../types';

interface DocumentListProps {
  documents: Document[];
  selectedDoc: Document | null;
  onSelectDoc: (doc: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ 
  documents, 
  selectedDoc, 
  onSelectDoc 
}) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }).format(date);
  };

  return (
    <div className="document-list">
      <div className="document-list-header">
        <h3>Documents</h3>
        {documents.length > 0 && (
          <span className="document-badge">{documents.length}</span>
        )}
      </div>
      <div className="documents-container">
        {documents.map(doc => (
          <div 
            key={doc.id}
            className={`document-item ${selectedDoc?.id === doc.id ? 'selected' : ''}`}
            onClick={() => onSelectDoc(doc)}
          >
            <div className="doc-icon">
              {doc.type === 'pdf' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="18" height="22" x="3" y="2" rx="2" fill="#DC2626"/>
                  <path d="M7 8H17M7 12H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : doc.type === 'docx' ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="18" height="22" x="3" y="2" rx="2" fill="#2563EB"/>
                  <path d="M7 8H17M7 12H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="18" height="22" x="3" y="2" rx="2" fill="#6B7280"/>
                  <path d="M7 8H17M7 12H17M7 16H13" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </div>
            <div className="doc-info">
              <h4>{doc.name}</h4>
              <p>
                <span className="doc-size">{doc.size}</span>
                <span className="doc-status-dot"></span>
                {formatDate(doc.uploadDate)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;