import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, FileText, Share2, Settings, Menu, Sun, Moon, User } from 'lucide-react';
import { useAppStore } from '../store';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { HirepanelWorkspace } from '../pages/HirepanelWorkspace';
import { LegalAdvisorWorkspace } from '../pages/LegalAdvisorWorkspace';

const SIDEBAR_ITEMS = [
  { path: '/dashboard', label: 'Master Orchestrator', icon: LayoutDashboard, color: '#a1a1aa' },
  { path: '/dashboard/gtm', label: 'GTM Cross-Poster', icon: Share2, color: '#f59e0b' },
];

export const DashboardLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const { theme, setTheme, user } = useAppStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <div style={{ 
        width: isCollapsed ? '80px' : '260px', 
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-panel)',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 10
      }}>
        <div style={{ height: '70px', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'space-between', borderBottom: '1px solid var(--border-color)' }}>
          {!isCollapsed && (
            <h2 style={{ 
              fontSize: '22px', 
              fontWeight: 800, 
              background: 'linear-gradient(to right, var(--text-primary), var(--text-secondary))', 
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              color: 'transparent',
              letterSpacing: '-0.5px',
              margin: 0
            }}>OS</h2>
          )}
          <button onClick={() => setIsCollapsed(!isCollapsed)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
            <Menu size={20} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link key={item.path} to={item.path} style={{
                display: 'flex', alignItems: 'center', padding: '12px', borderRadius: '8px',
                background: isActive ? 'var(--hover-bg)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                textDecoration: 'none',
                gap: '16px',
                transition: 'all 0.2s ease',
                justifyContent: isCollapsed ? 'center' : 'flex-start'
              }}
              onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.background = 'var(--hover-bg)' }}
              onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.background = 'transparent' }}
              >
                <Icon size={20} color={item.color} />
                {!isCollapsed && <span style={{ fontWeight: 500, fontSize: '14px', whiteSpace: 'nowrap' }}>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top Navbar */}
        <header className="glass-panel" style={{ 
          height: '70px', 
          borderBottom: '1px solid var(--border-color)', 
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderRadius: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          zIndex: 5
        }}>
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
              {SIDEBAR_ITEMS.find(i => i.path === location.pathname)?.label || 'Master Orchestrator'}
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', transition: 'color 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color='var(--text-primary)'} onMouseLeave={(e) => e.currentTarget.style.color='var(--text-secondary)'}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <div style={{ height: '24px', width: '1px', background: 'var(--border-color)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', fontWeight: 500 }}>
              <div className="flex-center" style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--hover-bg)', color: 'var(--text-primary)' }}>
                <User size={16} />
              </div>
              <span>{user?.email}</span>
            </div>
            <button onClick={handleLogout} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#ef4444', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px', fontWeight: 600, transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.1)'}>
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '40px', position: 'relative' }}>
          <div style={{ display: location.pathname === '/dashboard/hirepanel' ? 'block' : 'none', height: '100%' }}>
            <HirepanelWorkspace />
          </div>
          <div style={{ display: location.pathname === '/dashboard/legal' ? 'block' : 'none', height: '100%' }}>
            <LegalAdvisorWorkspace />
          </div>
          <div style={{ display: (location.pathname !== '/dashboard/hirepanel' && location.pathname !== '/dashboard/legal') ? 'block' : 'none', height: '100%' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
