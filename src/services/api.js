import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api`;

export const apiService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/authenticate-login`, { email, password });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  signup: async (username, email, password) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/authenticate-sign`, {
        username,
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
