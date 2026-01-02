"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import clsx from "clsx";

const HIGHLIGHTED_CELLS = [20, 21, 41,42, 13, 6];

const THEMES = [
  {
    id: "purple",
    bg: "bg-[#30002]",
    cardImage: "/assets/Solaris V2.png",
    textColor: "text-[#111528]",
    subTextColor: "text-[#5A5F73]",
    gridColor: "bg-[#E6E6E6]",
    gridHighlight: "bg-[#D9D9D9]",
  },
  {
    id: "gold",
    bg: "bg-[#BB7836]",
    cardImage: "/assets/GOLD V1.png",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridColor: "bg-[#BB7836]",
    gridHighlight: "bg-[#96602B]",
  },
  {
    id: "blue",
    bg: "bg-[#0047AB]",
    cardImage: "/assets/Platinum V2.png",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridColor: "bg-[#004B9C]",
    gridHighlight: "bg-[#002D7A]",
  },
];

export function VisaCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % THEMES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const theme = THEMES[currentIndex];

  return (
    <section id="visacard" className="flex justify-center">
      <div
        className={clsx(
          "relative xl:container mx-auto p-4 md:p-16 md:rounded-2xl md:max-h-[528px] overflow-hidden transition-colors duration-700 ease-in-out  flex flex-col md:flex-row items-center justify-evenly gap-12",
          theme.bg
        )}
      >
        <div className="absolute inset-0 grid grid-cols-[repeat(20,1fr)] grid-rows-6 pointer-events-none">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className={clsx(
                "border-[0.5px] border-black/5 transition-colors duration-700",
                HIGHLIGHTED_CELLS.includes(i)
                  ? theme.gridHighlight
                  : theme.gridColor
              )}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <div
              key={theme.id}
              className="relative w-[320px] md:w-[600px] h-[200px] md:h-[400px] animate-card-enter"
            >
              <Image
                src={theme.cardImage}
                alt="Chainpaye Visa Card"
                fill
                priority
                className="object-contain"
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

            <Link
              href="/visa-cards"
              className="bg-[#003DFF] text-white px-8 py-4 rounded-xl font-bold text-base transition-all flex items-center gap-2 shadow-lg w-fit"
            >
              Request a visa card <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
