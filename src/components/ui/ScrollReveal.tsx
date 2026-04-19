"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function ScrollReveal({ children, delay = 0 }: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      // once: false rakha hai taaki upar-niche scroll karne par har baar animate ho!
      viewport={{ once: false, amount: 0.3 }} 
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }} // Custom smooth easing
      className="w-full"
    >
      {children}
    </motion.div>
  );
}