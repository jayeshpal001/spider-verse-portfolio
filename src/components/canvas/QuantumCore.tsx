"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function QuantumCore({ count = 8000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, viewport } = useThree();

  const [shapes, colors] = useMemo(() => {
    // Initialize ALL 13 Shape Arrays
    const sphere = new Float32Array(count * 3);
    const torus = new Float32Array(count * 3);
    const diamond = new Float32Array(count * 3);
    const helix = new Float32Array(count * 3);
    const pyramid = new Float32Array(count * 3);
    const vortex = new Float32Array(count * 3);
    const box = new Float32Array(count * 3);
    const constellation = new Float32Array(count * 3);
    const soundwave = new Float32Array(count * 3);
    const arcReactor = new Float32Array(count * 3);
    const spiral = new Float32Array(count * 3);
    const stardust = new Float32Array(count * 3);
    const blackhole = new Float32Array(count * 3);
    
    const col = new Float32Array(count * 3);
    
    const colorBlue = new THREE.Color("#4fa8f7");
    const colorGreen = new THREE.Color("#00ff88");
    const colorRed = new THREE.Color("#ff4b4b");

    const gridSize = Math.ceil(Math.pow(count, 1 / 3));
    const step = 6 / gridSize;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      // 1. SPHERE (Hero)
      const r = 2.5 + Math.random() * 1.5; 
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      sphere[i3] = r * Math.sin(phi) * Math.cos(theta);
      sphere[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      sphere[i3 + 2] = r * Math.cos(phi);

      // 2. TORUS (Syncrocode)
      const tRadius = 3.5;
      const tTube = 0.5 + Math.random() * 0.5;
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 2;
      torus[i3] = (tRadius + tTube * Math.cos(v)) * Math.cos(u);
      torus[i3 + 1] = (tRadius + tTube * Math.cos(v)) * Math.sin(u);
      torus[i3 + 2] = tTube * Math.sin(v);

      // 3. DIAMOND (Kalakaar Ventures)
      const dHeight = (Math.random() - 0.5) * 6; 
      const dRadius = 3 - Math.abs(dHeight); 
      const dAngle = Math.random() * Math.PI * 2;
      diamond[i3] = dRadius * Math.cos(dAngle);
      diamond[i3 + 1] = dHeight;
      diamond[i3 + 2] = dRadius * Math.sin(dAngle);

      // 4. DNA HELIX (HealthCore)
      const hHeight = (Math.random() - 0.5) * 12;
      const hAngle = hHeight * 1.5;
      const strandOffset = (i % 2 === 0) ? 0 : Math.PI;
      helix[i3] = 2.5 * Math.cos(hAngle + strandOffset) + (Math.random() - 0.5) * 0.5;
      helix[i3 + 1] = hHeight;
      helix[i3 + 2] = 2.5 * Math.sin(hAngle + strandOffset) + (Math.random() - 0.5) * 0.5;

      // 5. PYRAMID (Gang-App)
      const py = (Math.random() - 0.5) * 6;
      const pr = 3 - (py + 3) / 2; 
      pyramid[i3] = (Math.random() - 0.5) * pr * 2;
      pyramid[i3 + 1] = py;
      pyramid[i3 + 2] = (Math.random() - 0.5) * pr * 2;

      // 6. VORTEX / GALAXY (MergePath)
      const vr = Math.random() * 5;
      const vAngle = vr * 3 + Math.random() * Math.PI * 2; 
      vortex[i3] = vr * Math.cos(vAngle);
      vortex[i3 + 1] = (Math.random() - 0.5) * 0.5; 
      vortex[i3 + 2] = vr * Math.sin(vAngle);

      // 7. CUBE GRID (Bringo & Chess Strategy)
      const gx = (i % gridSize);
      const gy = Math.floor(i / gridSize) % gridSize;
      const gz = Math.floor(i / (gridSize * gridSize));
      box[i3] = (gx * step) - 3 + (Math.random() - 0.5) * 0.2;
      box[i3 + 1] = (gy * step) - 3 + (Math.random() - 0.5) * 0.2;
      box[i3 + 2] = (gz * step) - 3 + (Math.random() - 0.5) * 0.2;

      // 8. THE CONSTELLATION (Skills)
      const cRadius = 12 + Math.random() * 8; 
      const cTheta = 2 * Math.PI * Math.random();
      const cPhi = Math.acos(2 * Math.random() - 1);
      constellation[i3] = cRadius * Math.sin(cPhi) * Math.cos(cTheta);
      constellation[i3 + 1] = cRadius * Math.sin(cPhi) * Math.sin(cTheta);
      constellation[i3 + 2] = cRadius * Math.cos(cPhi);

      // 9. SOUNDWAVE (Music)
      const sx = (Math.random() - 0.5) * 12; 
      const sz = (Math.random() - 0.5) * 4;  
      const sy = Math.sin(sx * 2) * 3 * Math.random(); 
      soundwave[i3] = sx;
      soundwave[i3 + 1] = sy;
      soundwave[i3 + 2] = sz;

      // 10. ARC REACTOR (Marvel)
      const aRadius = Math.random() > 0.4 ? 3.5 : 1.5; 
      const aAngle = Math.random() * Math.PI * 2;
      arcReactor[i3] = aRadius * Math.cos(aAngle) + (Math.random() - 0.5) * 0.4;
      arcReactor[i3 + 1] = aRadius * Math.sin(aAngle) + (Math.random() - 0.5) * 0.4;
      arcReactor[i3 + 2] = (Math.random() - 0.5) * 0.5;

      // 11. SPIRAL (Sketching & Coding)
      const spRadius = Math.random() * 3 + 1;
      const spAngle = spRadius * 4 + Math.random();
      spiral[i3] = spRadius * Math.cos(spAngle);
      spiral[i3 + 1] = (Math.random() - 0.5) * 8; 
      spiral[i3 + 2] = spRadius * Math.sin(spAngle);

      // 12. STARDUST (Memory Vault - Calm spread)
      stardust[i3] = (Math.random() - 0.5) * 30;
      stardust[i3 + 1] = (Math.random() - 0.5) * 30;
      stardust[i3 + 2] = (Math.random() - 0.5) * 30;

      // 13. BLACK HOLE (Endgame)
      const bhRadius = Math.pow(Math.random(), 2) * 8 + 1; 
      const bhAngle = Math.random() * Math.PI * 2 + bhRadius * 5; 
      blackhole[i3] = bhRadius * Math.cos(bhAngle);
      blackhole[i3 + 1] = (Math.random() - 0.5) * (2 / bhRadius); 
      blackhole[i3 + 2] = bhRadius * Math.sin(bhAngle);

      // Colors
      const mixedColor = colorBlue.clone().lerp(Math.random() > 0.5 ? colorGreen : colorRed, Math.random());
      col[i3] = mixedColor.r;
      col[i3 + 1] = mixedColor.g;
      col[i3 + 2] = mixedColor.b;
    }
    
    return [{ 
      sphere, torus, diamond, helix, pyramid, vortex, box, 
      constellation, soundwave, arcReactor, spiral, stardust, blackhole 
    }, col];
  }, [count]);

  const currentPositions = useMemo(() => new Float32Array(count * 3), [count]);

  useFrame((state) => {
    if (!pointsRef.current || !groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const camZ = state.camera.position.z;

    const isScrollingDown = camZ < -5;
    const targetGroupX = isScrollingDown ? 4 : 0;
    
    groupRef.current.position.x += (targetGroupX - groupRef.current.position.x) * 0.05;
    groupRef.current.position.y = state.camera.position.y;
    groupRef.current.position.z = camZ - 8; 

    // Slow rotation
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.z = time * 0.05;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const mouseVec = new THREE.Vector3(mouseX - groupRef.current.position.x, mouseY - groupRef.current.position.y, 0);

    // DYNAMIC MAP TARGETS (Perfectly synced with DOM scrolling)
    let targetShape = shapes.sphere;
    
    if (camZ < -5 && camZ >= -20) targetShape = shapes.torus;              // Syncrocode
    else if (camZ < -20 && camZ >= -35) targetShape = shapes.diamond;      // Kalakaar
    else if (camZ < -35 && camZ >= -50) targetShape = shapes.helix;        // HealthCore
    else if (camZ < -50 && camZ >= -65) targetShape = shapes.pyramid;      // Gang-App
    else if (camZ < -65 && camZ >= -80) targetShape = shapes.vortex;       // MergePath
    else if (camZ < -80 && camZ >= -95) targetShape = shapes.box;          // Bringo
    else if (camZ < -95 && camZ >= -110) targetShape = shapes.constellation; // Skills
    else if (camZ < -110 && camZ >= -125) targetShape = shapes.box;          // Mind Palace (Strategy)
    else if (camZ < -125 && camZ >= -140) targetShape = shapes.soundwave;    // Mind Palace (Music)
    else if (camZ < -140 && camZ >= -155) targetShape = shapes.arcReactor;   // Mind Palace (Marvel)
    else if (camZ < -155 && camZ >= -170) targetShape = shapes.spiral;       // Mind Palace (Sketching)
    else if (camZ < -170 && camZ >= -220) targetShape = shapes.stardust;     // Memory Vault (Photos)
    else if (camZ < -220) targetShape = shapes.blackhole;                    // Endgame (Contact)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      const px = currentPositions[i3];
      const py = currentPositions[i3 + 1];
      const pz = currentPositions[i3 + 2];
      
      let targetX = targetShape[i3];
      let targetY = targetShape[i3 + 1];
      let targetZ = targetShape[i3 + 2];

      // LIVE ANIMATION FOR SOUNDWAVE (Bounce effect)
      if (targetShape === shapes.soundwave) {
         targetY += Math.sin(time * 3 + targetX) * 0.5; 
      }

      // LIVE ANIMATION FOR BLACK HOLE (Swirling pull)
      if (targetShape === shapes.blackhole) {
         // Add extra rotation to the blackhole shape specifically
         const currentAngle = Math.atan2(targetZ, targetX);
         const dist = Math.sqrt(targetX * targetX + targetZ * targetZ);
         targetX = dist * Math.cos(currentAngle + time * 0.5);
         targetZ = dist * Math.sin(currentAngle + time * 0.5);
      }

      const pointVec = new THREE.Vector3(px, py, pz);
      pointVec.applyEuler(pointsRef.current.rotation);
      const dist = pointVec.distanceTo(mouseVec);
      
      // Magnetic Repel
      if (dist < 3.0) { 
        const force = (3.0 - dist) / 3.0; 
        const dir = pointVec.clone().sub(mouseVec).normalize();
        currentPositions[i3] += dir.x * force * 0.4;
        currentPositions[i3 + 1] += dir.y * force * 0.4;
        currentPositions[i3 + 2] += dir.z * force * 0.4;
      } else {
        currentPositions[i3] += (targetX - px) * 0.08;
        currentPositions[i3 + 1] += (targetY - py) * 0.08;
        currentPositions[i3 + 2] += (targetZ - pz) * 0.08;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

return (
    <group ref={groupRef}>
      {/* ADD frustumCulled={false} HERE */}
      <points ref={pointsRef} frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[currentPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial 
          size={0.035} 
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