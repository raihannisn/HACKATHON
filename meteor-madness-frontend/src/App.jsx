import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Scene3D from './components/Scene3D';
import Controls from './components/Controls';
import InfoPanel from './components/InfoPanel';
import { asteroidAPI } from './services/api';
import './App.css';

function App() {
  const [asteroids, setAsteroids] = useState([]);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [impactLocation, setImpactLocation] = useState({
    lat: -6.2088,
    lon: 106.8456,
    type: 'urban'
  });
  const [simulationData, setSimulationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load asteroids on mount
  useEffect(() => {
    loadAsteroids();
  }, []);

  const loadAsteroids = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await asteroidAPI.getAsteroids(50, true);
      setAsteroids(data.data);
      console.log('✅ Loaded asteroids:', data.data.length);
    } catch (error) {
      console.error('❌ Failed to load asteroids:', error);
      setError('Failed to load asteroids. Make sure backend is running on http://localhost:3000');
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async () => {
    if (!selectedAsteroid) {
      alert('Please select an asteroid first!');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('🚀 Simulating impact for:', selectedAsteroid.name);
      
      const result = await asteroidAPI.simulateImpact(
        selectedAsteroid.id,
        impactLocation,
        45
      );
      
      console.log('✅ Simulation complete:', result.simulation);
      setSimulationData(result.simulation);
    } catch (error) {
      console.error('❌ Simulation failed:', error);
      setError('Simulation failed. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {/* 3D Canvas */}
      <Canvas 
        camera={{ position: [0, 0, 3], fov: 60 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        <Stars 
          radius={300}
          depth={60}
          count={20000}
          factor={7}
          saturation={0}
          fade
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight position={[-5, 5, 5]} intensity={0.5} />
        
        <Scene3D 
          impactLocation={impactLocation}
          simulationData={simulationData}
          showAsteroid={!!selectedAsteroid}
        />
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={1.5}
          maxDistance={8}
          enablePan={false}
        />
      </Canvas>

      {/* Loading Overlay */}
      {loading && !asteroids.length && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Loading asteroids from NASA...</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="error-banner">
          <span>⚠️ {error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* UI Overlay */}
      <div className="ui-overlay">
        <Controls
          asteroids={asteroids}
          selectedAsteroid={selectedAsteroid}
          onSelectAsteroid={setSelectedAsteroid}
          impactLocation={impactLocation}
          onLocationChange={setImpactLocation}
          onSimulate={handleSimulate}
          loading={loading}
        />

        {simulationData && (
          <InfoPanel 
            data={simulationData}
            onClose={() => setSimulationData(null)}
          />
        )}
      </div>

      {/* Title Overlay */}
      <div className="title-overlay">
        <h1>🌠 METEOR MADNESS</h1>
        <p>NASA Space Apps Challenge 2024</p>
      </div>

      {/* Instructions */}
      {!simulationData && (
        <div className="instructions">
          <p>🎮 <strong>Controls:</strong> Drag to rotate | Scroll to zoom</p>
          <p>💡 Select an asteroid and location, then click SIMULATE IMPACT</p>
        </div>
      )}
    </div>
  );
}

export default App;