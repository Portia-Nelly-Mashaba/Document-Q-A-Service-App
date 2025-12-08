import React, { useCallback, useRef, useState, useEffect } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  uploading: boolean;
  progress: number;
  onError?: (message: string) => void;
}

const ALLOWED_TYPES = ['pdf', 'docx', 'doc', 'md', 'txt', 'json'];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  uploading,
  progress,
  onError
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !ALLOWED_TYPES.includes(fileExtension)) {
      return `File type not supported. Allowed types: ${ALLOWED_TYPES.join(', ').toUpperCase()}`;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      return `File size exceeds limit. Maximum size: ${(MAX_FILE_SIZE / (1024 * 1024)).toFixed(0)}MB`;
    }
    
    return null;
  };

  // Reset processing flag when upload completes
  useEffect(() => {
    if (!uploading && progress === 0) {
      setIsProcessing(false);
    }
  }, [uploading, progress]);

  const handleFile = useCallback((file: File) => {
    // Prevent duplicate processing
    if (isProcessing || uploading) {
      return;
    }

    setIsProcessing(true);
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      if (onError) {
        onError(error);
      }
      setTimeout(() => {
        setValidationError('');
        setIsProcessing(false);
      }, 5000);
      return;
    }
    
    setValidationError('');
    onUpload(file);
  }, [onUpload, onError, isProcessing, uploading]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    
    if (uploading || isProcessing) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile, uploading, isProcessing]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!uploading) {
      setDragOver(true);
    }
  }, [uploading]);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!uploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [uploading]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && !uploading && !isProcessing) {
      handleFile(files[0]);
    }
    // Reset input so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFile, uploading, isProcessing]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div 
          className={`modal-upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
        >
          <input 
            ref={fileInputRef}
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.docx,.doc,.md,.txt,.json"
            style={{ display: 'none' }}
            disabled={uploading}
          />
          
          {uploading ? (
            <div className="upload-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p>Uploading... {progress}%</p>
            </div>
          ) : (
            <>
              <div className="modal-upload-icon">
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <rect width="64" height="64" rx="8" fill="#F3F4F6"/>
                  <path d="M32 20V44M20 32H44" stroke="#9CA3AF" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h2>Upload Documents</h2>
              <p>Drag and drop files or click to browse</p>
              <p className="modal-upload-hint">Supports PDF, DOCX, TXT, MD, JSON (Max 10MB)</p>
              {validationError && (
                <div className="upload-validation-error">{validationError}</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

