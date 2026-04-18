"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { projects } from "@/content/projects";
import * as THREE from "three";

export default function ProjectNodes() {
  const groupRef = useRef<THREE.Group>(null);

  // Nodes ko hawa mein slowly rotate karne ke liye
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        child.rotation.x = time * 0.2 + i;
        child.rotation.y = time * 0.3 + i;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {projects.map((project, index) => {
        // Hum har project node ko Z-axis mein peeche (deep inside the web) place karenge.
        // Z values: -20, -35, -50 taaki camera unke paas ek-ek karke pahuche.
        // X aur Y ko thoda random rakhenge taaki swing effect feel ho.
        const zPosition = -20 - index * 15;
        const xPosition = index % 2 === 0 ? 4 : -4; // Ek right, ek left
        const yPosition = (Math.random() - 0.5) * 4;

        return (
          <Float key={project.id} speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh position={[xPosition, yPosition, zPosition]}>
              {/* Futuristic Octahedron Shape representing a Data Node */}
              <octahedronGeometry args={[1.5, 0]} />
              <meshStandardMaterial 
                color={project.color} 
                wireframe 
                emissive={project.color} 
                emissiveIntensity={0.5} 
              />
              
              {/* Inner glowing core */}
              <mesh scale={0.5}>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color={project.color} />
              </mesh>
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}