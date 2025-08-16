import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshStandardMaterial
        color="#3a7bd5"
        roughness={0.7}
        metalness={0.3}
      />
      {/* Clouds Layer */}
      <mesh>
        <sphereGeometry args={[1.53, 32, 32]} />
        <meshStandardMaterial
          color="#fff"
          transparent
          opacity={0.08}
        />
      </mesh>
    </mesh>
  );
}

export default function EarthCanvas() {
  return (
    <div style={{ width: '100%', height: 300, position: 'relative', zIndex: 2 }}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 4, 4]} intensity={0.8} />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <Stars radius={8} depth={30} count={250} factor={0.2} fade speed={1.2} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
