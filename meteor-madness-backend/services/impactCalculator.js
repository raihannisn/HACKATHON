// services/impactCalculator.js

module.exports = {
  // Main calculation function
  calculate: (asteroid, impactLocation, impactAngle = 45) => {
    const diameter = asteroid.estimated_diameter.kilometers.estimated_diameter_max;
    const velocity = asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second || 20;
    const density = 3000; // kg/m³ (average asteroid density)
    
    // Calculate kinetic energy
    const energyData = module.exports.calculateEnergy(diameter, velocity, density);
    
    // Calculate crater
    const craterData = module.exports.calculateCrater(energyData.megatons, impactAngle);
    
    // Calculate damage zones
    const damageZones = module.exports.calculateDamageZones(craterData.diameter_km);
    
    // Estimate casualties
    const casualties = module.exports.estimateCasualties(
      damageZones.blast_damage_radius_km, 
      impactLocation
    );
    
    // Calculate mitigation time
    const mitigationTime = module.exports.calculateMitigationTime(diameter);
    
    return {
      asteroid: {
        name: asteroid.name,
        diameter_km: diameter,
        velocity_kps: velocity,
        mass_kg: energyData.mass_kg,
        is_hazardous: asteroid.is_potentially_hazardous_asteroid
      },
      impact: {
        location: impactLocation,
        angle_degrees: impactAngle,
        kinetic_energy_joules: energyData.kinetic_energy_joules,
        energy_megatons: energyData.megatons
      },
      crater: craterData,
      damage_zones: damageZones,
      casualties_estimate: casualties,
      mitigation_time_needed_days: mitigationTime
    };
  },

  // Calculate kinetic energy
  calculateEnergy: (diameter, velocity, density) => {
    const radius = diameter / 2;
    const volume = (4/3) * Math.PI * Math.pow(radius * 1000, 3); // m³
    const mass = volume * density; // kg
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2); // Joules
    const megatons = kineticEnergy / (4.184 * Math.pow(10, 15)); // Convert to megatons TNT
    
    return {
      mass_kg: mass,
      kinetic_energy_joules: kineticEnergy,
      megatons: megatons
    };
  },

  // Calculate crater dimensions
  calculateCrater: (megatons, angle) => {
    const diameter = 1.8 * Math.pow(megatons, 0.25) * Math.pow(Math.sin(angle * Math.PI / 180), 0.33);
    const depth = diameter / 5;
    
    return {
      diameter_km: diameter,
      depth_km: depth
    };
  },

  // Calculate damage zones
  calculateDamageZones: (craterDiameter) => {
    return {
      fireball_radius_km: craterDiameter * 0.5,
      blast_damage_radius_km: craterDiameter * 2,
      thermal_radiation_radius_km: craterDiameter * 3,
      seismic_effects_radius_km: craterDiameter * 5
    };
  },

  // Estimate casualties
  estimateCasualties: (radiusKm, location) => {
    const densityMap = {
      urban: 5000,
      suburban: 1000,
      rural: 50,
      ocean: 0
    };
    
    const areaKm2 = Math.PI * Math.pow(radiusKm, 2);
    const density = densityMap[location.type] || densityMap.rural;
    const affected = Math.round(areaKm2 * density);
    
    return {
      area_affected_km2: areaKm2,
      population_at_risk: affected,
      severity: affected > 1000000 ? 'catastrophic' : 
                affected > 100000 ? 'severe' : 
                affected > 10000 ? 'moderate' : 'minimal'
    };
  },

  // Calculate mitigation time needed
  calculateMitigationTime: (diameter) => {
    if (diameter < 0.1) return 30;      // 1 month
    if (diameter < 0.5) return 180;     // 6 months
    if (diameter < 1.0) return 365;     // 1 year
    return 1825; // 5 years
  }
};