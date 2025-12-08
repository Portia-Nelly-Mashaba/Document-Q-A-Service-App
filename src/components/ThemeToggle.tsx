import React from 'react';
import { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button className="theme-toggle" onClick={onToggle}>
      {theme === 'light' ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
          Dark Mode
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}>
            <path d="M8 2C5.239 2 3 4.239 3 7C3 9.761 5.239 12 8 12C10.761 12 13 9.761 13 7C13 4.239 10.761 2 8 2Z" fill="currentColor"/>
          </svg>
          Light Mode
        </>
      )}
    </button>
  );
};

export default ThemeToggle;