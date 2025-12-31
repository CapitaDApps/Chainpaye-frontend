"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import WhatsappIcon from "../whatsapp-icon";
import { FadeIn } from "../animations/fade-in";

export function CryptoCashout() {
  return (
    <section className="my-52">
      <div className="px-4 pt-4 md:mx-auto container dark:bg-[#2A2A33] rounded-2xl bg-[#E8EDFF]">
        <FadeIn className="flex flex-col md:flex-row md:max-h-[524px] items-center justify-evenly  md:gap-24">
          <div className="w-full md:w-fit text-left">
            <h2 className="text-[38px] md:text-[40px] font-bold leading-tight text-[#111528] dark:text-white mb-6">
              <span className="font-extrabold">Cash out</span> crypto directly{" "}
              <br />
              from WhatsApp.
            </h2>
            <p className="text-base md:text-lg text-[#5A5F73] font-medium  dark:text-zinc-400 mb-8 max-w-md leading-relaxed">
              Send crypto, confirm once, and receive money in your Bank account
            </p>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-[#003DFF] dark:text-[#00174F] dark:bg-[#7DA2FF] px-6 py-3 text-base font-bold text-white  transition-colors shadow-lg shadow-blue-500/20"
            >
              <WhatsappIcon />
              Start on WhatsApp
            </Link>
          </div>

          <div className="w-full md:w-fit flex justify-start md:justify-end">
            <div className="relative w-70 md:w-110 h-137.5 md:h-[600px] -bottom-14 md:bottom-[40px]">
              <Image
                src="/assets/phone1.png"
                alt="Crypto Cashout Interface"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
