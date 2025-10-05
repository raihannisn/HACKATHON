import { useMemo } from 'react';
import * as THREE from 'three';

function ImpactEffect({ impactLocation, show = false }) {
  // Hitung posisi dengan aman
  const position = useMemo(() => {
    if (!impactLocation) return [0, 0, 0];

    const phi = (90 - impactLocation.lat) * (Math.PI / 180);
    const theta = (impactLocation.lon + 180) * (Math.PI / 180);

    const x = -(1.02 * Math.sin(phi) * Math.cos(theta));
    const y = 1.02 * Math.cos(phi);
    const z = 1.02 * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  }, [impactLocation]);

  // Buat partikel hanya sekali (tidak tergantung kondisi `show`)
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

  // Setelah semua hook, baru kondisi render
  if (!show || !impactLocation) return null;

  return (
    <group position={position}>
      {/* Flash ledakan */}
      <mesh>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} />
      </mesh>

      {/* Partikel */}
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
