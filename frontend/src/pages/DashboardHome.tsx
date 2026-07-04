import React, { useState } from 'react';
import { OnboardingModal } from '../components/OnboardingModal';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardHome: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(() => {
    return !sessionStorage.getItem('onboarding_seen');
  });

  const handleCompleteOnboarding = () => {
    sessionStorage.setItem('onboarding_seen', 'true');
    setShowOnboarding(false);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      {showOnboarding && <OnboardingModal onComplete={handleCompleteOnboarding} />}
      
      <div className="glass-panel animate-slide-in" style={{ padding: '60px', textAlign: 'center', marginBottom: '32px' }}>
        <div className="flex-center" style={{ marginBottom: '24px' }}>
           <div className="flex-center" style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)' }}>
              <Sparkles size={32} color="var(--accent-primary)" />
           </div>
        </div>
        <h2 style={{ fontSize: '32px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 700 }}>Welcome to FounderCopilot.os</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', lineHeight: 1.6 }}>Your entire startup operations, centralized in one autonomous dashboard. Select a workspace to begin automating your business.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {[
          { title: 'Hirepanel.ai', desc: 'Automate your recruitment.', path: '/dashboard/hirepanel' },
          { title: 'Legal Advisor', desc: 'Scan contracts instantly.', path: '/dashboard/legal' },
          { title: 'GTM Cross-Poster', desc: 'Deploy marketing everywhere.', path: '/dashboard/gtm' }
        ].map(card => (
          <Link key={card.title} to={card.path} className="glass-panel" style={{ padding: '32px', textDecoration: 'none', transition: 'transform 0.2s', display: 'flex', flexDirection: 'column', gap: '16px' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
             <h3 style={{ fontSize: '20px', color: 'white', fontWeight: 600 }}>{card.title}</h3>
             <p style={{ color: 'var(--text-secondary)' }}>{card.desc}</p>
             <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', fontWeight: 500, fontSize: '14px' }}>
                Open Workspace <ArrowRight size={16} />
             </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
