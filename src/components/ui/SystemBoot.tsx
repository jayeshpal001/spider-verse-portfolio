"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SystemBootProps {
  onComplete: () => void;
}

export default function SystemBoot({ onComplete }: SystemBootProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "welcome" | "expanding">("loading");

  useEffect(() => {
    if (phase !== "loading") return;

    // Smoothly increment progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("welcome");
          
          // Wait briefly at "WELCOME", then trigger the massive black screen expansion
          setTimeout(() => setPhase("expanding"), 800);
          
          // Complete the boot sequence after the black screen covers everything
          setTimeout(() => onComplete(), 1800);
          return 100;
        }
        // Randomize loading speed for realism
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [phase, onComplete]);

  return (
    <motion.div
      // We don't fade out this main container, we let the black circle cover it.
      // After onComplete is called, the parent page.tsx will unmount it.
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#f4f4f4] overflow-hidden"
    >
      {/* 1. The Continuous Marquee Text Background */}
      <div className="absolute inset-0 flex items-center whitespace-nowrap overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          className="flex"
        >
          {/* Duplicated text to create a seamless infinite loop */}
          <h1 className="text-[10vw] font-bold text-black uppercase tracking-tighter px-4">
            JAYESH PAL • FULL STACK DEVELOPER • WEB3 ARCHITECT • 
          </h1>
          <h1 className="text-[10vw] font-bold text-black uppercase tracking-tighter px-4">
            JAYESH PAL • FULL STACK DEVELOPER • WEB3 ARCHITECT • 
          </h1>
        </motion.div>
      </div>

      {/* 2. The Expanding Black Screen Transition */}
      <motion.div
        className="absolute bg-[#030303] rounded-full z-10"
        initial={{ width: 0, height: 0 }}
        animate={{
          width: phase === "expanding" ? "300vw" : 0,
          height: phase === "expanding" ? "300vw" : 0,
        }}
        // Custom easing for that "snappy" agency feel
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* 3. The Center Loading Pill */}
      <AnimatePresence>
        {phase !== "expanding" && (
          <motion.div
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative z-20 flex items-center justify-center bg-[#111111] text-white rounded-full h-14 md:h-16 min-w-[200px] md:min-w-[250px] overflow-hidden shadow-2xl"
          >
            {/* The subtle progress fill inside the pill */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-white/10"
              style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
            />
            
            {/* The Text inside the pill */}
            <span className="relative z-30 font-mono text-xs md:text-sm tracking-widest font-bold px-8 flex items-center gap-3">
              {phase === "loading" ? (
                <>
                  LOADING <span className="w-8 text-right">{progress}%</span>
                </>
              ) : (
                <span className="flex items-center gap-2">
                  {/* Small white block icon for aesthetic */}
                  <div className="w-2 h-4 bg-white" /> 
                  WELCOME
                </span>
              )}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}