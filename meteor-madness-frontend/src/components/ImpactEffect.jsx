import React, { useMemo } from 'react';
import * as THREE from 'three';

function ImpactEffect({ impactLocation, show = false }) {
  // Convert lat/lon to 3D position (selalu bisa dipanggil, tapi aman)
  const getPosition = (lat, lon, altitude = 1.02) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(altitude * Math.sin(phi) * Math.cos(theta));
    const y = altitude * Math.cos(phi);
    const z = altitude * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  // Gunakan useMemo di luar kondisi apa pun
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 0.2;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Jika tidak show atau tidak ada lokasi → tidak render apa pun
  if (!show || !impactLocation) return null;

  const position = getPosition(impactLocation.lat, impactLocation.lon);

  return (
    <group position={position}>
      {/* Explosion flash */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Particles */}
      <points geometry={particlesGeometry}>
        <pointsMaterial
          color="#ff4400"
          size={0.01}
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
}

export default ImpactEffect;
