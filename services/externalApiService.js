// services/externalApiService.js
// Contoh implementasi alternatif menggunakan External API
// Ganti BASE_URL dengan API yang Anda gunakan

const axios = require('axios');

const BASE_URL = 'https://jsonplaceholder.typicode.com'; // Contoh API

module.exports = {
  // Get all users
  getAllUsers: async (page = 1, limit = 10) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        params: { _page: page, _limit: limit }
      });
      
      return {
        users: response.data,
        total: parseInt(response.headers['x-total-count'] || response.data.length),
        hasMore: response.data.length === parseInt(limit)
      };
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error.message}`);
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(`Failed to fetch user: ${error.message}`);
    }
  },

  // Create new user
  createUser: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) return null;
      throw new Error(`Failed to update user: ${error.message}`);
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      await axios.delete(`${BASE_URL}/users/${id}`);
      return true;
    } catch (error) {
      if (error.response?.status === 404) return false;
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  },

  // Search users
  searchUsers: async (query) => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        params: { q: query }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to search users: ${error.message}`);
    }
  },

  // Login
  login: async (email, password) => {
    try {
      // Contoh implementasi - sesuaikan dengan API Anda
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password
      });
      return response.data;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }
};