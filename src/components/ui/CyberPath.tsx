"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function CyberPath() {
  const { scrollYProgress } = useScroll();
  
  // Maps scroll progress to the height of the glowing line
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="absolute top-0 left-[5%] md:left-[10%] w-[2px] h-full z-0 bg-white/5">
      {/* The Glowing Energy Beam */}
      <motion.div
        className="w-full bg-gradient-to-b from-[#4fa8f7] via-[#00ff88] to-[#ff4b4b] origin-top shadow-[0_0_15px_#00ff88]"
        style={{ height }}
      />
    </div>
  );
}