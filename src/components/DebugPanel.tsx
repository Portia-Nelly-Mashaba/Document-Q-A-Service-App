import React, { useState } from 'react';
import { testGoogleAIAPI, AITestResult } from '../utils/testGoogleAI';
import '../styles/DebugPanel.css';

const DebugPanel: React.FC = () => {
  const [testResult, setTestResult] = useState<AITestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    const result = await testGoogleAIAPI();
    setTestResult(result);
    setIsLoading(false);
  };

  return (
    <div className="debug-panel">
      <div className="debug-header">
        <h3>🧪 Google AI Integration Test</h3>
        <button 
          onClick={handleTest} 
          disabled={isLoading}
          className={`test-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? 'Testing...' : 'Run Test'}
        </button>
      </div>

      {testResult && (
        <div className={`test-result ${testResult.success ? 'success' : 'error'}`}>
          <div className="result-status">
            <span className="status-icon">
              {testResult.success ? '✅' : '❌'}
            </span>
            <span className="status-text">{testResult.message}</span>
          </div>

          <div className="result-details">
            <p><strong>Response Time:</strong> {testResult.responseTime}ms</p>
            
            {testResult.response && (
              <div className="result-response">
                <strong>API Response:</strong>
                <p>{testResult.response}</p>
              </div>
            )}

            {testResult.error && (
              <div className="result-error">
                <strong>Error Details:</strong>
                <pre>{testResult.error}</pre>
              </div>
            )}
          </div>

          <div className="result-info">
            <p>
              <strong>Current API Key:</strong> {
                process.env.REACT_APP_GOOGLE_API_KEY 
                  ? `${process.env.REACT_APP_GOOGLE_API_KEY.substring(0, 10)}...` 
                  : 'Not configured'
              }
            </p>
            <p>
              <strong>API Endpoint:</strong> 
              https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugPanel;
