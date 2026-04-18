"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumCore({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  // 1. REFINED MATHEMATICS FOR SHARP SHAPES
  const [shapes, colors] = useMemo(() => {
    const sphere = new Float32Array(count * 3);
    const torus = new Float32Array(count * 3);
    const helix = new Float32Array(count * 3);
    const box = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    const colorBlue = new THREE.Color("#4fa8f7");
    const colorGreen = new THREE.Color("#00ff88");
    const colorRed = new THREE.Color("#ff4b4b");

    // Pre-calculate grid dimensions for the perfect Cube
    const gridSize = Math.ceil(Math.pow(count, 1 / 3));
    const step = 6 / gridSize;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // SPHERE (Dense Core)
      const r = 2.5 + Math.random() * 1.5; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      sphere[i3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i3 + 2] = r * Math.cos(phi);

      // TORUS (Tighter, cleaner Ring)
      const tRadius = 3.5;
      const tTube = 0.5 + Math.random() * 0.5; // Thinner tube for cleaner look
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      torus[i3] = (tRadius + tTube * Math.cos(v)) * Math.cos(u);
      torus[i3 + 1] = (tRadius + tTube * Math.cos(v)) * Math.sin(u);
      torus[i3 + 2] = tTube * Math.sin(v);

      // DNA HELIX (Two sharp, distinct strands)
      const hHeight = (Math.random() - 0.5) * 12;
      const hAngle = hHeight * 1.5;
      const strandOffset = (i % 2 === 0) ? 0 : Math.PI; // Separate into two strands
      const hRadius = 2.5;
      helix[i3] = hRadius * Math.cos(hAngle + strandOffset) + (Math.random() - 0.5) * 0.5;
      helix[i3 + 1] = hHeight;
      helix[i3 + 2] = hRadius * Math.sin(hAngle + strandOffset) + (Math.random() - 0.5) * 0.5;

      // CUBE GRID (Perfect structured lattice)
      const gx = (i % gridSize);
      const gy = Math.floor(i / gridSize) % gridSize;
      const gz = Math.floor(i / (gridSize * gridSize));
      box[i3] = (gx * step) - 3 + (Math.random() - 0.5) * 0.2; // Slight jitter for energy feel
      box[i3 + 1] = (gy * step) - 3 + (Math.random() - 0.5) * 0.2;
      box[i3 + 2] = (gz * step) - 3 + (Math.random() - 0.5) * 0.2;

      // Colors
      const mixedColor = colorBlue.clone().lerp(Math.random() > 0.5 ? colorGreen : colorRed, Math.random());
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    return [{ sphere, torus, helix, box }, col];
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const camZ = state.camera.position.z;

    // 2. SMART POSITIONING: Slide to the right when scrolling to project cards
    const isScrollingDown = camZ < -5;
    const targetGroupX = isScrollingDown ? 4 : 0; // Move Right if scrolling, Center if at top
    
    // Smoothly interpolate the group's position
    groupRef.current.position.x += (targetGroupX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y = state.camera.position.y;
    groupRef.current.position.z = camZ - 8; // Stay exactly 8 units in front of camera

    // Slow planetary rotation
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.z = time * 0.05;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    // Adjust mouse vector based on the group's shifted X position
    const mouseVec = new THREE.Vector3(mouseX - groupRef.current.position.x, mouseY - groupRef.current.position.y, 0);

    // Shape transition targets based on depth
    let targetShape = shapes.sphere;
    if (camZ < -5 && camZ >= -20) targetShape = shapes.torus;
    else if (camZ < -20 && camZ >= -35) targetShape = shapes.helix;
    else if (camZ < -35) targetShape = shapes.box;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const px = currentPositions[i3];
      const py = currentPositions[i3 + 1];
      const pz = currentPositions[i3 + 2];
      
      const targetX = targetShape[i3];
      const targetY = targetShape[i3 + 1];
      const targetZ = targetShape[i3 + 2];

      const pointVec = new THREE.Vector3(px, py, pz);
      pointVec.applyEuler(pointsRef.current.rotation);
      const dist = pointVec.distanceTo(mouseVec);
      
      // Magnetic Repel
      if (dist < 3.0) { // Increased repel radius slightly
        const force = (3.0 - dist) / 3.0; 
        const dir = pointVec.clone().sub(mouseVec).normalize();
        
        currentPositions[i3] += dir.x * force * 0.4;
        currentPositions[i3 + 1] += dir.y * force * 0.4;
        currentPositions[i3 + 2] += dir.z * force * 0.4;
      } else {
        // Smooth morphing back to target shape
        currentPositions[i3] += (targetX - px) * 0.08; // Slightly faster snap
        currentPositions[i3 + 1] += (targetY - py) * 0.08;
        currentPositions[i3 + 2] += (targetZ - pz) * 0.08;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.035} // Slightly larger particles for better glow
          vertexColors 
          transparent 
          opacity={0.9} 
          blending={THREE.AdditiveBlending} 
          depthWrite={false}
        />
      </points>
    </group>
  );
}