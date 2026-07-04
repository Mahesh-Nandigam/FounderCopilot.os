import React, { useState } from 'react';
import { X, ChevronRight, Check } from 'lucide-react';

const ONBOARDING_STEPS = [
  { title: 'Welcome to FounderCopilot.os', desc: 'Your entire startup operations, centralized in one autonomous dashboard.' },
  { title: 'Hirepanel.ai', desc: 'Scan resumes and find top talent instantly.' },
  { title: 'Legal Advisor', desc: 'Upload contracts and spot risks before signing.' },
  { title: 'GTM Cross-Poster', desc: 'Deploy marketing campaigns across all channels in one click.' }
];

export const OnboardingModal: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (step < ONBOARDING_STEPS.length - 1) setStep(step + 1);
    else onComplete();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, backdropFilter: 'blur(4px)' }} className="flex-center animate-fade-in">
      <div className="glass-panel animate-slide-in" style={{ width: '400px', padding: '32px', position: 'relative' }}>
        <button onClick={onComplete} style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
          <X size={20} />
        </button>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {ONBOARDING_STEPS.map((_, i) => (
            <div key={i} style={{ flex: 1, height: '4px', background: i <= step ? 'var(--accent-primary)' : 'rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'background 0.3s' }} />
          ))}
        </div>

        <h3 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '12px' }}>{ONBOARDING_STEPS[step].title}</h3>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.5 }}>{ONBOARDING_STEPS[step].desc}</p>

        <button onClick={nextStep} className="premium-button flex-center" style={{ width: '100%', padding: '12px', justifyContent: 'center' }}>
          {step === ONBOARDING_STEPS.length - 1 ? <><Check size={18} style={{ marginRight: '8px' }}/> Get Started</> : <>Next <ChevronRight size={18} style={{ marginLeft: '8px' }} /></>}
        </button>
      </div>
    </div>
  );
};
