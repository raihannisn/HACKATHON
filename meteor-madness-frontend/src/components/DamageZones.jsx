import React from 'react';
import * as THREE from 'three';

function DamageZones({ simulationData, impactLocation }) {
  if (!simulationData || !impactLocation) return null;

  const { damage_zones } = simulationData;

  // Convert km to 3D scale (1 unit = Earth radius)
  const EARTH_RADIUS_KM = 6371;
  const scale = (km) => km / EARTH_RADIUS_KM;

  // Convert lat/lon to 3D position
  const getPosition = (lat, lon, altitude = 1.005) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(altitude * Math.sin(phi) * Math.cos(theta));
    const y = altitude * Math.cos(phi);
    const z = altitude * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  const position = getPosition(impactLocation.lat, impactLocation.lon);

  // Calculate rotation to align with surface
  const getLookAtRotation = () => {
    const phi = (90 - impactLocation.lat) * (Math.PI / 180);
    const theta = (impactLocation.lon + 180) * (Math.PI / 180);
    return [-phi, theta, 0];
  };

  const rotation = getLookAtRotation();

  return (
    <group position={position} rotation={rotation}>
      {/* Fireball Zone */}
      <mesh>
        <ringGeometry args={[0, scale(damage_zones.fireball_radius_km), 32]} />
        <meshBasicMaterial 
          color="#ff0000" 
          transparent 
          opacity={0.8} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Blast Damage Zone */}
      <mesh>
        <ringGeometry args={[
          scale(damage_zones.fireball_radius_km),
          scale(damage_zones.blast_damage_radius_km),
          32
        ]} />
        <meshBasicMaterial 
          color="#ff8800" 
          transparent 
          opacity={0.6} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Thermal Radiation Zone */}
      <mesh>
        <ringGeometry args={[
          scale(damage_zones.blast_damage_radius_km),
          scale(damage_zones.thermal_radiation_radius_km),
          32
        ]} />
        <meshBasicMaterial 
          color="#ffff00" 
          transparent 
          opacity={0.4} 
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Seismic Effects Zone */}
      <mesh>
        <ringGeometry args={[
          scale(damage_zones.thermal_radiation_radius_km),
          scale(damage_zones.seismic_effects_radius_km),
          32
        ]} />
        <meshBasicMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default DamageZones;