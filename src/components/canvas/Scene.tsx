"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Suspense } from "react";
import WebNetwork from "./WebNetwork";
import SpiderMan from "./SpiderMan";
import CameraRig from "./CameraRig"; // Naya component import kiya

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
        {/* The Camera Director */}
        <CameraRig />

        {/* Environment & Lights */}
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#4fa8f7" />
        <pointLight position={[-5, -5, -5]} intensity={2.5} color="#ff0000" />

        <WebNetwork count={150} />
        
        <SpiderMan 
           scale={1.5} 
           position={[0, -2, 0]} 
          //  rotation={[0, Math.PI, 0]} 
        />
        
      </Suspense>
    </Canvas>
  );
}