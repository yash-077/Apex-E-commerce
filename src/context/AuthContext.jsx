import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on mount
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/api/me');
        // axios interceptor already extracts the user data
        const userData = response.data;
        setUser(userData);
      } catch (error) {
        console.error('Session restoration failed:', error);
        // If session check fails (expired token), clear it
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Login handler
  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const responseData = response.data;
      
      // Handle both wrapped and direct response formats
      const token = responseData.token;
      const userData = responseData.user;
      
      localStorage.setItem('token', token);
      setUser(userData);
      return userData;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Login failed. Please try again.';
      throw new Error(errorMsg);
    }
  };

  // Signup handler
  const signup = async (name, email, password, mobileNo, address) => {
    try {
      const response = await api.post('/api/auth/signup', { name, email, password, mobileNo, address });
      const responseData = response.data;

      const token = responseData.token;
      const userData = responseData.user;

      localStorage.setItem('token', token);
      setUser(userData);
      return userData;
    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Signup failed. Please try again.';
      throw new Error(errorMsg);
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
