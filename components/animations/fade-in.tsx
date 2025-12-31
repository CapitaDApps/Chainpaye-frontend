"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
  direction = "up",
  fullWidth = false,
}: FadeInProps) {
  const directionOffset =
    direction === "up"
      ? 40
      : direction === "down"
      ? -40
      : direction === "left"
      ? 40
      : -40;

  const axis = direction === "left" || direction === "right" ? "x" : "y";

  return (
    <motion.div
      initial={{
        opacity: 0,
        [axis]: directionOffset,
      }}
      whileInView={{
        opacity: 1,
        [axis]: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth cubic bezier
        delay: delay,
      }}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
