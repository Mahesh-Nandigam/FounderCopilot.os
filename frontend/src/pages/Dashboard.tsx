import React, { useState } from 'react';
import { OnboardingModal } from '../components/OnboardingModal';
import { supabase } from '../lib/supabase';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(true); // For hackathon, default to true. In prod, check DB flag.
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
      {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', padding: '16px', borderRadius: '12px' }} className="glass-panel">
        <h1 style={{ fontSize: '24px', fontWeight: 700, background: 'linear-gradient(to right, #fff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          FounderCopilot.os
        </h1>
        <button onClick={handleLogout} className="glass-panel flex-center" style={{ padding: '8px 16px', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', gap: '8px', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.2)'}>
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="glass-panel animate-slide-in delay-200" style={{ padding: '60px', textAlign: 'center', borderStyle: 'dashed' }}>
        <h2 style={{ fontSize: '28px', color: 'var(--text-secondary)', marginBottom: '16px' }}>Dashboard Modules Loading...</h2>
        <p style={{ color: 'var(--text-secondary)' }}>The Workspaces will be implemented in Phase 2!</p>
      </div>
    </div>
  );
};

export default Dashboard;
