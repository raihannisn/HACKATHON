import React from 'react';
import './Controls.css';

function Controls({ 
  asteroids, 
  selectedAsteroid, 
  onSelectAsteroid,
  impactLocation,
  onLocationChange,
  onSimulate,
  loading
}) {
  // Helper to safely format numbers
  const safeNumber = (value, decimals = 2) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return isNaN(num) ? 0 : parseFloat(num.toFixed(decimals));
  };

  return (
    <div className="controls-panel">
      <h2>🌠 Meteor Madness</h2>
      <p className="subtitle">Impactor-2025 Simulation</p>

      {/* Asteroid Selection */}
      <div className="control-group">
        <label>Select Asteroid:</label>
        <select 
          value={selectedAsteroid?.id || ''}
          onChange={(e) => {
            const asteroid = asteroids.find(a => a.id === e.target.value);
            onSelectAsteroid(asteroid);
          }}
          disabled={loading}
        >
          <option value="">-- Choose Asteroid --</option>
          {asteroids.map(asteroid => (
            <option key={asteroid.id} value={asteroid.id}>
              {asteroid.name} 
              {' '}({safeNumber(asteroid.estimated_diameter.kilometers.estimated_diameter_max)} km)
              {asteroid.is_potentially_hazardous_asteroid && ' ⚠️'}
            </option>
          ))}
        </select>
      </div>

      {/* Selected Asteroid Info */}
      {selectedAsteroid && (
        <div className="asteroid-info">
          <h4>📊 Asteroid Info</h4>
          <p><strong>Diameter:</strong> {safeNumber(selectedAsteroid.estimated_diameter.kilometers.estimated_diameter_max)} km</p>
          <p><strong>Hazardous:</strong> {selectedAsteroid.is_potentially_hazardous_asteroid ? '⚠️ YES' : '✅ NO'}</p>
        </div>
      )}

      {/* Location Input */}
      <div className="control-group">
        <label>Impact Location:</label>
        <div className="input-row">
          <input
            type="number"
            placeholder="Latitude"
            value={impactLocation.lat}
            onChange={(e) => onLocationChange({
              ...impactLocation,
              lat: parseFloat(e.target.value) || 0
            })}
            step="0.0001"
            disabled={loading}
          />
          <input
            type="number"
            placeholder="Longitude"
            value={impactLocation.lon}
            onChange={(e) => onLocationChange({
              ...impactLocation,
              lon: parseFloat(e.target.value) || 0
            })}
            step="0.0001"
            disabled={loading}
          />
        </div>
        <select
          value={impactLocation.type}
          onChange={(e) => onLocationChange({
            ...impactLocation,
            type: e.target.value
          })}
          disabled={loading}
        >
          <option value="urban">🏙️ Urban</option>
          <option value="suburban">🏘️ Suburban</option>
          <option value="rural">🌾 Rural</option>
          <option value="ocean">🌊 Ocean</option>
        </select>
      </div>

      {/* Simulate Button */}
      <button 
        onClick={onSimulate}
        disabled={!selectedAsteroid || loading}
        className="simulate-btn"
      >
        {loading ? '⏳ Simulating...' : '💥 SIMULATE IMPACT'}
      </button>

      {/* Quick Location Presets */}
      <div className="presets">
        <h4>Quick Locations:</h4>
        <div className="preset-buttons">
          <button 
            onClick={() => onLocationChange({lat: -6.2088, lon: 106.8456, type: 'urban'})}
            disabled={loading}
          >
            🇮🇩 Jakarta
          </button>
          <button 
            onClick={() => onLocationChange({lat: 40.7128, lon: -74.0060, type: 'urban'})}
            disabled={loading}
          >
            🇺🇸 New York
          </button>
          <button 
            onClick={() => onLocationChange({lat: 51.5074, lon: -0.1278, type: 'urban'})}
            disabled={loading}
          >
            🇬🇧 London
          </button>
          <button 
            onClick={() => onLocationChange({lat: 35.6762, lon: 139.6503, type: 'urban'})}
            disabled={loading}
          >
            🇯🇵 Tokyo
          </button>
          <button 
            onClick={() => onLocationChange({lat: 0, lon: -150, type: 'ocean'})}
            disabled={loading}
          >
            🌊 Pacific
          </button>
        </div>
      </div>
    </div>
  );
}

export default Controls;