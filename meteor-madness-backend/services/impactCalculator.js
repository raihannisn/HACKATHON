module.exports = {
  // Fungsi utama
  calculate: (asteroid, impactLocation, impactAngle = 45) => {
    const diameter = parseFloat(asteroid.estimated_diameter.kilometers.estimated_diameter_max);
    const velocity = parseFloat(
      asteroid.close_approach_data[0]?.relative_velocity.kilometers_per_second || 20
    );
    const density = 3000;

    const energyData = module.exports.calculateEnergy(diameter, velocity, density);
    const craterData = module.exports.calculateCrater(energyData.megatons, impactAngle);
    const damageZones = module.exports.calculateDamageZones(craterData.diameter_km);
    const casualties = module.exports.estimateCasualties(
      damageZones.blast_damage_radius_km,
      impactLocation
    );
    const mitigationTime = module.exports.calculateMitigationTime(diameter);

    return {
      asteroid: {
        name: asteroid.name,
        diameter_km: diameter,
        velocity_kps: velocity,
        mass_kg: energyData.mass_kg,
        is_hazardous: asteroid.is_potentially_hazardous_asteroid,
      },
      impact: {
        location: impactLocation,
        angle_degrees: impactAngle,
        kinetic_energy_joules: energyData.kinetic_energy_joules,
        energy_megatons: energyData.megatons,
      },
      crater: {
        diameter_km: craterData.diameter_km,
        depth_km: craterData.depth_km,
      },
      damage_zones: {
        fireball_radius_km: damageZones.fireball_radius_km,
        blast_damage_radius_km: damageZones.blast_damage_radius_km,
        thermal_radiation_radius_km: damageZones.thermal_radiation_radius_km,
        seismic_effects_radius_km: damageZones.seismic_effects_radius_km,
      },
      casualties_estimate: {
        area_affected_km2: casualties.area_affected_km2,
        population_at_risk: casualties.population_at_risk,
        severity: casualties.severity,
      },
      mitigation_time_needed_days: mitigationTime,
    };
  },

  // 🔹 Hitung energi kinetik
  calculateEnergy: (diameter, velocity, density) => {
    const radius = diameter / 2;
    const volume = (4 / 3) * Math.PI * Math.pow(radius * 1000, 3); // m³
    const mass = volume * density; // kg
    const kineticEnergy = 0.5 * mass * Math.pow(velocity * 1000, 2); // Joules
    const megatons = kineticEnergy / (4.184 * Math.pow(10, 15)); // ke megaton TNT

    return {
      mass_kg: mass,
      kinetic_energy_joules: kineticEnergy,
      megatons: megatons,
    };
  },

  // 🔹 Hitung kawah
  calculateCrater: (megatons, angle) => {
    const diameter =
      1.8 * Math.pow(megatons, 0.25) * Math.pow(Math.sin((angle * Math.PI) / 180), 0.33);
    const depth = diameter / 5;

    return {
      diameter_km: diameter,
      depth_km: depth,
    };
  },

  // 🔹 Zona kerusakan
  calculateDamageZones: (craterDiameter) => {
    return {
      fireball_radius_km: craterDiameter * 0.5,
      blast_damage_radius_km: craterDiameter * 2,
      thermal_radiation_radius_km: craterDiameter * 3,
      seismic_effects_radius_km: craterDiameter * 5,
    };
  },

  // 🔹 Perkiraan korban
  estimateCasualties: (radiusKm, location) => {
    const densityMap = {
      urban: 5000,
      suburban: 1000,
      rural: 50,
      ocean: 0,
    };

    const areaKm2 = Math.PI * Math.pow(radiusKm, 2);
    const density = densityMap[location.type] || densityMap.rural;
    const affected = Math.round(areaKm2 * density);

    return {
      area_affected_km2: areaKm2,
      population_at_risk: affected,
      severity:
        affected > 1000000
          ? "catastrophic"
          : affected > 100000
          ? "severe"
          : affected > 10000
          ? "moderate"
          : "minimal",
    };
  },

  // 🔹 Estimasi waktu mitigasi
  calculateMitigationTime: (diameter) => {
    if (diameter < 0.1) return 30; // 1 bulan
    if (diameter < 0.5) return 180; // 6 bulan
    if (diameter < 1.0) return 365; // 1 tahun
    return 1825; // 5 tahun
  },
};
