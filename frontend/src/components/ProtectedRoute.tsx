import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../store';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, setUser } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if Supabase passed an error back from Google in the URL hash
    if (window.location.hash.includes('error_description')) {
      const params = new URLSearchParams(window.location.hash.substring(1));
      alert('OAuth Error: ' + params.get('error_description'));
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
      }
      // Prevent race condition where React Router redirects before Supabase parses the URL hash
      if (window.location.hash.includes('access_token') && !session) {
        // Don't set loading to false yet, let onAuthStateChange handle it
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [setUser]);

  if (loading) return <div className="flex-center" style={{ minHeight: '100vh' }}>Loading OS...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <>{children}</>;
};
