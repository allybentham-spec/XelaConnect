import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../mock';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Simulate checking for existing session
    const checkAuth = () => {
      const storedUser = localStorage.getItem('xela_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    setTimeout(checkAuth, 500);
  }, []);

  const login = async (email, password) => {
    // Mock login - will be replaced with real API
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = { ...mockUser, email };
        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('xela_user', JSON.stringify(userData));
        setLoading(false);
        resolve(userData);
      }, 1000);
    });
  };

  const signup = async (userData) => {
    // Mock signup - will be replaced with real API
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { ...mockUser, ...userData };
        setUser(newUser);
        setIsAuthenticated(true);
        localStorage.setItem('xela_user', JSON.stringify(newUser));
        setLoading(false);
        resolve(newUser);
      }, 1000);
    });
  };

  const loginWithGoogle = async () => {
    // Mock Google login - will be replaced with Emergent Auth
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('xela_user', JSON.stringify(mockUser));
        setLoading(false);
        resolve(mockUser);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('xela_user');
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
