import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useProgress, Html } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';
import { ErrorBoundary } from './ErrorBoundary';

// Loading component with progress
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center text-sm text-muted-foreground">
        Loading 3D... {Math.round(progress)}%
      </div>
    </Html>
  );
}

// Fallback component when WebGL is not supported
function WebGLFallback() {
  return (
    <div className="flex items-center justify-center h-full bg-muted/20 rounded-lg">
      <p className="text-muted-foreground text-sm">
        3D content not available in this browser
      </p>
    </div>
  );
}

// Check WebGL support
function checkWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (e) {
    return false;
  }
}

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
  const [webGLAvailable, setWebGLAvailable] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!checkWebGL()) {
      setWebGLAvailable(false);
    }
  }, []);

  if (!webGLAvailable) {
    return <WebGLFallback />;
  }

  if (error) {
    return (
      <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-lg">
        <p className="text-red-500 text-sm">
          Failed to load 3D content. Please try refreshing the page.
        </p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: 300, position: 'relative', zIndex: 2 }}>
      <ErrorBoundary 
        onError={(error) => {
          console.error('Error in EarthCanvas:', error);
          setError(error);
        }}
        fallback={
          <div className="h-full flex items-center justify-center bg-muted/20 rounded-lg">
            <p className="text-red-500 text-sm">
              Error loading 3D content. Please try again later.
            </p>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 4], fov: 50 }}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            powerPreference: 'high-performance',
            alpha: true,
          }}
          dpr={typeof window !== 'undefined' ? window.devicePixelRatio : 1}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 4, 4]} intensity={0.8} />
          <Suspense fallback={<Loader />}>
            <Earth />
            <Stars radius={8} depth={30} count={250} factor={0.2} fade speed={1.2} />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
              enablePan={false}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
