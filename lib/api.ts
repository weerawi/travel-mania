// lib/api.ts
import axios from 'axios';

// Create a base axios instance with default configuration
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
  // Optional: Configure global timeout
  timeout: 10000,
});

// Example API methods
export const apiService = {
  // GET request example
  async getData(endpoint: string, params = {}) {
    try {
      const response = await api.get(endpoint, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },

  // POST request example
  async postData(endpoint: string, data = {}) {
    try {
      const response = await api.post(endpoint, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  },
};