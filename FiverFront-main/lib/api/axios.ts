import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create axios instance with better error handling
const api = axios.create({
  // Update this URL to match your backend server address
  // If using Expo Go, make sure to use your computer's local IP address, not localhost
  baseURL: 'http://192.168.1.82:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Add timeout to prevent long waiting times
});

// Add JWT to requests
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error setting auth token:', error);
    return config;
  }
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Network errors
    if (!error.response) {
      console.error('Network Error:', error.message);
      // Don't show alert here, let the calling function handle it
    }
    // Server errors
    else {
      console.error('API Error:', error.response.status, error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
