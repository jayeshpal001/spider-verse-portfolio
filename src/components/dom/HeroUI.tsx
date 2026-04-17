"use client";

import { useAppStore } from "@/store/useAppStore";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroUI() {
  // Zustand se hover state get kar rahe hain
  const isHoveringNode = useAppStore((state) => state.isHoveringNode);

  return (
    // Pointer-events-none taaki yeh UI 3D mouse interactions ko block na kare
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      
      <AnimatePresence>
        {isHoveringNode && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-[20%] right-[10%] md:right-[20%] w-72 p-6 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(79,168,247,0.2)]"
          >
            {/* Identity Photo Placeholder */}
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-red-500 mb-4 overflow-hidden border-2 border-white/20">
              {/* Future mein yahan aapki photo <img src="/media/profile.jpg" /> aayegi */}
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1">Jayesh Pal</h3>
            <p className="text-sm text-blue-400 font-mono mb-3">Full Stack & Web3 Developer</p>
            
            <div className="space-y-2 text-xs text-gray-300">
              <p>🎯 <span className="text-white">Mission:</span> 0% Lag, Lightning Fast UI</p>
              <p>🧠 <span className="text-white">Mindset:</span> Strategic (Chess & Sudoku)</p>
              <p>⚙️ <span className="text-white">Arsenal:</span> MERN, Next.js, Ethers.js</p>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 text-[10px] text-gray-500 font-mono tracking-widest">
              IDENTITY REVEALED
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}