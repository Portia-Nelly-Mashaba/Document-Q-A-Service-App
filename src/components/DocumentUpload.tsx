import React, { useCallback, useRef, useState } from 'react';

interface DocumentUploadProps {
  onUpload: (file: File) => void;
  uploading: boolean;
  progress: number;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ 
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

  return (
    <div className="document-upload">
      <div 
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${uploading ? 'uploading' : ''}`}
        style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
      >
        <input 
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.docx,.doc,.md,.txt"
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
            <div className="upload-icon">📄</div>
            <h3>Upload Document</h3>
            <p>Drag & drop a file here, or click to select</p>
            <p className="upload-hint">Supports: PDF, DOCX, MD, TXT</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;