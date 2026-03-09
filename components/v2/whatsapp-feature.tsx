"use client";

import Image from "next/image";
import Link from "next/link";
import WhatsappIcon from "../whatsapp-icon";
import { FadeIn } from "../animations/fade-in";

export function WhatsappFeature() {
  return (
    <section>
      <div className="mx-auto px-4 pt-12  container md:bg-[#E8EDFF] md:rounded-2xl ">
        <FadeIn className="flex flex-col-reverse md:flex-row max-h-none md:max-h-[524px] items-center justify-evenly gap-12 xl:gap-24 overflow-hidden md:overflow-visible">
          <div className="w-full md:w-fit flex justify-start md:justify-end items-end h-full mt-auto relative md:bottom-[40px]">
            <div className="relative w-full max-w-[280px] md:max-w-none md:w-110 h-[400px] sm:h-[500px] md:h-[700px] md:bottom-[136px] md:mx-auto translate-y-8 md:translate-y-0">
              <Image
                src="/assets/sec-chat.png"
                alt="WhatsApp Interface"
                fill
                className="object-contain md:object-fill"
              />
            </div>
          </div>

          <div className="w-full md:w-fit text-left">
            <h2 className="text-[25px] xl:text-[40px] font-bold leading-tight text-[#111528] mb-6">
              Send and receive Money
              <br />
              across borders instantly <br /> on{" "}
              <span className="font-extrabold">Whatsapp</span>
            </h2>
            <p className="text-base md:text-lg text-[#5A5F73] font-medium  mb-8 max-w-md leading-relaxed">
              Send and receive USD, NGN globally and withdraw to your local bank
              or mobile money — all inside a WhatsApp chat.
            </p>

            <Link
              href="https://wa.me/message/RB4AEJEFPZE7G1"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#003DFF] px-6 py-3 text-base font-bold text-white transition-colors shadow-lg shadow-blue-500/20"
            >
              <WhatsappIcon />
              Start on WhatsApp
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
