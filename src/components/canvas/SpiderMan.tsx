// "use client";

// import { useRef, useMemo } from "react";
// import { useGLTF, useAnimations } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";
// import * as THREE from "three";

// export default function SpiderMan({ scale = 1.5, position = [0, -2, 0] }) {
//   const group = useRef<THREE.Group>(null);
//   const { scene, animations } = useGLTF("/models/spiderman.glb");
//   const { actions } = useAnimations(animations, group);

//   // Find the Head bone to make it follow the cursor
//   const headBone = useMemo(() => {
//     let head = null;
//     scene.traverse((child) => {
//       // Model banane wale ne sarr ki haddi ka naam kya rakha hai, yeh vary karta hai
//       // Commonly "Head", "mixamorigHead", ya "Neck" hota hai
//       if (child.isBone && child.name.toLowerCase().includes("head")) {
//         head = child;
//       }
//     });
//     return head;
//   }, [scene]);

//   useFrame((state) => {
//     // 1. Mouse coordinates ko 3D world space me convert karna
//     const target = new THREE.Vector3(
//       (state.pointer.x * state.viewport.width) / 2,
//       (state.pointer.y * state.viewport.height) / 2,
//       5 // Z-axis offset so he looks slightly forward, not cross-eyed
//     );

//     // 2. Head tracking: Make the head bone look at the target smoothly
//     if (headBone) {
//       // Smooth interpolation for natural movement (no jerky robotic snapping)
//       const currentQuat = headBone.quaternion.clone();
//       headBone.lookAt(target);
//       const targetQuat = headBone.quaternion.clone();
      
//       // Slerp blends the current rotation with the target rotation
//       headBone.quaternion.copy(currentQuat).slerp(targetQuat, 0.1); 
//     }
//   });

//   return (
//     <group ref={group} position={position} scale={scale}>
//       <primitive object={scene} />
//     </group>
//   );
// }

// useGLTF.preload("/models/spiderman.glb");