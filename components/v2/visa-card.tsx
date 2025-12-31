"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const THEMES = [
  {
    id: "purple",
    bg: "bg-[#F2F2F2]",
    cardImage: "/assets/purple.png",
    textColor: "text-[#111528]",
    subTextColor: "text-[#5A5F73]",
    gridColor: "bg-[#E5E5E5]",
    gridHighlight: "bg-[#D9D9D9]",
  },
  {
    id: "gold",
    bg: "bg-[#C68744]",
    cardImage: "/assets/gold.png",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridColor: "bg-[#B5783A]",
    gridHighlight: "bg-[#A76C30]",
  },
  {
    id: "blue",
    bg: "bg-[#0047AB]",
    cardImage: "/assets/blue.png",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridColor: "bg-[#00388F]",
    gridHighlight: "bg-[#002D7A]",
  },
];

export function VisaCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % THEMES.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const theme = THEMES[currentIndex];

  return (
    <section className="flex justify-center mb-20">
      <div
        className={clsx(
          "relative container mx-auto p-4 md:rounded-[48px] overflow-hidden transition-colors duration-700 ease-in-out  flex flex-col md:flex-row items-center justify-evenly gap-12",
          theme.bg
        )}
      >
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none">
          {Array.from({ length: 72 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "border-[0.5px] border-black/5 transition-colors duration-700",
                theme.gridColor,

                (i % 7 === 0 || i % 11 === 0 || i === 42) && theme.gridHighlight
              )}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div
              key={theme.id}
              className="relative w-[320px] md:w-[600px] h-[200px] md:h-[500px] animate-card-enter"
            >
              <Image
                src={theme.cardImage}
                alt="Chainpaye Visa Card"
                fill
                priority
              />

              <div className="absolute bottom-[0px] md:bottom-[80px] left-1/2 -translate-x-1/2 w-[60%] h-[20px] bg-black/40 blur-xl rounded-[100%] z-0"></div>
            </div>
          </div>

          <div
            className={clsx(
              "w-full md:w-1/2 transition-colors duration-700",
              theme.textColor
            )}
          >
            <h2 className="text-4xl md:text-[40px] font-bold mb-3 leading-tight">
              Spend your stablecoins like <br className="hidden md:block" />
              cash — anywhere Visa works
            </h2>
            <p
              className={clsx(
                "text-base md:text-lg mb-3 font-medium transition-colors duration-700",
                theme.subTextColor
              )}
            >
              Spend your stablecoins like cash in over 80+ countries{" "}
              <br className="hidden md:block" />
              including EUR, USD, NGN, KSH 🇬🇧 🇺🇸 🇳🇬
            </p>
            <p
              className={clsx(
                "text-lg font-bold mb-8 transition-colors duration-700",
                theme.subTextColor
              )}
            >
              No need for Offramps
            </p>

            <button className="bg-[#003DFF] text-white px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center gap-2 shadow-lg">
              Request a visa card <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
