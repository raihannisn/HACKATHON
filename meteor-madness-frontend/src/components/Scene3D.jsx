import React, { useState, useEffect } from 'react';
import Earth from './Earth';
import Asteroid from './Asteroid';
import DamageZones from './DamageZones';
import ImpactEffect from './ImpactEffect';

function Scene3D({ impactLocation, simulationData }) {
  const [showAsteroid, setShowAsteroid] = useState(false);
  const [showImpact, setShowImpact] = useState(false);

  // 🎯 Ketika backend kirim data baru → mulai simulasi
  useEffect(() => {
    if (simulationData && impactLocation) {
      setShowAsteroid(true);
      setShowImpact(false);
    }
  }, [simulationData, impactLocation]);

  // 🚀 Ketika asteroid menabrak bumi
  const handleImpact = () => {
    setShowAsteroid(false);
    setTimeout(() => setShowImpact(true), 400);
  };

  return (
    <>
      {/* 🌍 Bumi berputar pelan */}
      <Earth 
        impactLocation={impactLocation} 
        rotationSpeed={0.002} 
      />

      {/* ☄️ Asteroid muncul setelah backend kasih data */}
      {showAsteroid && (
        <Asteroid
          impactLocation={impactLocation}
          size={0.05}
          speed={0.02}     // kecepatan jatuh
          onImpact={handleImpact}
        />
      )}

      {/* 💥 Efek tumbukan setelah asteroid hilang */}
      {showImpact && (
        <ImpactEffect 
          impactLocation={impactLocation} 
          show={true} 
        />
      )}

      {/* 🔥 Zona kerusakan muncul setelah impact */}
      {showImpact && simulationData && (
        <DamageZones 
          simulationData={simulationData} 
          impactLocation={impactLocation} 
        />
      )}
    </>
  );
}

export default Scene3D;
