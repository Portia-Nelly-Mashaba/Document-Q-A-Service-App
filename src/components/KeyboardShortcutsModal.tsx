import React, { useState, useEffect } from 'react';

interface Props {
  onClose: () => void;
}

const macShortcuts = [
  { action: 'Upload document', keys: '⌘ U' },
  { action: 'Focus search', keys: '⌘ K' },
  { action: 'Export Q&A history', keys: '⌘ E' },
  { action: 'Toggle dark mode', keys: '⌘ D' },
  { action: 'Show shortcuts', keys: '⌘ ?' },
  { action: 'Close modal / Deselect document', keys: 'Esc' },
  { action: 'Submit question', keys: '⌘ Enter' }
];

const windowsShortcuts = macShortcuts.map(s => ({ action: s.action, keys: s.keys.replace(/⌘/g, 'Ctrl') }));

const KeyboardShortcutsModal: React.FC<Props> = ({ onClose }) => {
  const [showWindows, setShowWindows] = useState(true);

  // When opened from Sidebar button, show Windows shortcuts by default per request
  useEffect(() => {
    setShowWindows(true);
  }, []);

  const shortcuts = showWindows ? windowsShortcuts : macShortcuts;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="upload-modal keyboard-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Keyboard Shortcuts</h2>
        <div style={{ marginBottom: 12 }}>
          <button
            onClick={() => setShowWindows(false)}
            style={{ marginRight: 8 }}
            className={`footer-link ${!showWindows ? 'active' : ''}`}
          >
            Mac
          </button>
          <button
            onClick={() => setShowWindows(true)}
            className={`footer-link ${showWindows ? 'active' : ''}`}
          >
            Windows
          </button>
        </div>

        <div className="shortcuts-list">
          {shortcuts.map((s) => (
            <div key={s.action} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <span>{s.action}</span>
              <code style={{ background: '#f3f4f6', padding: '4px 8px', borderRadius: 6 }}>{s.keys}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsModal;
