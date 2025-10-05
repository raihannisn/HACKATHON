import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

function Asteroid({ position, size = 0.05, visible = true }) {
  const meshRef = useRef();

  // Load Moon texture for asteroid (from CDN)
  const asteroidTexture = useLoader(
    TextureLoader,
    'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/moon_1024.jpg'
  );

  // Rotate asteroid
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!visible) return null;

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial 
        map={asteroidTexture}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

export default Asteroid;