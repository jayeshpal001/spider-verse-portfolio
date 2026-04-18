"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { Suspense } from "react";
import WebNetwork from "./WebNetwork";
import CameraRig from "./CameraRig";
import ProjectNodes from "./ProjectNodes";
import QuantumCore from "./QuantumCore"; // Hamara naya Brain import kiya

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 5, 40]} />

      <Suspense fallback={null}>
        {/* Cinematic scroll control */}
        <CameraRig />
        
        {/* Floating space dust for speed sensation */}
        <Stars radius={50} depth={50} count={3000} factor={3} fade speed={1.5} />
        
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#4fa8f7" />

        {/* The Deep Web Matrix in background */}
        <WebNetwork count={400} />
        
        {/* The Holographic Project Nodes inside the tunnel */}
        <ProjectNodes />
        
        {/* THE NEW MASTERPIECE (Center of the screen) */}
        <QuantumCore count={8000} />
        
      </Suspense>
    </Canvas>
  );
}