import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loginAdmin = async (email, password) => {
    try {
      const response = await api.post('/user/loginAdmin', { email, password });
      
      if (response.data.success) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        return { success: true, message: response.data.message };
      } else {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      setIsAuthenticated(false);
      return { success: false, message: error.response?.data?.message || 'Login failed. Please check your credentials.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        await api.get('/user/verifyAdmin', { headers: { token } });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [navigate]);

  const value = { isAuthenticated, loading, loginAdmin, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};