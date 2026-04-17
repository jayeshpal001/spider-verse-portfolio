"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import WebNetwork from "./WebNetwork";
import SpiderMan from "./SpiderMan"; // Import confirmed

// Error boundary for a fallback in case the model is large and taking time to load
const FallbackSphere = () => (
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color="#ff0000" wireframe />
  </mesh>
);

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={<FallbackSphere />}>
        {/* Futuristic Cyber-City Environment & Lights */}
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#4fa8f7" />
        <pointLight position={[-5, -5, -5]} intensity={2.5} color="#ff0000" />

        {/* The Background Web-Matrix */}
        <WebNetwork count={150} />

        {/* --- THE HERO HAS ARRIVED --- */}
        {/* Activate this component by uncommenting and adjusting the properties */}
    <SpiderMan 
           scale={1.5} // Agar size sahi lag raha hai toh isko chhedne ki zarurat nahi
           position={[0, -2, 0]} // Thoda aur niche kiya taaki JAYESH PAL text block na ho
        />
        
      </Suspense>
    </Canvas>
  );
}