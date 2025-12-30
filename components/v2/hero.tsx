"use client";

import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
import WhatsappIcon from "../whatsapp-icon";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center pt-32 pb-16 px-4 overflow-hidden  dark:bg-[#202024]">
      <div className="absolute inset-0 z-0 opacity-40 mt-60 dark:opacity-50 pointer-events-none flex items-center justify-center">
        <div className="relative w-[1200px] h-[800px]">
          <Image
            src="/assets/world-map.png"
            alt="World Map"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-[#111528] dark:text-white md:text-6xl lg:text-7xl">
          Pay, Send and Receive <br />
          Money globally as simple as a chat.
        </h1>

        <p className="mb-8 text-xl font-medium text-[#5A5F73] dark:text-white/70 md:text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
          Send and receive money worldwide 🇬🇧🇺🇸🇳🇬 — instantly on WhatsApp
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] hover:bg-[#00174F] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-[1000px] h-[600px] md:h-[800px]">
          <div className="absolute left-1/2 top-4 -translate-x-1/2 w-[300px] md:w-[350px] h-[600px] md:h-[700px] z-20">
            <Image
              src="/assets/phone1.png"
              alt="Chainpaye App Interface"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="hidden lg:flex absolute top-[45%] left-0 xl:-left-[10%] z-30 flex-col items-start gap-0 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] transform text-center">
              Sent! 🚀
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40">
              <Image
                src="/assets/us.png"
                alt="US"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-normal text-xl text-[#3D3D3D] dark:text-white">
                -$25,000
              </span>
            </div>
            <div className="w-10 h-10 rounded-full -ml-2 shadow-lg overflow-hidden relative mt-4">
              <Image
                src="/assets/user.png"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="hidden lg:flex absolute top-[30%] right-0 xl:-right-[10%] z-30 flex-col items-start gap-0 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] transform text-center">
              Received, Chris 👌
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40">
              <Image
                src="/assets/ng.png"
                alt="NG"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-normal text-xl text-[#3D3D3D] dark:text-white">
                ₦35,000,000
              </span>
            </div>
            <div className="w-10 h-10 rounded-full -ml-2 shadow-lg overflow-hidden relative mt-4">
              <Image
                src="/assets/user2.png"
                alt="User Avatar"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <button className="absolute top-[0%] right-0 md:-right-[15%] bg-[#003DFF] hover:bg-[#00174F] text-white p-3 rounded-full shadow-xl transition-transform hover:scale-110 z-30">
            <HelpCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
