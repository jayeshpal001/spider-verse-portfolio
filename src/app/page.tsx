"use client";

import { useState, useEffect } from "react";
import Scene from "@/components/canvas/Scene";
import HeroUI from "@/components/dom/HeroUI";
import ProjectsSection from "@/components/dom/ProjectsSection";
import ConstellationSection from "@/components/dom/ConstellationSection";
import MindPalaceSection from "@/components/dom/MindPalaceSection";
import MemoryVaultSection from "@/components/dom/MemoryVaultSection";
import EndgameSection from "@/components/dom/EndgameSection";
import SystemBoot from "@/components/ui/SystemBoot";
import CyberPath from "@/components/ui/CyberPath"; // NEW: Imported the animated path

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);

  // Lock scrolling while the loader is active
  useEffect(() => {
    if (isBooting) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isBooting]);

  return (
    <main className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden">
      
      {/* The Premium Loader */}
      {isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}

      {/* 3D CANVAS LAYER (Pre-loads in background) */}
      <div className="fixed inset-0 z-0 pointer-events-auto">
        <Scene />
      </div>

      {/* 2D DOM LAYER */}
      <div className={`relative z-10 pointer-events-none transition-opacity duration-1000 ${isBooting ? 'opacity-0' : 'opacity-100'}`}>
        
        {/* NEW: THE GLOWING NERVE CENTER PATH */}
        <CyberPath />
        
        {/* HERO SECTION */}
        <section className="relative flex h-screen items-center justify-center">
          <h1 className="text-7xl md:text-9xl font-bold text-white opacity-80 mix-blend-overlay">
            JAYESH PAL
          </h1>
          <HeroUI />
        </section>

        {/* NEW: Tightly packed container to remove massive boring gaps */}
        <div className="flex flex-col gap-32 pb-32">
          <ProjectsSection />
          <ConstellationSection />
          <MindPalaceSection />
          <MemoryVaultSection />
          <EndgameSection />
        </div>
        
      </div>
    </main>
  );
}