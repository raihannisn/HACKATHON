import React from 'react';
import Earth from './Earth';
import Asteroid from './Asteroid';
import DamageZones from './DamageZones';
import ImpactEffect from './ImpactEffect';

function Scene3D({ impactLocation, simulationData, showAsteroid = true }) {
  return (
    <>
      {/* Earth */}
      <Earth impactLocation={impactLocation} />

      {/* Asteroid approaching */}
      {showAsteroid && (
        <Asteroid 
          position={[2, 1, 0]} 
          size={0.05}
          visible={true}
        />
      )}

      {/* Damage Zones */}
      {simulationData && (
        <DamageZones 
          simulationData={simulationData}
          impactLocation={impactLocation}
        />
      )}

      {/* Impact Effect */}
      {simulationData && (
        <ImpactEffect 
          impactLocation={impactLocation}
          show={true}
        />
      )}
    </>
  );
}

export default Scene3D;