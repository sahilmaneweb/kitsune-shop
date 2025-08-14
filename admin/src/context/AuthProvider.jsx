import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        await api.get('/auth/verifyAdmin', { headers: { token } });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        if (error.response && error.response.status !== 440) {
          navigate('/');
        }
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [navigate]);

  // Handle logout functionality
  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  const value = { isAuthenticated, loading, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};