"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const CURRENCIES = [
  // Global currencies (Top-centric positions)
  {
    id: 1,
    label: "$",
    color: "text-red-400",
    bg: "bg-red-50",
    x: "40%",
    y: "10%",
    type: "global",
  },
  {
    id: 2,
    label: "€",
    color: "text-blue-500",
    bg: "bg-blue-50",
    x: "65%",
    y: "25%",
    type: "global",
  },
  // Local currencies (Bottom-centric positions spread out)
  {
    id: 3,
    label: "₦",
    color: "text-green-500",
    bg: "bg-green-50",
    x: "30%",
    y: "75%",
    type: "local",
  },
  {
    id: 4,
    label: "₵",
    color: "text-orange-400",
    bg: "bg-orange-50",
    x: "45%",
    y: "80%",
    type: "local",
  },
  {
    id: 5,
    label: "Kes",
    color: "text-gray-600",
    bg: "bg-gray-100",
    x: "55%",
    y: "70%",
    type: "local",
  },
  {
    id: 6,
    label: "ZAR",
    color: "text-blue-400",
    bg: "bg-blue-50",
    x: "70%",
    y: "75%",
    type: "local",
  },
];

export function MultiCurrencyAnimation() {
  const [showLocal, setShowLocal] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowLocal((prev) => !prev);
    }, 3500); // Cycle duration matching the visual flow
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-transparent overflow-hidden">
      {/* Central Stick UI - High Z-Index to stay on top (z-30) */}
      <div className="relative flex items-center w-4/5 h-12 z-30">
        <div className="absolute left-0 z-40 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center p-2.5">
          <Image
            src="/assets/Favicon.png"
            alt="Logo"
            width={32}
            height={32}
            className="object-contain"
          />
        </div>
        <div className="ml-6 w-full h-4 bg-white rounded-full shadow-inner border border-gray-50 opacity-90" />
      </div>

      {/* Currency Elements */}
      <AnimatePresence mode="wait">
        <motion.div
          key={showLocal ? "local-group" : "global-group"}
          className="absolute inset-0 z-10"
        >
          {CURRENCIES.map((curr) => {
            const isMatch =
              (showLocal && curr.type === "local") ||
              (!showLocal && curr.type === "global");
            if (!isMatch) return null;

            return (
              <motion.div
                key={curr.id}
                initial={
                  curr.type === "local"
                    ? { scale: 0, opacity: 0, top: "50%", left: curr.x }
                    : { scale: 1, opacity: 1, top: curr.y, left: curr.x }
                }
                animate={{
                  scale: 1,
                  opacity: 1,
                  top: curr.y,
                  left: curr.x,
                  transition: {
                    duration: 1.0,
                    ease: "circOut",
                    delay: curr.id * 0.05, // Slight stagger for natural feel
                  },
                }}
                exit={
                  curr.type === "global"
                    ? {
                        scale: 0,
                        opacity: 0,
                        top: "50%",
                        transition: { duration: 0.8, ease: "circIn" },
                      }
                    : {
                        scale: 0,
                        opacity: 0,
                        transition: { duration: 0.8, ease: "circIn" },
                      }
                }
                className={`absolute flex items-center justify-center rounded-full shadow-sm px-3 py-1.5 ${curr.bg} ${curr.color} text-[10px] font-bold border border-white/50`}
              >
                {curr.label}
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Subtle Glow Background */}
      <div className="absolute inset-0 bg-blue-50/20 blur-3xl rounded-full z-0" />
    </div>
  );
}
