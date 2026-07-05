import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // HACKATHON BYPASS: Instantly authenticate so the user can test the app without setting up OAuth providers
    if (!user) {
      setUser({ email: 'founder@foundercopilot.os' });
    }
    setLoading(false);
  }, [setUser, user]);

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Loading OS...</div>;
  if (!user) return <Navigate to="/" replace />;

  return <>{children}</>;
};
