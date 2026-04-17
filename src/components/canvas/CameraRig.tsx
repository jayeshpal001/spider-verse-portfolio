"use client";

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CameraRig() {
  const { camera } = useThree();

  useEffect(() => {
    // Next.js SSR safety check
    if (typeof window === "undefined") return;

    // ScrollTrigger ko explicitly component mount hone par register karein
    gsap.registerPlugin(ScrollTrigger);

    // Ek GSAP timeline banayenge jo poore page ke scroll ke sath sync hogi
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // 1.5 seconds ka delay jisse movement me 'bounciness' aur 'smoothness' aati hai
      },
    });

    // 1. Camera Animation: Dive into the Web
    // Initial Z position 8 hai. Hum isko -10 tak le jayenge (Spidey ke aar-paar)
    tl.to(camera.position, {
      z: -10,
      y: -2, // Thoda niche ki taraf swing
      ease: "power2.inOut",
    }, 0);

    // 2. Camera Rotation: Thoda tilt (swing effect)
    tl.to(camera.rotation, {
      x: Math.PI / 8, // Halki si upward look
      ease: "none",
    }, 0);

    return () => {
      // Cleanup protocol taaki page change hone par memory leak na ho
      tl.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [camera]);

  return null; // Yeh component screen par kuch draw nahi karta, sirf camera control karta hai
}