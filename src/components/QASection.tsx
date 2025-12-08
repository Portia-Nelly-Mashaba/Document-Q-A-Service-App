import React, { useState, KeyboardEvent } from 'react';

interface QASectionProps {
  onAskQuestion: (question: string) => Promise<void>;
  loading: boolean;
}

const QASection: React.FC<QASectionProps> = ({ onAskQuestion, loading }) => {
  const [question, setQuestion] = useState('');
  const maxLength = 500;

  const handleSubmit = async () => {
    if (question.trim() && !loading) {
      await onAskQuestion(question);
      setQuestion('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="qa-section">
      <div className="question-input-wrapper">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about this document..."
          maxLength={maxLength}
          disabled={loading}
          className="question-textarea"
        />
        <div className="question-input-footer">
          <div className="question-input-left">
            <span className="char-count">
              {question.length}/{maxLength}
            </span>
            <span className="shortcut-hint-text">Press ⌘ + Enter to submit</span>
          </div>
          <div className="question-input-right">
            <button 
              className="question-icon-button" 
              title="Send"
              onClick={handleSubmit}
              disabled={!question.trim() || loading}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M2 10L18 2L12 10L18 18L2 10Z" fill="currentColor"/>
              </svg>
            </button>
            <button className="question-icon-button" title="Broadcast">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="3" fill="currentColor"/>
                <path d="M10 1V3M10 17V19M19 10H17M3 10H1M16.66 3.34L15.24 4.76M4.76 15.24L3.34 16.66M16.66 16.66L15.24 15.24M4.76 4.76L3.34 3.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={!question.trim() || loading}
              className="ask-button-primary"
            >
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QASection;