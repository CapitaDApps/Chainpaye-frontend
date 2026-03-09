"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const COINS = [
  {
    src: "/assets/Download Bitcoin ,BTC Glass Crypto Coin 3D Illustration 2.svg",
    alt: "BTC",
    x: "10%",
    y: "60%",
    rotate: 10,
    size: 50,
  },
  {
    src: "/assets/Download Binance Coin ,BNB Glass Crypto Coin 3D Illustration 2.svg",
    alt: "BNB",
    x: "10%",
    y: "30%",
    rotate: -15,
    size: 60,
  },
  {
    src: "/assets/HOME 2.svg",
    alt: "USDC",
    x: "26%",
    y: "5%",
    rotate: -5,
    size: 70,
  },
  {
    src: "/assets/Download the Tether ,USDT Glass Crypto Coin 3D Illustration 24093409 royalty free PNG from Vecteezy for your project and explore over a million other illustrations, icons and clipart graphics! 2.svg",
    alt: "USDT",
    x: "50%",
    y: "-4%",
    rotate: 15,
    size: 80,
  },
  {
    src: "/assets/Download Solana ,SOL Glass Crypto Coin 3D Illustration 2.svg",
    alt: "SOL",
    x: "80%",
    y: "20%",
    rotate: -10,
    size: 70,
  },
  {
    src: "/assets/eth 2.svg",
    alt: "ETH",
    x: "85%",
    y: "60%",
    rotate: 20,
    size: 55,
  },
];

interface StablecoinAnimationProps {
  className?: string;
  hideLady?: boolean;
  imageUrl?: string;
  isfull?: boolean;
}

export function StablecoinAnimation({
  className,
  hideLady = false,
  imageUrl = "/assets/Retail.png",
  isfull = true,
}: StablecoinAnimationProps) {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev - 1);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const coinVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0,
      y: 40,
      rotate: 0,
    },
    animate: (rotate: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      rotate: rotate,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12,
        duration: 0.8,
      },
    }),
  };

  const groupMotionVariants: Variants = {
    initial: { y: 0, opacity: 1 },
    animate: {
      y: [0, 0, -40, -200],
      opacity: [1, 1, 1, 0],
      transition: {
        duration: 5,
        times: [0, 0.7, 0.85, 1],
        ease: "easeInOut",
        delay: 6.5,
        staggerChildren: 1.0,
      },
    },
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden flex items-center justify-center bg-transparent ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={cycle}
          variants={groupMotionVariants}
          initial="initial"
          animate="animate"
          className={`absolute inset-0 z-10 ${isfull ? "md:top-7" : ""}`}
        >
          {COINS.map((coin, index) => (
            <motion.div
              key={index}
              custom={coin.rotate}
              variants={coinVariants}
              className="absolute overflow-hidden rounded-full"
              style={{
                left: coin.x,
                top: coin.y,
                width: coin.size,
                height: coin.size,
              }}
            >
              <div
                className={`relative ${isfull ? "w-1/2 md:w-full" : "w-1/2"} h-full bg-transparent`}
              >
                <Image
                  src={coin.src}
                  alt={coin.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {!hideLady && (
        <div className="relative w-full h-full p-12 bg-transparent pointer-events-none">
          <Image
            src={imageUrl}
            alt="Stablecoins to Cash Illustration"
            fill
            className="object-contain"
            priority
          />
        </div>
      )}
    </div>
  );
}
