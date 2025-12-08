import React, { useCallback, useRef, useState } from 'react';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  uploading: boolean;
  progress: number;
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload,
  uploading,
  progress
}) => {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    
    if (uploading) return;
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onUpload(files[0]);
    }
  }, [onUpload, uploading]);

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
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  }, [onUpload]);

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
              <p className="modal-upload-hint">Supports PDF, DOCX, TXT, MD, JSON</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

