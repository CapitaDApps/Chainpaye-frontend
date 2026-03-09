"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const COUNTRIES = {
  USA: { id: "usa", name: "USA", src: "/assets/usa.svg", x: "22%", y: "30%" },
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
    y: "65%",
  },
};

type SubStep = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export function HeroAnimation() {
  const [linkIndex, setLinkIndex] = useState(0); // 0: USA-NG, 1: UK-GH
  const [subStep, setSubStep] = useState<SubStep>(0);

  useEffect(() => {
    const sequence = [
      { step: 0, duration: 1000 }, // ALL_VISIBLE
      { step: 1, duration: 500 },  // TARGET_BORDER
      { step: 2, duration: 500 },  // SOURCE_BORDER
      { step: 3, duration: 1000 }, // SHOW_LINE
      { step: 4, duration: 2500 }, // SHOW_NOTIF + HIDE_EXTRA
      { step: 5, duration: 500 },  // HIDE_NOTIF
      { step: 6, duration: 800 },  // RESET (increased for smooth transition)
    ];

    let current = 0;
    let timeoutId: NodeJS.Timeout;

    const runSequence = () => {
      const { step, duration } = sequence[current];
      setSubStep(step as SubStep);
      
      timeoutId = setTimeout(() => {
        current = (current + 1) % sequence.length;
        if (current === 0) {
          setLinkIndex((prev) => (prev + 1) % 2);
        }
        runSequence();
      }, duration);
    };

    runSequence();
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  const isUsaNg = linkIndex === 0;
  const source = isUsaNg ? COUNTRIES.USA : COUNTRIES.UK;
  const target = isUsaNg ? COUNTRIES.NIGERIA : COUNTRIES.GHANA;

  // Animation States
  const targetHasBorder = subStep >= 1 && subStep < 6;
  const sourceHasBorder = subStep >= 2 && subStep < 6;
  const lineVisible = subStep >= 3 && subStep < 6;
  const extraHidden = subStep >= 4 && subStep < 6;
  const notificationVisible = subStep === 4;

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

      <div className="absolute inset-0 z-10">
        {/* Connection Line (Placed behind logos) */}
        {lineVisible && (
          <ConnectionLine
            key={`line-${linkIndex}`}
            start={{ x: source.x, y: source.y }}
            end={{ x: target.x, y: target.y }}
            isDrawing={subStep >= 3}
            isUsaNg={isUsaNg}
          />
        )}

        {/* Stable Country Nodes to prevent scale popping */}
        {/* 1. USA Node */}
        <CountryNode
          key="usa-node"
          country={COUNTRIES.USA}
          isActive={source.id === "usa" ? sourceHasBorder : false}
          isVisible={!(isUsaNg === false && extraHidden)} // Hide extra (USA) during UK-GH notif phase
        />

        {/* 2. UK Node */}
        <CountryNode
          key="uk-node"
          country={COUNTRIES.UK}
          isActive={source.id === "uk" ? sourceHasBorder : false}
          isVisible={!(isUsaNg === true && extraHidden)} // Hide extra (UK) during USA-NG notif phase
        />

        {/* 3. Africa Destination Node (Swaps Nigeria/Ghana) */}
        <CountryNode
          key="africa-node"
          country={isUsaNg ? COUNTRIES.NIGERIA : COUNTRIES.GHANA}
          isActive={targetHasBorder}
          isVisible={true}
        />

        {/* Notification */}
        <AnimatePresence>
          {notificationVisible && (
            <Notification
              key={`notif-${linkIndex}`}
              text={isUsaNg ? "Payment Received" : "Payment Successfully"}
              subtext={isUsaNg 
                ? "$200 received from John Smith successfully"
                : "₵500 received from Dada Kofi successfully"
              }
              x={isUsaNg ? "35%" : "40%"} // Close to Ghana midpoint
              y={isUsaNg ? "65%" : "12%"} // Center of screen
            />
          )}
        </AnimatePresence>
      </div>
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
  isVisible,
}: {
  country: Country;
  isActive: boolean;
  isVisible: boolean;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: isVisible ? 1 : 0 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="absolute flex items-center justify-center translate-x-[-50%] translate-y-[-50%]"
      style={{ left: country.x, top: country.y }}
    >
      <div
        className={`
          relative w-14 h-14 rounded-[4px] flex items-center justify-center overflow-hidden transition-all duration-300
          ${isActive ? "border-2 border-[#003DFF] shadow-[0_4px_12px_rgba(0,61,255,0.15)]" : "border border-transparent"}
        `}
      >
        <div className="relative w-full h-full">
          <Image
            src={country.src}
            alt={country.name}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  );
}

function ConnectionLine({
  start,
  end,
  isDrawing,
  isUsaNg,
}: {
  start: Position;
  end: Position;
  isDrawing: boolean;
  isUsaNg: boolean;
}) {
  const sX = parseFloat(start.x);
  const sY = parseFloat(start.y);
  const eX = parseFloat(end.x);
  const eY = parseFloat(end.y);

  // Negative offset to ensure the dotted line starts/ends INSIDE the logo container
  // This removes any visual gaps since it's behind the opaque logo
  const offset = -2.5;
  const dx = eX - sX;
  const dy = eY - sY;
  const dist = Math.sqrt(dx * dx + dy * dy);
  
  const startX = sX + (dx / dist) * offset;
  const startY = sY + (dy / dist) * offset;
  const endX = eX - (dx / dist) * offset;
  const endY = eY - (dy / dist) * offset;

  // Premium Arch Logic: Always dip downwards and push slightly outward
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  const archValueY = isUsaNg ? 12 : 8;
  const archValueX = isUsaNg ? 4 : 8; // Dip slightly out for vertical links
  const controlPointX = midX + archValueX;
  const controlPointY = midY + archValueY;

  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
    >
      <motion.path
        d={`M ${startX} ${startY} Q ${controlPointX} ${controlPointY}, ${endX} ${endY}`}
        fill="transparent"
        stroke="#003DFF"
        strokeWidth="0.4"
        strokeDasharray="1.5 1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDrawing ? 0.8 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </svg>
  );
}

function Notification({
  text,
  subtext,
  x,
  y,
}: {
  text: string;
  subtext: string;
  x: string;
  y: string;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0, scale: 0.8 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 20, opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, type: "spring" }}
      className="absolute z-20 translate-x-[-50%]"
      style={{ left: x, top: y }}
    >
      <div className="bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-3 border border-[#F3F4F6] min-w-64 flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-[#EEF2FF] flex items-center justify-center shrink-0 relative">
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
