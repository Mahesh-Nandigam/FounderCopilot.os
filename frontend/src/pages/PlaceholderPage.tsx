import React from 'react';
import { Construction } from 'lucide-react';

export const PlaceholderPage: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  return (
    <div className="flex-center animate-slide-in" style={{ height: '100%', minHeight: '60vh', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel flex-center" style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', border: '1px dashed var(--border-color)' }}>
        <Construction size={48} color="var(--accent-primary)" />
      </div>
      <div style={{ textAlign: 'center' }}>
         <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '12px', color: 'white' }}>{title}</h2>
         <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '500px', lineHeight: 1.6 }}>{desc}</p>
      </div>
    </div>
  );
};
