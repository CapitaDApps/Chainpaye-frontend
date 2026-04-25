"use client";

import Image from "next/image";

export function StellarBanner() {
  return (
    <section className="relative w-full bg-[#0C172D] overflow-hidden py-16 md:py-24">
      {/* Glow effect at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-1 bg-white shadow-[0_0_120px_60px_rgba(255,255,255,0.15)] opacity-60 blur-3xl rounded-full z-0"></div>

      {/* Background Stellar logos */}
      <div className="absolute top-1/2 -translate-y-1/2 sm:left-10 -left-20 md:-left-20 lg:left-20 w-64 h-64 md:w-[400px] md:h-[400px] opacity-20 pointer-events-none z-0">
        <Image
          src="/assets/Gemini_Generated_Image_pu2w5hpu2w5hpu2w 2.svg"
          alt="Stellar Background Left"
          fill
          className="object-contain"
        />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 -right-20 sm:right-10 md:-right-10 lg:right-20 w-64 h-64 md:w-[400px] md:h-[400px] opacity-20 pointer-events-none z-0">
        <Image
          src="/assets/Gemini_Generated_Image_pu2w5hpu2w5hpu2w 2.svg"
          alt="Stellar Background Right"
          fill
          className="object-contain"
        />
      </div>

      <div className="container mx-auto px-4 flex flex-col items-center justify-center relative z-10 min-h-[250px] bg-black/10 ">
        <div className="relative w-full max-w-[550px] md:max-w-[900px] aspect-[4/1] mb-6 md:mb-8">
          <Image
            src="/assets/Group 1000004469.png"
            alt="Tokens"
            fill
            className="object-cover"
          />
        </div>
        <h2 className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-bold text-center leading-[1.4]">
          Stellar
          <span className="font-bold whitespace-pre"> (USDC & EURC) </span>is
          now <br /> Live on Chainpaye
        </h2>
      </div>
    </section>
  );
}
