// src/services/api.js
import axios from 'axios';

// Create a new Axios instance
const api = axios.create({
  baseURL: process.env.SERVER_URL, // Your backend API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Define public routes that don't need a token
const publicRoutes = ['/user/loginAdmin'];

// Request interceptor to attach the token
api.interceptors.request.use(
  (config) => {
    // Check if the current route is public
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));

    if (!isPublicRoute) {
      const token = localStorage.getItem('authToken'); // Get your JWT token
      if (token) {
        config.headers.token = token; // Attach the token
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiry
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for a token expiry or invalid token error response
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear the invalid token
      localStorage.removeItem('authToken');
      localStorage.removeItem('isAdminAuthenticated'); 
      // Redirect to the login page
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;