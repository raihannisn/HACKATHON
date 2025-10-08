import React from 'react';
import './InfoPanel.css';

function InfoPanel({ data, onClose }) {
  if (!data) return null;

  const { asteroid, impact, crater, damage_zones, casualties_estimate } = data;

  // Helper function to safely parse and format numbers
  const formatNumber = (value, decimals = 2) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? '0.00' : num.toFixed(decimals);
  };

  return (
    <div className="info-panel">
      <div className="panel-header">
        <h3>🎯 Simulation Results</h3>
        {onClose && (
          <button className="close-btn" onClick={onClose}>✕</button>
        )}
      </div>

      {/* Asteroid Info */}
      <div className="info-section">
        <h4>☄️ Asteroid Data</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Name:</span>
            <span className="value">{asteroid.name}</span>
          </div>
          <div className="info-item">
            <span className="label">Diameter:</span>
            <span className="value">{formatNumber(asteroid.diameter_km)} km</span>
          </div>
          <div className="info-item">
            <span className="label">Velocity:</span>
            <span className="value">{formatNumber(asteroid.velocity_kps)} km/s</span>
          </div>
          <div className="info-item">
            <span className="label">Mass:</span>
            <span className="value">{formatNumber(asteroid.mass_kg / 1e12)} trillion kg</span>
          </div>
          <div className="info-item">
            <span className="label">Status:</span>
            <span className={`value ${asteroid.is_hazardous ? 'hazardous' : 'safe'}`}>
              {asteroid.is_hazardous ? '⚠️ HAZARDOUS' : '✅ SAFE'}
            </span>
          </div>
        </div>
      </div>

      {/* Impact Energy */}
      <div className="info-section highlight">
        <h4>💥 Impact Energy</h4>
        <div className="energy-display">
          <div className="energy-value">{formatNumber(impact.energy_megatons, 0)}</div>
          <div className="energy-unit">MEGATONS TNT</div>
        </div>
        <p className="energy-comparison">
          ≈ {formatNumber(impact.energy_megatons / 0.015, 0)}× Hiroshima bomb
        </p>
      </div>

      {/* Crater */}
      <div className="info-section">
        <h4>🕳️ Crater Dimensions</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Diameter:</span>
            <span className="value">{formatNumber(crater.diameter_km)} km</span>
          </div>
          <div className="info-item">
            <span className="label">Depth:</span>
            <span className="value">{formatNumber(crater.depth_km)} km</span>
          </div>
        </div>
      </div>

      {/* Damage Zones */}
      <div className="info-section">
        <h4>📏 Damage Zones (Radius)</h4>
        <div className="damage-list">
          <div className="damage-item fireball">
            <span className="zone-icon">🔴</span>
            <span className="zone-name">Fireball:</span>
            <span className="zone-value">{formatNumber(damage_zones.fireball_radius_km)} km</span>
          </div>
          <div className="damage-item blast">
            <span className="zone-icon">🟠</span>
            <span className="zone-name">Blast Damage:</span>
            <span className="zone-value">{formatNumber(damage_zones.blast_damage_radius_km)} km</span>
          </div>
          <div className="damage-item thermal">
            <span className="zone-icon">🟡</span>
            <span className="zone-name">Thermal Radiation:</span>
            <span className="zone-value">{formatNumber(damage_zones.thermal_radiation_radius_km)} km</span>
          </div>
          <div className="damage-item seismic">
            <span className="zone-icon">🔵</span>
            <span className="zone-name">Seismic Effects:</span>
            <span className="zone-value">{formatNumber(damage_zones.seismic_effects_radius_km)} km</span>
          </div>
        </div>
      </div>

      {/* Casualties */}
      <div className="info-section casualties-section">
        <h4>👥 Casualties Estimate</h4>
        <div className="casualties-grid">
          <div className="casualties-item">
            <div className="casualties-label">Area Affected</div>
            <div className="casualties-value">
              {formatNumber(casualties_estimate.area_affected_km2, 0)} km²
            </div>
          </div>
          <div className="casualties-item">
            <div className="casualties-label">Population at Risk</div>
            <div className="casualties-value population">
              {parseInt(casualties_estimate.population_at_risk).toLocaleString()}
            </div>
          </div>
        </div>
        <div className={`severity-badge ${casualties_estimate.severity}`}>
          <span className="severity-icon">
            {casualties_estimate.severity === 'catastrophic' && '🚨'}
            {casualties_estimate.severity === 'severe' && '⚠️'}
            {casualties_estimate.severity === 'moderate' && '⚡'}
            {casualties_estimate.severity === 'minimal' && '✓'}
          </span>
          <span className="severity-text">
            {casualties_estimate.severity.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="info-section legend">
        <h4>📖 Zone Effects</h4>
        <div className="legend-list">
          <p><strong>🔴 Fireball:</strong> Complete vaporization, 10,000°C+</p>
          <p><strong>🟠 Blast:</strong> Buildings destroyed, hurricane winds</p>
          <p><strong>🟡 Thermal:</strong> 3rd degree burns, fires ignited</p>
          <p><strong>🔵 Seismic:</strong> Earthquake effects, building damage</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPanel;