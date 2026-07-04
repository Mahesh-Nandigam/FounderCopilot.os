import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, ShieldCheck, TrendingUp, Users } from 'lucide-react';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navbar */}
      <nav style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>FounderCopilot.os</h1>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', fontWeight: 500 }}>Log in</button>
          <button onClick={() => navigate('/signup')} className="premium-button">Start Free Trial</button>
        </div>
      </nav>

      {/* Hero Section */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px', textAlign: 'center' }}>
        <div className="animate-fade-in opacity-0" style={{ maxWidth: '800px' }}>
          <h1 style={{ fontSize: '64px', fontWeight: 800, marginBottom: '24px', lineHeight: 1.1, background: 'linear-gradient(to right, #ffffff, #a1a1aa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            The Autonomous Operating System for Founders.
          </h1>
          <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}>
            Hire faster, negotiate safer, and scale smarter. Plug your startup into the ultimate AI-driven dashboard.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button onClick={() => navigate('/signup')} className="premium-button" style={{ padding: '16px 32px', fontSize: '18px' }}>
              <Rocket size={20} /> Deploy Your OS
            </button>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="animate-fade-in opacity-0 delay-200" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '80px', width: '100%', maxWidth: '1200px' }}>
          
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(59, 130, 246, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'; }}>
            <Users size={32} color="var(--accent-primary)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Hirepanel.ai</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Automated resume scoring and cultural fit analysis powered by Groq.</p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(16, 185, 129, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'; }}>
            <ShieldCheck size={32} color="var(--success)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>Legal Advisor</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Instant contract risk heatmaps and LLM-driven negotiation chatting.</p>
          </div>

          <div className="glass-panel" style={{ padding: '32px', textAlign: 'left', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 10px 40px rgba(245, 158, 11, 0.2)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)'; }}>
            <TrendingUp size={32} color="var(--warning)" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '12px' }}>GTM Cross-Poster</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5 }}>Generate, test, and schedule massive marketing campaigns simultaneously.</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LandingPage;
