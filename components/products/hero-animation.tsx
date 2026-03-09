"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const COUNTRIES = {
  USA: { id: "usa", name: "USA", src: "/assets/usa.svg", x: "20%", y: "25%" },
  UK: { id: "uk", name: "UK", src: "/assets/uk.svg", x: "65%", y: "20%" },
  NIGERIA: {
    id: "nigeria",
    name: "Nigeria",
    src: "/assets/nigeria.svg",
    x: "55%",
    y: "65%",
  },
  GHANA: {
    id: "ghana",
    name: "Ghana",
    src: "/assets/ghana.svg",
    x: "55%",
    y: "55%",
  },
};

export function HeroAnimation() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 2);
    }, 6000); // 6s per cycle (USA-NG, then UK-GH)
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background Map */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/assets/world-map.png"
          alt="World Map"
          fill
          className="object-contain p-8"
        />
      </div>

      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div
            key="usa-ng"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            {/* Country Nodes */}
            <CountryNode country={COUNTRIES.USA} isActive={true} delay={0.2} />
            <CountryNode country={COUNTRIES.UK} isActive={false} delay={0.4} />
            <CountryNode
              country={COUNTRIES.NIGERIA}
              isActive={true}
              delay={0.6}
            />

            {/* Link Line */}
            <ConnectionLine
              start={{ x: "20%", y: "25%" }}
              end={{ x: "55%", y: "65%" }}
              delay={1.5}
            />

            {/* Notification */}
            <Notification
              text="Payment Received"
              subtext="$200 received from John Smith successfully"
              x="30%"
              y="65%"
              delay={2.5}
            />
          </motion.div>
        ) : (
          <motion.div
            key="uk-gh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-10"
          >
            <CountryNode country={COUNTRIES.USA} isActive={false} delay={0.2} />
            <CountryNode country={COUNTRIES.UK} isActive={true} delay={0.4} />
            <CountryNode
              country={COUNTRIES.GHANA}
              isActive={true}
              delay={0.6}
            />

            <ConnectionLine
              start={{ x: "65%", y: "20%" }}
              end={{ x: "55%", y: "55%" }}
              delay={1.5}
            />

            <Notification
              text="Payment Successfully"
              subtext="$50 received from Dada Kofi successfully"
              x="43%"
              y="8%"
              delay={2.5}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface Country {
  id: string;
  name: string;
  src: string;
  x: string;
  y: string;
}

interface Position {
  x: string;
  y: string;
}

function CountryNode({
  country,
  isActive,
  delay,
}: {
  country: Country;
  isActive: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="absolute flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
      style={{ left: country.x, top: country.y }}
    >
      <div
        className={`
        relative w-12 h-12 rounded-2xl flex items-center justify-center  transition-all duration-500
        ${isActive ? "border-2 border-[#003DFF]" : "border border-[#E5E7EB] opacity-60"}
      `}
      >
        <div className="relative w-full h-full">
          <Image
            src={country.src}
            alt={country.name}
            fill
            className="object-contain border"
          />
        </div>
      </div>
    </motion.div>
  );
}

function ConnectionLine({
  start,
  end,
  delay,
}: {
  start: Position;
  end: Position;
  delay: number;
}) {
  const sX = parseFloat(start.x);
  const sY = parseFloat(start.y);
  const eX = parseFloat(end.x);
  const eY = parseFloat(end.y);

  // Offset to prevent line from entering the logo (approx 4% in 100x100 view)
  const offset = 4;
  const dx = eX - sX;
  const dy = eY - sY;
  const angle = Math.atan2(dy, dx);

  const startX = sX + Math.cos(angle) * offset;
  const startY = sY + Math.sin(angle) * offset;
  const endX = eX - Math.cos(angle) * offset;
  const endY = eY - Math.sin(angle) * offset;

  // Calculate control point for a better curve
  // We want a curve that dips or arches based on the images
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  // Push control point away from the center to create a nice arc
  const cpX = midX + (endY - startY) * 0.1;
  const cpY = midY - (endX - startX) * 0.1;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
    >
      <motion.path
        d={`M ${startX} ${startY} Q ${cpX} ${cpY}, ${endX} ${endY}`}
        fill="transparent"
        stroke="#003DFF"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay, duration: 0.8 }}
      />
    </svg>
  );
}

function Notification({
  text,
  subtext,
  x,
  y,
  delay,
}: {
  text: string;
  subtext: string;
  x: string;
  y: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="absolute z-20 translate-x-[-50%]"
      style={{ left: x, top: y }}
    >
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 border border-[#F3F4F6] min-w-60 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 relative">
          <svg
            className="w-5 h-5 text-[#4F46E5]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.73 21a2 2 0 0 1-3.46 0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#4F46E5] rounded-full border-2 border-[#EEF2FF]" />
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-bold text-[#111528] tracking-tight">
              {text}
            </span>
            <span className="text-[9px] text-[#A1A1AA] font-normal">
              Just now
            </span>
          </div>
          <span className="text-[9px] text-[#5A5F73] font-medium leading-tight mt-0.5">
            {subtext}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
