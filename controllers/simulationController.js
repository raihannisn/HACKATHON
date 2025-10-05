// controllers/simulationController.js
const nasaService = require('../services/nasaService');
const impactCalculator = require('../services/impactCalculator');

module.exports = {
  // Simulate single impact scenario
  simulateImpact: async (req, res) => {
    try {
      const { 
        asteroid_id, 
        impact_location = { lat: 0, lon: 0, type: 'ocean' },
        impact_angle = 45 
      } = req.body;
      
      // Validate input
      if (!asteroid_id) {
        return res.status(400).json({
          success: false,
          error: 'asteroid_id is required'
        });
      }
      
      // Fetch asteroid data
      const asteroid = await nasaService.getAsteroidById(asteroid_id);
      
      // Calculate impact
      const impactData = impactCalculator.calculate(asteroid, impact_location, impact_angle);
      
      res.json({
        success: true,
        simulation: impactData,
        timestamp: new Date()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Simulation failed',
        message: error.message
      });
    }
  },

  // Simulate multiple scenarios at once
  batchSimulate: async (req, res) => {
    try {
      const { asteroid_id, locations } = req.body;
      
      if (!asteroid_id || !locations || !Array.isArray(locations)) {
        return res.status(400).json({
          success: false,
          error: 'asteroid_id and locations array are required'
        });
      }
      
      // Fetch asteroid once
      const asteroid = await nasaService.getAsteroidById(asteroid_id);
      
      // Run simulations for all locations
      const simulations = locations.map(location => {
        const angle = location.impact_angle || 45;
        return {
          location,
          result: impactCalculator.calculate(asteroid, location, angle)
        };
      });
      
      res.json({
        success: true,
        asteroid_id,
        simulations,
        timestamp: new Date()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Batch simulation failed',
        message: error.message
      });
    }
  }
};