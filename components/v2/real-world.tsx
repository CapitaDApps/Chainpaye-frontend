"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import clsx from "clsx";

const CARDS = [
  {
    id: "individuals",
    title: "For Individuals",
    content: (
      <>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Send and receive money instantly, no extra apps needed.
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          Pay friends, family, or split bills with Chainpaye fast, secure, and
          easy.
        </p>
      </>
    ),
  },
  {
    id: "businesses",
    title: "For Businesses",
    content: (
      <>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
          Leverage our APIs to scale your business while accepting global
          payments in USD 🇺🇸, EUR 🇪🇺, GBP 🇬🇧 — and more coming soon.
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
          Funds are automatically converted into NGN 🇳🇬, GHS 🇬🇭, or KES 🇰🇪 at
          real-time rates.
        </p>
      </>
    ),
  },
  {
    id: "freelancers",
    title: "For Freelancers & Creators",
    content: (
      <>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Generate a payment link using Chainpaye and get settled in less than a
          minute.
        </p>
        <p className="text-xs text-gray-500 leading-relaxed">
          Clients pay through a bank card or bank transfers for US 🇺🇸 while EUR
          🇪🇺 and GBP 🇬🇧 users. Bank card strictly
        </p>
      </>
    ),
  },
  {
    id: "developers",
    title: "For Developers",
    content: (
      <>
        <p className="text-xs text-gray-500 mb-4 leading-relaxed">
          Integrate payments in a few lines of code. Access full API
          documentation, webhooks, and sandbox testing to power global
          transactions securely.
        </p>
      </>
    ),
  },
];

export function RealWorld() {
  const [activeIndex, setActiveIndex] = useState(1); // Start with Businesses (index 1) or as desired

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const getCardStyle = (index: number) => {
    // Calculate relative position in circle
    const len = CARDS.length;
    const diff = (index - activeIndex + len) % len;

    // Common shadow class for all cards - strong shadow
    const shadowClass = "shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]";

    if (diff === 0) {
      // CENTER
      // Position: Lower (y+), Larger scale, Front z-index
      return clsx(
        "z-30 scale-110 translate-x-0 translate-y-8 rotate-0 opacity-100",
        "bg-white dark:bg-[#1A1A1E] border-gray-200 dark:border-gray-700",
        "w-[340px] md:w-[420px] h-[280px]", // Increased size
        shadowClass
      );
    } else if (diff === 1) {
      // RIGHT
      // Position: Higher (y-), Rotated CW, Side z-index
      return clsx(
        "z-20 scale-95 translate-x-[10%] md:translate-x-[105%] translate-y-4 -rotate-12 opacity-100",
        "bg-gray-50 dark:bg-[#151518] border-gray-100 dark:border-gray-800",
        "w-[340px] md:w-[400px] h-[250px] cursor-pointer hover:z-25",
        shadowClass
      );
    } else if (diff === len - 1) {
      // LEFT
      // Position: Higher (y-), Rotated CCW, Side z-index
      return clsx(
        "z-20 scale-95 -translate-x-[10%] md:-translate-x-[105%] translate-y-4 rotate-12 opacity-100",
        "bg-gray-50 dark:bg-[#151518] border-gray-100 dark:border-gray-800",
        "w-[340px] md:w-[400px] h-[250px] cursor-pointer hover:z-25",
        shadowClass
      );
    } else {
      // HIDDEN / BACK
      return "z-10 scale-75 opacity-0 pointer-events-none translate-y-10 w-[300px]";
    }
  };

  // Helper to allow clicking side cards to navigate
  const handleCardClick = (index: number) => {
    const len = CARDS.length;
    const diff = (index - activeIndex + len) % len;
    if (diff === 1) nextCard();
    if (diff === len - 1) prevCard();
  };

  return (
    <section className="py-24 px-4 overflow-hidden bg-[#F8F9FA] dark:bg-[#202024]">
      <div className="container mx-auto max-w-6xl text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-[#111528] dark:text-white">
          Real world application
        </h2>
        <p className="text-gray-500">
          Discover how people and businesses use Chainpaye
        </p>
      </div>

      <div className="container mx-auto max-w-7xl mb-12 relative">
        <div className="relative h-[450px] md:h-[500px] flex justify-center items-center perspective-1000">
          {CARDS.map((card, index) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={clsx(
                "absolute p-6 rounded-[32px] border transition-all duration-700 ease-in-out flex flex-col justify-start text-left",
                getCardStyle(index)
              )}
            >
              <h4 className="font-bold mb-4 text-xl md:text-2xl">
                {card.title}
              </h4>
              <div className="text-sm font-medium md:text-base text-gray-[#111528] dark:text-gray-400 leading-relaxed">
                {card.content}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center gap-4 mt-2 md:mt-4 md:mb-32">
          <button
            onClick={prevCard}
            className="w-11 h-11 rounded-full bg-[#EFEFF1] dark:bg-[#4C4C4C] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            aria-label="Previous card"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600 dark:text-white" />
          </button>
          <button
            onClick={nextCard}
            className="w-11 h-11 rounded-full bg-[#EFEFF1] dark:bg-[#4C4C4C] flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
            aria-label="Next card"
          >
            <ArrowRight className="w-6 h-6 text-gray-600 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
}
