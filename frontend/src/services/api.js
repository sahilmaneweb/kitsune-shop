// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const publicRoutes = [
  '/user/loginUser',
  '/user/registerUser',, // For email verification link, // For client-side token verification on app load
  '/product/allProduct', // To fetch all products (e.g., on home/collection page)
  '/product/getProduct/', // To fetch individual product details (dynamic route)
];

api.interceptors.request.use(
  (config) => {
    // Attach the user's token from localStorage to all non-public routes
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
    if (!isPublicRoute) {
      const token = localStorage.getItem('kitsuneUserToken');
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
    // Global error handling for authentication failures
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      const isPublicRoute = publicRoutes.some(route => error.response.config.url.includes(route));

      // Redirect only for protected route failures
      if (!isPublicRoute) {
        localStorage.removeItem('kitsuneUserToken');
        window.location.href = '/login'; // <-- The redirect path is now /login
      }
    }
    return Promise.reject(error);
  }
);

export default api;