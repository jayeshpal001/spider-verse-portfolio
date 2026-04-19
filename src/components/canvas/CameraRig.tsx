"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smooth interpolation
      },
    });

    // 1. DEEP DIVE: Increased depth from -55 to -120 to cover all 7 projects
  tl.to(camera.position, {
      z: -300, // Tunnel ki gehrai badha di
      ease: "none",
    }, 0);
    // 2. CYBER-TUNNEL ROLL: Continuous slow barrel roll for an immersive feel
    tl.to(camera.rotation, {
      z: -Math.PI / 4,
      ease: "none",
    }, 0);

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera]);

  return null;
}