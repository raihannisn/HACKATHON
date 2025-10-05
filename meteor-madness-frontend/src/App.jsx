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

  // Load asteroids on mount
  useEffect(() => {
    loadAsteroids();
  }, []);

  const loadAsteroids = async () => {
    try {
      setLoading(true);
      const data = await asteroidAPI.getAsteroids(50, true);
      setAsteroids(data.data);
    } catch (error) {
      console.error('Failed to load asteroids:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSimulate = async () => {
    if (!selectedAsteroid) return;

    try {
      setLoading(true);
      const result = await asteroidAPI.simulateImpact(
        selectedAsteroid.id,
        impactLocation,
        45
      );
      setSimulationData(result.simulation);
    } catch (error) {
      console.error('Simulation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <Stars />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <Scene3D 
          impactLocation={impactLocation}
          simulationData={simulationData}
        />
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
      </Canvas>

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
          <InfoPanel data={simulationData} />
        )}
      </div>
    </div>
  );
}

export default App;