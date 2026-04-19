"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Stars } from "@react-three/drei";
import { Suspense } from "react";
import CameraRig from "./CameraRig";
import QuantumCore from "./QuantumCore";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#030303", 5, 40]} />

      <Suspense fallback={null}>
        <CameraRig />
        
        {/* Massive Starfield so you don't fly out of it during deep scroll */}
        <Stars radius={300} depth={300} count={5000} factor={4} fade speed={1.5} />
        
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#4fa8f7" />

        {/* ONLY THE QUANTUM CORE REMAINS */}
        <QuantumCore count={8000} />
      </Suspense>
    </Canvas>
  );
}