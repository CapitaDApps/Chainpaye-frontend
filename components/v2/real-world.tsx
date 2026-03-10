"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const CARDS = [
  {
    id: "families",
    title: "For Families",
    titleColor: "text-[#3D5AFE]",
    bgColor: "bg-[#D9EBED]",
    image: "/assets/family.svg",
    description: "Receive remittances instantly.",
  },
  {
    id: "freelancers",
    title: "For Freelancers & Creators",
    titleColor: "text-[#189A00]",
    bgColor: "bg-[#F0E6CB]",
    image: "/assets/freelancer.svg",
    description:
      "Generate a payment link using Chainpaye and get settled in less than a minute.",
  },
  {
    id: "businesses",
    title: "For Businesses",
    titleColor: "text-[#FF4421]",
    bgColor: "bg-[#FFEFE2]",
    image: "/assets/business.svg",
    description: "Collect international payments with payment links.",
  },
  {
    id: "crypto",
    title: "Crypto Holders",
    titleColor: "text-[#189A00]",
    bgColor: "bg-[#F0F9F9]", // Mint
    image: "/assets/crypto.svg",
    description: "Off-ramp safely into local currency.",
  },
];

export function RealWorld() {
  const [activeIndex, setActiveIndex] = useState(1);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const getCardStyle = (index: number) => {
    const len = CARDS.length;
    const diff = (index - activeIndex + len) % len;

    const shadowClass = "shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]";

    if (diff === 0) {
      return clsx(
        "z-30 md:scale-90 scale-70 translate-x-0 translate-y-4 rotate-0 opacity-100",
        "w-[340px] md:w-[420px] h-[450px] shadow-2xl",
        shadowClass,
      );
    } else if (diff === 1) {
      return clsx(
        "z-20 md:scale-80 scale-60 translate-x-[40%] md:translate-x-[75%] translate-y-0 -rotate-6 opacity-80",
        "w-[340px] md:w-[400px] h-[420px] cursor-pointer hover:z-25",
        shadowClass,
      );
    } else if (diff === len - 1) {
      return clsx(
        "z-20 md:scale-80 scale-60 -translate-x-[40%] md:-translate-x-[75%] translate-y-0 rotate-6 opacity-80",
        "w-[340px] md:w-[400px] h-[420px] cursor-pointer hover:z-25",
        shadowClass,
      );
    } else {
      // The 4th card (opposite of active)
      return "z-10 scale-50 opacity-0 pointer-events-none translate-y-20 w-[300px]";
    }
  };

  const handleCardClick = (index: number) => {
    const len = CARDS.length;
    const diff = (index - activeIndex + len) % len;
    if (diff === 1) nextCard();
    if (diff === len - 1) prevCard();
  };

  return (
    <section className="my-20 md:mt-0 md:pt-24 md:pb-12 px-4 overflow-hidden bg-white">
      <div className="container mx-auto max-w-6xl text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-[#D1D5DB] bg-white text-[#5A5F73] text-lg font-medium shadow-sm mb-6 uppercase tracking-wider">
          USE CASES
        </div>
        <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528]">
          WHO IT&apos;S FOR
        </h2>
      </div>

      <div className="container mx-auto max-w-7xl relative">
        <div className="relative h-[400px] md:h-[500px] flex justify-center items-center">
          {CARDS.map((card, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={clsx(
                  "absolute p-8 rounded-[23px] border transition-all duration-700 ease-in-out flex flex-col items-center text-center justify-between",
                  card.bgColor,
                  `${index === 1 ? "border-[#D79D00]" : index === 2 ? "border-[#F36D00]" : index === 3 ? "border-[#15A0AF]" : "border-[#15A0AF]"}`,
                  getCardStyle(index),
                )}
              >
                <div className="relative w-fit aspect-square flex items-center justify-center mb-6">
                  <div
                    className={clsx(
                      "relative w-64 h-64 transition-transform duration-700",
                      isActive ? "rotate-0 scale-100" : "scale-90 opacity-60",
                    )}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <h4
                    className={clsx(
                      "font-medium mb-3 text-base",
                      card.titleColor,
                    )}
                  >
                    {card.title}
                  </h4>
                  <p className="text-sm font-medium text-[#5A5F73] leading-snug">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevCard}
            className={`${activeIndex === 0 ? "opacity-50" : ""} w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#E3E3E3] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm`}
            aria-label="Previous card"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextCard}
            className={`${activeIndex === CARDS.length - 1 ? "opacity-50" : ""} w-8 h-8 md:w-12 md:h-12 rounded-full bg-[#E3E3E3] flex items-center justify-center hover:bg-gray-200 transition-colors shadow-sm`}
            aria-label="Next card"
          >
            <ArrowRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
