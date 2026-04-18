"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumCore({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();

  // Generate 8000 particles forming a dense, glowing sphere
  const [positions, originalPositions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorBlue = new THREE.Color("#4fa8f7"); // MergePath Blue
    const colorGreen = new THREE.Color("#00ff88"); // Bringo Web3 Green
    const colorRed = new THREE.Color("#ff4b4b"); // Gang-App Red

    for (let i = 0; i < count; i++) {
      // Create a spherical shell distribution
      const r = 2.5 + Math.random() * 1.5; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;

      // Randomize glowing colors for a cyber-aesthetic look
      const mixedColor = colorBlue.clone().lerp(Math.random() > 0.5 ? colorGreen : colorRed, Math.random());
      col[i * 3] = mixedColor.r;
      col[i * 3 + 1] = mixedColor.g;
      col[i * 3 + 2] = mixedColor.b;
    }
    return [pos, orig, col];
  }, [count]);

  // The Physics Engine: Animating the particles every single frame
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Rotate the entire core slowly like a planet
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.z = time * 0.05;

    // Convert 2D mouse coordinates to 3D world space
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX, mouseY, 0);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const px = positions[i3];
      const py = positions[i3 + 1];
      const pz = positions[i3 + 2];
      
      const origX = originalPositions[i3];
      const origY = originalPositions[i3 + 1];
      const origZ = originalPositions[i3 + 2];

      // The "Breathing" Wave Effect
      const wave = Math.sin(time * 2 + origX * 2) * 0.1;
      const targetX = origX + wave;
      const targetY = origY + wave;
      const targetZ = origZ + wave;

      // Transform particle position to world space for mouse collision
      const pointVec = new THREE.Vector3(px, py, pz);
      pointVec.applyEuler(pointsRef.current.rotation);
      
      const dist = pointVec.distanceTo(mouseVec);
      
      // The "Magnetic Repel" Effect (This creates the WOW factor)
      if (dist < 2.5) {
        const force = (2.5 - dist) / 2.5; 
        const dir = pointVec.clone().sub(mouseVec).normalize();
        
        // Push particles away violently
        positions[i3] += dir.x * force * 0.3;
        positions[i3 + 1] += dir.y * force * 0.3;
        positions[i3 + 2] += dir.z * force * 0.3;
      } else {
        // Smoothly snap back to original position (Liquid-like tension)
        positions[i3] += (targetX - px) * 0.08;
        positions[i3 + 1] += (targetY - py) * 0.08;
        positions[i3 + 2] += (targetZ - pz) * 0.08;
      }
    }
    
    // Notify Three.js that the array has changed and needs re-rendering
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      {/* Additive blending makes overlapping particles glow intensely like energy */}
      <pointsMaterial 
        size={0.03} 
        vertexColors 
        transparent 
        opacity={0.8} 
        blending={THREE.AdditiveBlending} 
        depthWrite={false}
      />
    </points>
  );
}