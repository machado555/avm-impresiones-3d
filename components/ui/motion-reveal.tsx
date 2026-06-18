"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionRevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

export function MotionReveal({ children, delay = 0, className }: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}
