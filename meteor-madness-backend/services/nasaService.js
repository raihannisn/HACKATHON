// services/nasaService.js
const axios = require('axios');

const NASA_API_KEY = process.env.NASA_API_KEY || '5sALuA49dTDDacMDQsVPbbmESU5w6mNa6PL85IuU';
const NASA_NEO_API = 'https://api.nasa.gov/neo/rest/v1';

// Create axios instance with clean config
const axiosInstance = axios.create({
  baseURL: NASA_NEO_API,
  timeout: 10000,
  headers: {
    'Accept': 'application/json'
  }
});

module.exports = {
  // Get all asteroids from feed
  getAsteroids: async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await axiosInstance.get('/feed', {
        params: {
          start_date: today,
          end_date: endDate,
          api_key: NASA_API_KEY
        }
      });
      
      // Flatten the data
      let asteroids = [];
      Object.values(response.data.near_earth_objects).forEach(dayAsteroids => {
        asteroids = asteroids.concat(dayAsteroids);
      });
      
      return asteroids;
    } catch (error) {
      console.error('NASA API Error:', error.message);
      throw new Error(`NASA API Error: ${error.message}`);
    }
  },

  // Get specific asteroid by ID
  getAsteroidById: async (id) => {
    try {
      const response = await axiosInstance.get(`/neo/${id}`, {
        params: { api_key: NASA_API_KEY }
      });
      
      return response.data;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Asteroid not found');
      }
      console.error('NASA API Error:', error.message);
      throw new Error(`NASA API Error: ${error.message}`);
    }
  },

  // Get weekly feed
  getFeed: async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const endDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const response = await axiosInstance.get('/feed', {
        params: {
          start_date: today,
          end_date: endDate,
          api_key: NASA_API_KEY
        }
      });
      
      return {
        period: {
          start: today,
          end: endDate
        },
        element_count: response.data.element_count,
        data: response.data.near_earth_objects
      };
    } catch (error) {
      console.error('NASA API Error:', error.message);
      throw new Error(`NASA API API Error: ${error.message}`);
    }
  }
};