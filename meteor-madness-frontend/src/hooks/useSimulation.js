import React from 'react';
import './InfoPanel.css';

function InfoPanel({ data, onClose }) {
  if (!data) return null;

  const { asteroid, impact, crater, damage_zones, casualties_estimate } = data;

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
            <span className="value">{asteroid.diameter_km.toFixed(2)} km</span>
          </div>
          <div className="info-item">
            <span className="label">Velocity:</span>
            <span className="value">{asteroid.velocity_kps.toFixed(2)} km/s</span>
          </div>
          <div className="info-item">
            <span className="label">Mass:</span>
            <span className="value">{(asteroid.mass_kg / 1e12).toFixed(2)} trillion kg</span>
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
          <div className="energy-value">{impact.energy_megatons.toFixed(0)}</div>
          <div className="energy-unit">MEGATONS TNT</div>
        </div>
        <p className="energy-comparison">
          ≈ {(impact.energy_megatons / 0.015).toFixed(0)}× Hiroshima bomb
        </p>
      </div>

      {/* Crater */}
      <div className="info-section">
        <h4>🕳️ Crater Dimensions</h4>
        <div className="info-grid">
          <div className="info-item">
            <span className="label">Diameter:</span>
            <span className="value">{crater.diameter_km.toFixed(2)} km</span>
          </div>
          <div className="info-item">
            <span className="label">Depth:</span>
            <span className="value">{crater.depth_km.toFixed(2)} km</span>
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
            <span className="zone-value">{damage_zones.fireball_radius_km.toFixed(2)} km</span>
          </div>
          <div className="damage-item blast">
            <span className="zone-icon">🟠</span>
            <span className="zone-name">Blast Damage:</span>
            <span className="zone-value">{damage_zones.blast_damage_radius_km.toFixed(2)} km</span>
          </div>
          <div className="damage-item thermal">
            <span className="zone-icon">🟡</span>
            <span className="zone-name">Thermal Radiation:</span>
            <span className="zone-value">{damage_zones.thermal_radiation_radius_km.toFixed(2)} km</span>
          </div>
          <div className="damage-item seismic">
            <span className="zone-icon">🔵</span>
            <span className="zone-name">Seismic Effects:</span>
            <span className="zone-value">{damage_zones.seismic_effects_radius_km.toFixed(2)} km</span>
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
              {casualties_estimate.area_affected_km2.toLocaleString()} km²
            </div>
          </div>
          <div className="casualties-item">
            <div className="casualties-label">Population at Risk</div>
                        <div className="casualties-value population">
                          {casualties_estimate.population_at_risk.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            export default InfoPanel;