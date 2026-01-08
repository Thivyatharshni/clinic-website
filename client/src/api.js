import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000, // 15 second timeout for Render cold starts
  retry: 2,
  retryDelay: 1000,
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);

    // Handle Render cold starts (502, 503, 504 errors)
    if (error.response?.status >= 500) {
      console.warn('Server error detected, might be cold start');
    }

    // Handle network timeouts
    if (error.code === 'ECONNABORTED') {
      console.warn('Request timed out, possibly due to cold start');
    }

    return Promise.reject(error);
  }
);

// Health check function
export const checkServerHealth = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/health`, {
      timeout: 5000
    });
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Warm up function for Render
export const warmUpServer = async () => {
  try {
    console.log('Warming up server...');
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/warm`, {
      timeout: 10000
    });
    console.log('Server warmed up:', response.data);
    return response.data;
  } catch (error) {
    console.warn('Warm up failed (this is normal for cold starts):', error.message);
    // Don't throw error for warm-up failures as they might be expected
    return { status: 'warming', message: 'Server is starting up' };
  }
};

// Environment detection
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' ||
         window.location.hostname !== 'localhost';
};

export default api;
