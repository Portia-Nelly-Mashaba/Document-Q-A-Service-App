import React from 'react';
import { QA } from '../types';
import { Theme } from '../types';

interface QAHistoryProps {
  qaList: QA[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  theme: Theme;
  loading?: boolean;
}

const QAHistory: React.FC<QAHistoryProps> = ({ 
  qaList, 
  searchQuery, 
  onSearchChange,
  theme,
  loading = false
}) => {
  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
    if (diffInSeconds < 604800) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    }).format(date);
  };

  return (
    <div className="qa-history">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search questions and answers..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>
      
      <div className="qa-list">
        {loading ? (
          <div className="loading-skeleton-qa">
            {[1, 2].map(i => (
              <div key={i} className="qa-item-skeleton">
                <div className="skeleton-qa-bubble"></div>
                <div className="skeleton-qa-answer"></div>
              </div>
            ))}
          </div>
        ) : qaList.length === 0 ? (
          <div className="empty-state">
            {searchQuery ? 'No matching Q&A found' : 'No questions yet. Ask something!'}
          </div>
        ) : (
          qaList.map(qa => (
            <div key={qa.id} className="qa-item">
              <div className="qa-question-bubble">
                <div className="qa-bubble-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="chat-icon">
                    <path d="M8 0C3.58 0 0 3.13 0 7c0 1.23.35 2.38.96 3.37L0 16l5.88-1.12C6.75 15.5 7.37 15.5 8 15.5c4.42 0 8-3.13 8-7s-3.58-7-8-7z" fill={theme === 'light' ? '#000000' : '#ffffff'}/>
                  </svg>
                </div>
                <div className="qa-question-content">
                  <div className="qa-message-header">
                    <span className="qa-label">phase 1</span>
                    <span className="qa-time">{formatTime(qa.timestamp)}</span>
                  </div>
                  <div className="question-text">{qa.question}</div>
                </div>
              </div>
              <div className="qa-answer-bubble">
                <div className="answer-text">{qa.answer}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QAHistory;