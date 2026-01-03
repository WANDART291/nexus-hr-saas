import axios from 'axios';

// ----------------------------------------------------------------------
// ⚡ SMART URL SWITCH
// 1. If we find VITE_API_URL (from Vercel), use it.
// 2. Otherwise, default to localhost (for your laptop).
// ----------------------------------------------------------------------
const BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const api = axios.create({
  // We ensure '/api/' is attached correctly
  baseURL: `${BASE_URL}/api/`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;