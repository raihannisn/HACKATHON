// services/mitigationService.js

module.exports = {
  // Get mitigation strategies based on asteroid size
  getStrategies: (asteroid) => {
    const diameter = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
    const strategies = [];
    
    if (diameter < 0.1) {
      // Small asteroids
      strategies.push({
        method: 'Kinetic Impactor',
        success_rate: 0.85,
        cost_billion_usd: 0.5,
        time_needed_days: 90,
        description: 'Direct collision to deflect small asteroid',
        technology_readiness: 'High - NASA DART mission proven'
      });
      strategies.push({
        method: 'Nuclear Standoff',
        success_rate: 0.95,
        cost_billion_usd: 2,
        time_needed_days: 180,
        description: 'Nuclear device detonation near asteroid',
        technology_readiness: 'Medium - Requires international cooperation'
      });
    } else if (diameter < 1.0) {
      // Medium asteroids
      strategies.push({
        method: 'Gravity Tractor',
        success_rate: 0.70,
        cost_billion_usd: 5,
        time_needed_days: 365,
        description: 'Spacecraft using gravity to slowly alter trajectory',
        technology_readiness: 'Medium - Long mission duration required'
      });
      strategies.push({
        method: 'Nuclear Standoff',
        success_rate: 0.90,
        cost_billion_usd: 10,
        time_needed_days: 270,
        description: 'Multiple nuclear devices for larger deflection',
        technology_readiness: 'Medium - Multiple launches needed'
      });
      strategies.push({
        method: 'Ion Beam Deflection',
        success_rate: 0.65,
        cost_billion_usd: 8,
        time_needed_days: 730,
        description: 'Ion beam to ablate surface and change trajectory',
        technology_readiness: 'Low - Theoretical concept'
      });
    } else {
      // Large asteroids
      strategies.push({
        method: 'Nuclear Fragmentation',
        success_rate: 0.60,
        cost_billion_usd: 50,
        time_needed_days: 1825,
        description: 'Fragment asteroid into smaller pieces (high risk)',
        technology_readiness: 'Low - Unpredictable outcomes'
      });
      strategies.push({
        method: 'Multi-Phase Mission',
        success_rate: 0.75,
        cost_billion_usd: 100,
        time_needed_days: 3650,
        description: 'Long-term deflection campaign with multiple spacecraft',
        technology_readiness: 'Medium - Requires years of preparation'
      });
      strategies.push({
        method: 'Mass Driver',
        success_rate: 0.55,
        cost_billion_usd: 75,
        time_needed_days: 2920,
        description: 'Launch material from asteroid surface for thrust',
        technology_readiness: 'Low - Complex mining operations'
      });
    }
    
    // Sort by success rate
    return strategies.sort((a, b) => b.success_rate - a.success_rate);
  },

  // Calculate warning time needed
  calculateWarningTime: (asteroid) => {
    const diameter = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
    
    if (diameter < 0.1) return 180;     // 6 months
    if (diameter < 0.5) return 365;     // 1 year
    if (diameter < 1.0) return 730;     // 2 years
    return 3650; // 10 years
  },

  // Evaluate strategy effectiveness
  evaluateStrategy: (strategy, timeAvailable, budgetAvailable) => {
    const timeScore = timeAvailable >= strategy.time_needed_days ? 1 : 
                     timeAvailable / strategy.time_needed_days;
    const budgetScore = budgetAvailable >= strategy.cost_billion_usd ? 1 : 
                       budgetAvailable / strategy.cost_billion_usd;
    
    const overallScore = (
      strategy.success_rate * 0.5 + 
      timeScore * 0.3 + 
      budgetScore * 0.2
    );
    
    return {
      ...strategy,
      feasibility: {
        time_score: timeScore,
        budget_score: budgetScore,
        overall_score: overallScore,
        recommendation: overallScore > 0.7 ? 'Highly Recommended' :
                       overallScore > 0.5 ? 'Viable Option' :
                       overallScore > 0.3 ? 'Challenging' : 'Not Feasible'
      }
    };
  }
};