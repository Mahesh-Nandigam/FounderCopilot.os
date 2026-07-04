import React, { useState } from 'react';
import { OnboardingModal } from '../components/OnboardingModal';
import { useNavigate } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !sessionStorage.getItem('onboarding_seen');
  });
  const navigate = useNavigate();

  const handleCompleteOnboarding = () => {
    sessionStorage.setItem('onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
      {showOnboarding && <OnboardingModal onComplete={handleCompleteOnboarding} />}
      
      {/* Colorful background glow so it's not entirely black */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, rgba(236, 72, 153, 0.08) 40%, rgba(245, 158, 11, 0.05) 70%, transparent 100%)', filter: 'blur(80px)', zIndex: -1, pointerEvents: 'none' }} />

      <div className="glass-panel animate-slide-in" style={{ padding: '80px 40px', textAlign: 'center', marginBottom: '32px', position: 'relative', zIndex: 1, border: '1px solid rgba(255,255,255,0.05)', background: 'rgba(20, 20, 22, 0.7)', backdropFilter: 'blur(20px)' }}>
        
        {/* Colorful graphic mimicking the chart from the video */}
        <div className="flex-center" style={{ marginBottom: '40px', gap: '8px', alignItems: 'flex-end', height: '60px' }}>
            <div style={{ width: '24px', height: '40px', background: '#facc15', borderRadius: '4px 4px 0 0' }}></div>
            <div style={{ width: '24px', height: '60px', background: '#f87171', borderRadius: '4px 4px 0 0' }}></div>
            <div style={{ width: '24px', height: '48px', background: '#4ade80', borderRadius: '4px 4px 0 0' }}></div>
        </div>
        
        {/* Serif font heading exactly like Ali's style */}
        <h2 style={{ fontSize: '52px', color: 'var(--text-primary)', marginBottom: '24px', fontFamily: '"Playfair Display", Georgia, serif', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Welcome to <br/>
          <span style={{ background: 'linear-gradient(to right, #06b6d4, #ec4899, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '10px' }}>FounderCopilot.os</span>
        </h2>
        
        <p style={{ color: 'var(--text-secondary)', fontSize: '20px', maxWidth: '600px', margin: '0 auto 48px auto', lineHeight: 1.6, fontWeight: 400 }}>
          Your entire startup operations, centralized in one autonomous dashboard. Get ready to automate your business.
        </p>

        {/* Workspace Action Buttons */}
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            onClick={() => navigate('/dashboard/hirepanel')}
            style={{ 
              background: '#3b82f6', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(59, 130, 246, 0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(59, 130, 246, 0.4)'; }}
          >
            Hirepanel.ai
          </button>

          <button 
            onClick={() => navigate('/dashboard/legal')}
            style={{ 
              background: '#ec4899', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(236, 72, 153, 0.4)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(236, 72, 153, 0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(236, 72, 153, 0.4)'; }}
          >
            Legal Advisor
          </button>

          <button 
            onClick={() => navigate('/dashboard/gtm')}
            style={{ 
              background: '#f59e0b', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '100px', fontSize: '16px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)', transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(245, 158, 11, 0.6)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(245, 158, 11, 0.4)'; }}
          >
            GTM Cross-Poster
          </button>
        </div>
      </div>
    </div>
  );
};
