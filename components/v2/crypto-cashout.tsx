"use client";

import Image from "next/image";
import Link from "next/link";
import WhatsappIcon from "../whatsapp-icon";
import { FadeIn } from "../animations/fade-in";

export function CryptoCashout() {
  return (
    <section className="mb-20 md:mt-52">
      <div className="px-4 pt-16 mx-auto container md:rounded-2xl md:bg-[#E8EDFF]">
        <FadeIn className="flex flex-col md:flex-row md:max-h-[524px] items-center justify-evenly  xl:gap-24">
          <div className="w-full md:w-fit text-left">
            <h2 className="text-[25px] xl:text-[40px] font-bold leading-tight text-[#111528] mb-6">
              <span className="font-extrabold">Cash out</span> crypto directly{" "}
              <br />
              from WhatsApp.
            </h2>
            <p className="text-base md:text-lg text-[#5A5F73] font-medium  mb-8 max-w-md leading-relaxed">
              Send USDT or USDC on EVM and Solana networks, confirm once,
              receive money in your bank account under 50 secs.
            </p>
            <Link
              href="https://wa.me/message/RB4AEJEFPZE7G1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#003DFF] px-6 py-3 text-base font-bold text-white  transition-colors shadow-lg shadow-blue-500/20"
            >
              <WhatsappIcon />
              Start on WhatsApp
            </Link>
          </div>

          <div className="w-full md:w-fit flex justify-start md:justify-end h-125 md:h-auto">
            <div className="relative w-70 md:w-110 h-137.5 md:h-[700px] md:bottom-[88px]">
              <Image
                src="/assets/third-chat.png"
                alt="Crypto Cashout Interface"
                fill
                className="object-contain  xl:object-fill"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
