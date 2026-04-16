"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function WebNetwork({ count = 100 }) {
    const pointsRef = useRef<THREE.Points>(null);
    const linesRef = useRef<THREE.LineSegments>(null);

    // Generate random positions for the web nodes (particles)
    const [positions, linesData] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            // Spread particles in a 10x10x10 area
            pos[i] = (Math.random() - 0.5) * 10;
        }

        // Connect nodes that are close to each other to form the "Web"
        const lines: number[] = [];
        for (let i = 0; i < count; i++) {
            for (let j = i + 1; j < count; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                // If nodes are close enough (threshold: 2.5), connect them with a web thread
                if (dist < 2.5) {
                    lines.push(
                        pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                        pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                    );
                }
            }
        }
        return [pos, new Float32Array(lines)];
    }, [count]);
    // Animate the web to make it feel alive and floating
    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (pointsRef.current && linesRef.current) {
            // Slow rotation for the entire web network
            pointsRef.current.rotation.y = time * 0.05;
            pointsRef.current.rotation.x = time * 0.02;
            linesRef.current.rotation.y = time * 0.05;
            linesRef.current.rotation.x = time * 0.02;
        }
    });

    return (
        <group>
            {/* The Nodes (Intersection points of the web) */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    {/* Naya syntax: args={[array, itemSize]} */}
                    <bufferAttribute
                        attach="attributes-position"
                        args={[positions, 3]}
                    />
                </bufferGeometry>
                {/* Subtle glowing blue/white color for nodes */}
                <pointsMaterial size={0.05} color="#8ab4f8" transparent opacity={0.8} />
            </points>

            {/* The Threads (Connecting lines of the web) */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    {/* Naya syntax: args={[array, itemSize]} */}
                    <bufferAttribute
                        attach="attributes-position"
                        args={[linesData, 3]}
                    />
                </bufferGeometry>
                {/* Faint, slightly transparent lines for the web threads */}
                <lineBasicMaterial color="#ffffff" transparent opacity={0.15} />
            </lineSegments>
        </group>
    );
}