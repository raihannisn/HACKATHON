import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const asteroidAPI = {
  // Get list of asteroids
  getAsteroids: async (limit = 50, hazardousOnly = false) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/asteroids`, {
        params: { 
          limit, 
          hazardous_only: hazardousOnly 
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching asteroids:', error);
      throw error;
    }
  },

  // Get asteroid detail
  getAsteroidById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/asteroids/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching asteroid detail:', error);
      throw error;
    }
  },

  // Simulate impact
  simulateImpact: async (asteroidId, location, angle = 45) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/simulation/simulate`, {
        asteroid_id: asteroidId,
        impact_location: location,
        impact_angle: angle
      });
      return response.data;
    } catch (error) {
      console.error('Error simulating impact:', error);
      throw error;
    }
  },

  // Get mitigation strategies
  getMitigation: async (asteroidId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/mitigation/${asteroidId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching mitigation:', error);
      throw error;
    }
  }
};