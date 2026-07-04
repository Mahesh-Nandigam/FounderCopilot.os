import React from 'react';

export const HirepanelWorkspace: React.FC = () => {
  return (
    <div className="animate-slide-in" style={{ width: '100%', height: '100%', minHeight: '80vh', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', background: '#000', position: 'relative' }}>
      <iframe 
        src="http://localhost:5174" 
        style={{ width: '100%', height: '100%', border: 'none', position: 'absolute', top: 0, left: 0 }}
        title="Hirepanel.ai Workspace"
        allow="microphone"
      />
    </div>
  );
};
