// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicRoutes = ['/user/loginAdmin'];

api.interceptors.request.use(
  (config) => {
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
    if (!isPublicRoute) {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.token = token;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for a token expiry error. Do not handle invalid login here.
    if (error.response && error.response.status === 401 && !publicRoutes.some(route => error.response.config.url.includes(route))) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAdminAuthenticated'); 
      window.location = '/'; // Redirect only for protected route failures
    }
    return Promise.reject(error);
  }
);

export default api;