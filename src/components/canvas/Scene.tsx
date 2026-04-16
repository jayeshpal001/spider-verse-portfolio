"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";

export default function Scene() {
  return (
    // Canvas takes full width/height of its parent
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }} // alpha: true keeps background transparent
    >
      {/* Suspense fallback for heavy 3D models later */}
      <Suspense fallback={null}>
        {/* Realistic Lighting Environment */}
        <Environment preset="city" />
        
        {/* Ambient Light for base visibility */}
        <ambientLight intensity={0.5} />
        
        {/* Temporary Object: A placeholder for our future Spider-Man / Web Node */}
        <mesh rotation={[0.5, 0.5, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ff0000" wireframe />
        </mesh>

        {/* OrbitControls allows you to drag and rotate the 3D scene (useful for dev) */}
        <OrbitControls enableZoom={false} />
      </Suspense>
    </Canvas>
  );
}