'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'tenant' | 'landlord';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('nextkey_token');
    setToken(null);
    setUser(null);
    router.push('/login');
  }, [router]);

  const login = useCallback((newToken: string, newUser: User) => {
    localStorage.setItem('nextkey_token', newToken);
    setToken(newToken);
    setUser(newUser);
    
    // Redirect landlord to manage checklist listings, tenant to search properties
    if (newUser.role === 'landlord') {
      router.push('/properties/manage');
    } else {
      router.push('/properties');
    }
  }, [router]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = localStorage.getItem('nextkey_token');
        if (storedToken) {
          setToken(storedToken);
          // Fetch current user from server using the api client (which attaches the token)
          const response = await api.get('/auth/me');
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            logout();
          }
        }
      } catch (err) {
        console.error('Initialization of user session failed:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
