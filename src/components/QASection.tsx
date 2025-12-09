import React, { useState, KeyboardEvent, useEffect } from 'react';

interface QASectionProps {
  onAskQuestion: (question: string) => Promise<void>;
  loading: boolean;
}

const QASection: React.FC<QASectionProps> = ({ onAskQuestion, loading }) => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const [touched, setTouched] = useState(false);
  const maxLength = 500;

  useEffect(() => {
    if (touched) {
      if (!question.trim()) {
        setError('Question cannot be empty');
      } else if (question.trim().length < 3) {
        setError('Question must be at least 3 characters');
      } else {
        setError('');
      }
    }
  }, [question, touched]);

  const handleSubmit = async () => {
    setTouched(true);
    if (!question.trim()) {
      setError('Question cannot be empty');
      return;
    }
    if (question.trim().length < 3) {
      setError('Question must be at least 3 characters');
      return;
    }
    if (question.trim() && !loading && !error) {
      await onAskQuestion(question);
      setQuestion('');
      setError('');
      setTouched(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const isNearLimit = question.length > maxLength * 0.9;
  const isAtLimit = question.length >= maxLength;

  // Show platform specific shortcut hint
  const [shortcutHint, setShortcutHint] = useState('⌘ + Enter');

  useEffect(() => {
    try {
      const platform = navigator?.platform || '';
      if (/Win/i.test(platform)) {
        setShortcutHint('Ctrl + Enter');
      } else {
        setShortcutHint('⌘ + Enter');
      }
    } catch (e) {
      setShortcutHint('⌘ + Enter');
    }
  }, []);

  return (
    <div className="qa-section">
      <div className={`question-input-wrapper ${error && touched ? 'has-error' : ''} ${isAtLimit ? 'at-limit' : ''}`}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          placeholder="Ask a question about this document..."
          maxLength={maxLength}
          disabled={loading}
          className={`question-textarea ${error && touched ? 'error' : ''}`}
        />
        {error && touched && (
          <div className="validation-error">{error}</div>
        )}
        <div className="question-input-footer">
          <div className="question-input-left">
            <span className={`char-count ${isNearLimit ? 'warning' : ''} ${isAtLimit ? 'error' : ''}`}>
              {question.length}/{maxLength}
            </span>
            <span className="shortcut-hint-text">Press {shortcutHint} to submit</span>
          </div>
          <div className="question-input-right">
            <button 
              onClick={handleSubmit} 
              disabled={!question.trim() || loading}
              className={`ask-button-primary ${loading ? 'loading' : ''}`}
              aria-disabled={!question.trim() || loading}
              data-loading={loading ? 'true' : 'false'}
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