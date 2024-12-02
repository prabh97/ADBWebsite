import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../utils/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { id: string; email: string } | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated());
  const [user, setUser] = useState(auth.getUserInfo());

  useEffect(() => {
    const updateAuth = () => {
      setIsAuthenticated(auth.isAuthenticated());
      setUser(auth.getUserInfo());
    };

    // Listen for auth changes
    window.addEventListener('auth-change', updateAuth);
    
    // Check authentication status periodically
    const interval = setInterval(updateAuth, 60000);

    return () => {
      window.removeEventListener('auth-change', updateAuth);
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    auth.removeToken();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}