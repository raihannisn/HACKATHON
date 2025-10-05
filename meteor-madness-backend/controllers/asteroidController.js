// controllers/asteroidController.js
const nasaService = require('../services/nasaService');
const cacheService = require('../services/cacheService');

module.exports = {
  // Get all asteroids with filtering
  getAsteroids: async (req, res) => {
    try {
      const { limit = 20, hazardous_only = 'false' } = req.query;
      
      // Check cache first
      const cacheKey = `asteroids_${limit}_${hazardous_only}`;
      const cachedData = cacheService.get(cacheKey);
      
      if (cachedData) {
        return res.json({
          success: true,
          cached: true,
          count: cachedData.length,
          data: cachedData
        });
      }
      
      // Fetch from NASA API
      let asteroids = await nasaService.getAsteroids();
      
      // Filter if needed
      if (hazardous_only === 'true') {
        asteroids = asteroids.filter(a => a.is_potentially_hazardous_asteroid);
      }
      
      // Limit results
      const limitedAsteroids = asteroids.slice(0, parseInt(limit));
      
      // Cache the results
      cacheService.set(cacheKey, limitedAsteroids);
      
      res.json({
        success: true,
        cached: false,
        count: limitedAsteroids.length,
        total: asteroids.length,
        data: limitedAsteroids
      });
      
    } catch (error) {
      console.error('Error fetching asteroids:', error.message);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch asteroid data',
        message: error.message
      });
    }
  },

  // Get specific asteroid by ID
  getAsteroidById: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check cache
      const cacheKey = `asteroid_${id}`;
      const cachedData = cacheService.get(cacheKey);
      
      if (cachedData) {
        return res.json({
          success: true,
          cached: true,
          data: cachedData
        });
      }
      
      // Fetch from NASA API
      const asteroid = await nasaService.getAsteroidById(id);
      
      // Cache the result
      cacheService.set(cacheKey, asteroid);
      
      res.json({
        success: true,
        cached: false,
        data: asteroid
      });
      
    } catch (error) {
      res.status(404).json({
        success: false,
        error: 'Asteroid not found',
        message: error.message
      });
    }
  },

  // Get weekly NEO feed
  getFeed: async (req, res) => {
    try {
      const feedData = await nasaService.getFeed();
      
      res.json({
        success: true,
        period: feedData.period,
        element_count: feedData.element_count,
        data: feedData.data
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch NEO feed',
        message: error.message
      });
    }
  }
};