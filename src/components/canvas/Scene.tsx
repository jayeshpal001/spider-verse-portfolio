"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import WebNetwork from "./WebNetwork";

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        {/* Dark/Cyberpunk City Environment Lighting */}
        <Environment preset="city" />
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#4fa8f7" />

        {/* The Living Spider-Web Background */}
        <WebNetwork count={150} />

      </Suspense>
    </Canvas>
  );
}