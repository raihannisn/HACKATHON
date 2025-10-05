import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Earth({ impactLocation }) {
  const meshRef = useRef();
  
  // Load Earth texture from CDN
  const earthTexture = useLoader(
    TextureLoader, 
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg'
  );

  // Rotate Earth slowly
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  // Convert lat/lon to 3D coordinates
  const getPositionFromLatLon = (lat, lon, radius = 1.01) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);

    return [x, y, z];
  };

  const markerPosition = impactLocation
    ? getPositionFromLatLon(impactLocation.lat, impactLocation.lon)
    : null;

  return (
    <group>
      {/* Earth Sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial 
          map={earthTexture}
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Impact Location Marker */}
      {markerPosition && (
        <mesh position={markerPosition}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshBasicMaterial color="red" />
        </mesh>
      )}
    </group>
  );
}

export default Earth;