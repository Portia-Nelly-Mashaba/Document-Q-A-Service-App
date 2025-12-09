import React from 'react';
import { QA } from '../types';
import '../styles/QAResponseCard.css';

interface QAResponseCardProps {
  qa: QA;
  onDelete?: (id: string) => void;
}

const QAResponseCard: React.FC<QAResponseCardProps> = ({ qa, onDelete }) => {
  const isAIResponse = qa.metadata?.source === 'ai';
  const isMockResponse = qa.metadata?.source === 'mock';
  const responseTime = qa.metadata?.responseTime;

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className={`qa-response-card ${isAIResponse ? 'ai-response' : 'mock-response'}`}>
      <div className="qa-header">
        <div className="qa-meta">
          <span className="qa-time">{formatTime(qa.timestamp)}</span>
          <span className="qa-date">{formatDate(qa.timestamp)}</span>
          {isAIResponse && qa.metadata?.model && (
            <span className="qa-model" title="AI Model">
              🤖 {qa.metadata.model}
            </span>
          )}
          {isMockResponse && (
            <span className="qa-mock" title="Mock Data">
              🎭 Mock
            </span>
          )}
          {responseTime !== undefined && (
            <span className="qa-response-time" title="Response Time">
              ⚡ {responseTime}ms
            </span>
          )}
          {qa.metadata?.isError && (
            <span className="qa-error" title="Error - Using Mock Data">
              ⚠️ Error
            </span>
          )}
        </div>
        {onDelete && (
          <button 
            className="qa-delete-btn" 
            onClick={() => onDelete(qa.id)}
            title="Delete this Q&A"
            aria-label="Delete"
          >
            ×
          </button>
        )}
      </div>

      <div className="qa-content">
        <div className="qa-question">
          <strong className="question-label">Q:</strong>
          <p>{qa.question}</p>
        </div>

        <div className="qa-answer">
          <strong className="answer-label">A:</strong>
          <p className="answer-text">{qa.answer}</p>
        </div>
      </div>

      {qa.metadata && (
        <div className="qa-footer">
          <span className={`source-badge ${qa.metadata.source}`}>
            {isAIResponse ? '✓ Google AI Response' : '• Mock Response'}
          </span>
          {qa.metadata.responseTime !== undefined && (
            <span className="response-time-detail">
              Response time: {qa.metadata.responseTime}ms
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default QAResponseCard;
