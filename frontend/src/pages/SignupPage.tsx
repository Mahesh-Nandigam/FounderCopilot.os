import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Mail } from 'lucide-react';
import { GoogleIcon, GithubIcon, LinkedinIcon } from '../components/Icons';
import { useAppStore } from '../store';

export const playSuccessSound = () => {
  const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sine';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
  osc.start();
  osc.stop(ctx.currentTime + 0.3);
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      playSuccessSound();
      navigate('/dashboard');
    }
    setLoading(false);
  };

  const { setUser } = useAppStore();

  const handleOAuth = async (provider: 'google' | 'github' | 'linkedin_oidc') => {
    // Temporary bypass for UI testing since Google keys are still propagating
    setUser({ email: 'founder@foundercopilot.os' });
    navigate('/dashboard');
  };

  return (
    <div className="flex-center" style={{ minHeight: '100vh', padding: '20px' }}>
      <div className="glass-panel animate-slide-in" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '8px', textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '32px' }}>Join FounderCopilot.os today.</p>
        
        {error && <div style={{ color: 'var(--danger)', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
        
        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)', color: 'white', outline: 'none' }}
          />
          <button type="submit" className="premium-button flex-center" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
            <Mail size={18} /> {loading ? 'Creating...' : 'Sign Up with Email'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '24px 0' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '12px', textTransform: 'uppercase' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }}></div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button type="button" onClick={() => handleOAuth('google')} className="glass-panel flex-center" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', color: 'white', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', gap: '12px', borderRadius: '8px', transition: 'background 0.2s', fontSize: '15px', fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
             <GoogleIcon /> Continue with Google
          </button>
          <button type="button" onClick={() => handleOAuth('github')} className="glass-panel flex-center" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', color: 'white', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', gap: '12px', borderRadius: '8px', transition: 'background 0.2s', fontSize: '15px', fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
             <GithubIcon /> Continue with GitHub
          </button>
          <button type="button" onClick={() => handleOAuth('linkedin_oidc')} className="glass-panel flex-center" style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', color: 'white', background: 'rgba(255,255,255,0.05)', cursor: 'pointer', gap: '12px', borderRadius: '8px', transition: 'background 0.2s', fontSize: '15px', fontWeight: 500 }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
             <LinkedinIcon /> Continue with LinkedIn
          </button>
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
