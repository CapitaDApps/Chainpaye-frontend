"use client";

import Image from "next/image";

const partners = [
  { name: "DexPay", logo: "/assets/dexpay.svg" },
  { name: "Binance", logo: "/assets/binance.svg" },
  { name: "Chase", logo: "/assets/chase.svg" },
  { name: "FCMB", logo: "/assets/fcmb.svg" },
  { name: "Base", logo: "/assets/base.svg" },
  { name: "Crossmint", logo: "/assets/crossmint.svg" },
];

export function Partners() {
  return (
    <section className="mt-10 md:mb-72 bg-white overflow-hidden">
      <div className="container mx-auto px-4 mb-8 text-center">
        <p className="text-[#5A5F73] text-sm font-medium uppercase tracking-wider">
          Backed by the best local and global Banks & Financial institutions
        </p>
      </div>

      <div className="relative flex">
        {/* First scroll group */}
        <div className="flex items-center gap-12 md:gap-24 animate-scroll whitespace-nowrap px-4">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-32 md:w-52 h-16 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Second scroll group (for seamless loop) */}
        <div
          className="flex items-center gap-12 md:gap-24 animate-scroll whitespace-nowrap px-4"
          aria-hidden="true"
        >
          {partners.map((partner, index) => (
            <div
              key={`dup-${index}`}
              className="flex-shrink-0 w-32 md:w-40 h-12 relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
