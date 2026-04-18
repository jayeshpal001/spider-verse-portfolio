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

    // 1. The Dodge (Spidey ke right shoulder ke paas se swing karte hue nikalna)
    tl.to(
      camera.position,
      {
        x: 3, // Right ki taraf swing
        y: -1, // Halka sa niche
        z: 2, // Spidey ke theek aage
        duration: 0.15,
        ease: "power2.inOut",
      },
      0,
    );

    // 2. The Deep Dive (Tunnel ke andar jaana)
    tl.to(
      camera.position,
      {
        x: 0, // Wapas center mein
        y: 0,
        z: -55, // Deep tunnel
        duration: 0.85, // Baaki ka time dive mein
        ease: "power1.inOut",
      },
      0.15,
    ); // Dodge hone ke baad start hoga

    // 3. The Dynamic Tilt (Speed aur motion feel karne ke liye camera tilt)
    tl.to(
      camera.rotation,
      {
        z: -Math.PI / 16, // Halka sa barrel roll effect
        x: Math.PI / 16,
        duration: 0.5,
        ease: "power1.inOut",
      },
      0,
    );

    tl.to(
      camera.rotation,
      {
        z: 0, // Wapas seedha hona
        x: 0,
        duration: 0.5,
        ease: "power1.inOut",
      },
      0.5,
    );
    return () => {
      // Cleanup protocol taaki page change hone par memory leak na ho
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [camera]);

  return null; // Yeh component screen par kuch draw nahi karta, sirf camera control karta hai
}
