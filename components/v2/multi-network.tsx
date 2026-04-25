"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WhatsappIcon from "../whatsapp-icon";

export function MultiNetwork() {
  return (
    <section className="px-4 mt-16 mb-16 md:max-w-[80%] mx-auto">
      <div className="container mx-auto ">
        <div className="bg-[#0C172D] rounded-[20px] p-4 md:p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between overflow-hidden relative">
          <div className="w-full md:w-[55%] z-10 text-left mb-10 md:mb-0 p-8 md:p-12 lg:p-14 rounded-[30px] bg-linear-to-l to-[#000102] from-[#0C172D]">
            <h2 className="text-white text-[18px] md:text-[22px] lg:text-[26px] font-medium leading-normal mb-8">
              <span className="text-[#9CA3AF]">Chainpaye leverages </span>
              <span className="font-bold">
                USDC on Celo, Stellar, Base, Solana, and Arbitrum{" "}
              </span>
              <span className="text-[#9CA3AF]">
                to move money across borders in seconds, not days.
              </span>
            </h2>

            <div className="space-y-3 mb-10">
              <div className="flex items-center gap-3">
                <div className="text-[#9CA3AF]">
                  <Check size={16} />
                </div>
                <p className="text-[#9CA3AF] text-sm md:text-base ">
                  Same-day settlement.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[#9CA3AF]">
                  <Check size={16} />
                </div>
                <p className="text-[#9CA3AF] text-sm md:text-base ">
                  Crypto-to-bank in &lt;27s
                </p>
              </div>
            </div>

            <Link
              href="https://wa.me/message/RB4AEJEFPZE7G1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-[15px] font-medium text-[#272935] transition-transform"
            >
              <WhatsappIcon color="#272935" />
              Start on WhatsApp
            </Link>
          </div>

          <div className="w-full md:w-[45%] flex justify-center md:justify-end relative z-10 mt-12 md:mt-0">
            <div className="relative w-full max-w-[420px] aspect-[1.3/1]">
              <Image
                src="/assets/illustration group.png"
                alt="Networks connected to USDC"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
