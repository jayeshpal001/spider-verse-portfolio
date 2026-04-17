"use client";

import { useMemo } from "react";
import { useGLTF, Float } from "@react-three/drei";
import { useAppStore } from "@/store/useAppStore";
import * as THREE from "three";

interface SpiderManProps {
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export default function SpiderMan({
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: SpiderManProps) {
  const setHoveringNode = useAppStore((state) => state.setHoveringNode);
  const { scene } = useGLTF("/models/spiderman.glb");

  useMemo(() => {
    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        // Material processing here if needed later
      }
    });
  }, [scene]);

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={position} rotation={rotation} scale={scale}>
        {/* The Actual Visible Model (No hover events here) */}
        <primitive object={scene} />

        {/* THE INVISIBLE HITBOX */}
        <mesh
          position={[0, 0.2, 0]} // Y-axis ko thoda niche kiya
          onPointerOver={(e) => {
            e.stopPropagation();
            setHoveringNode(true);
            document.body.style.cursor = "crosshair";
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setHoveringNode(false);
            document.body.style.cursor = "auto";
          }}
        >
          {/* args: [width, height, depth] -> Size ko Spidey ke hisaab se shrink kiya */}
          <boxGeometry args={[1, 2.5, 1]} />

          {/* opacity={0.5} ko opacity={0} kar dein */}
          <meshBasicMaterial
            color="red"
            transparent
            opacity={0}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

useGLTF.preload("/models/spiderman.glb");
