const nasaService = require('../services/nasaService');
const mitigationService = require('../services/mitigationService');

module.exports = {
  // Get mitigation strategies for specific asteroid
  getMitigationStrategies: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Fetch asteroid data
      const asteroid = await nasaService.getAsteroidById(id);
      
      // Get strategies
      const strategies = mitigationService.getStrategies(asteroid);
      const warningTime = mitigationService.calculateWarningTime(asteroid);
      
      res.json({
        success: true,
        asteroid: {
          id: asteroid.id,
          name: asteroid.name,
          diameter_km: asteroid.estimated_diameter.kilometers.estimated_diameter_max,
          is_hazardous: asteroid.is_potentially_hazardous_asteroid
        },
        recommended_strategies: strategies,
        warning_time_needed_days: warningTime
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to get mitigation strategies',
        message: error.message
      });
    }
  },

  // Compare multiple strategies
  compareStrategies: async (req, res) => {
    try {
      const { asteroid_id, strategy_names } = req.body;
      
      if (!asteroid_id || !strategy_names || !Array.isArray(strategy_names)) {
        return res.status(400).json({
          success: false,
          error: 'asteroid_id and strategy_names array are required'
        });
      }
      
      // Fetch asteroid
      const asteroid = await nasaService.getAsteroidById(asteroid_id);
      
      // Get all strategies
      const allStrategies = mitigationService.getStrategies(asteroid);
      
      // Filter requested strategies
      const comparison = allStrategies.filter(s => 
        strategy_names.includes(s.method)
      );
      
      // Add comparison metrics
      const analysis = {
        most_effective: comparison.reduce((max, s) => 
          s.success_rate > max.success_rate ? s : max
        ),
        fastest: comparison.reduce((min, s) => 
          s.time_needed_days < min.time_needed_days ? s : min
        ),
        cheapest: comparison.reduce((min, s) => 
          s.cost_billion_usd < min.cost_billion_usd ? s : min
        )
      };
      
      res.json({
        success: true,
        asteroid_id,
        strategies: comparison,
        analysis
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Strategy comparison failed',
        message: error.message
      });
    }
  }
};