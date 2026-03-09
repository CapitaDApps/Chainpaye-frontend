"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import WhatsappIcon from "../whatsapp-icon";
import { useState, useEffect } from "react";
import { FadeIn } from "../animations/fade-in";

const WORDS = ["securely", "globally", "instantly"];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [fadeProp, setFadeProp] = useState("opacity-100 translate-y-0");

  useEffect(() => {
    const fadeOutTimeout = setTimeout(() => {
      setFadeProp("opacity-0 translate-y-4");
    }, 1300);

    const switchTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
      setFadeProp("opacity-0 translate-y-8");

      // Small delay to allow render then animate in
      setTimeout(() => {
        setFadeProp("opacity-100 translate-y-0");
      }, 50);
    }, 2000);

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(switchTimeout);
    };
  }, [index]);

  return (
    <section className="relative flex min-h-screen flex-col items-center pt-32  px-4 overflow-hidden">
      <div className="absolute top-72 md:top-25 inset-0 z-0 opacity-40 mt-60 pointer-events-none flex items-center justify-center">
        <div className="relative w-[1200px] h-[600px]">
          <Image
            src="/assets/world-map.png"
            alt="World Map"
            fill
            className="object-cover md:rounded-2xl"
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-[#111528]">
          Pay, Send and Receive Money <br />
          locally & globally
          {/* <span className="relative inline-flex justify-center w-[150px]">
            <span
              className={`text-[#003DFF] absolute transition-all duration-300 ease-out ${fadeProp}`}
            >
              {WORDS[index]}
            </span>
            <span className="opacity-0">globally</span>
          </span>{" "}
          as simple as a chat. */}
        </h1>

        <p className="mb-8 text-xl font-medium text-[#5A5F73] md:text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
          Hold USD, GBP, EUR, CAD,BRL 🇬🇧🇺🇸🇳🇬 🇨🇦 and Stablecoins. Send, receive,
          and spend via the app you already love: WhatsApp
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16 relative z-30">
          <Link
            href="https://wa.me/message/RB4AEJEFPZE7G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
          <Link
            href="#how-it-works"
            className="flex items-center gap-2 rounded-lg text-[#3758F9] px-8 py-3.5 text-base font-medium border border-[#3758F9] transition-colors"
          >
            <ArrowDown />
            See How It Works
          </Link>
        </div>

        <FadeIn
          delay={0.2}
          className="relative mx-auto w-full max-w-[1000px] h-[500px] sm:h-[600px] md:h-[800px]"
        >
          <div className="absolute left-1/2 top-0 sm:top-4 xl:-top-14 -translate-x-1/2 w-[280px] sm:w-[300px] md:w-[350px] h-[500px] sm:h-[600px] md:h-[800px] z-20">
            <Image
              src="/assets/main-chat.png"
              alt="Chainpaye App Interface"
              fill
              className="object-contain "
              priority
            />
          </div>

          <div className="absolute top-[40%] -left-8 sm:left-0 lg:-left-[10%] scale-[0.6] sm:scale-100 z-30 flex flex-col items-start gap-0 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] transform text-center">
              Sent! 🚀
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40 bg-white">
              <Image
                src="/assets/us.png"
                alt="US"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-normal text-xl text-[#3D3D3D]">
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

          <div className="absolute top-[30%] -right-16 sm:right-0 lg:-right-[10%] scale-[0.6] sm:scale-100 z-30 flex flex-col items-start gap-0 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] transform text-center">
              Received, Chris 👌
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40 bg-white">
              <Image
                src="/assets/ng.png"
                alt="NG"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="font-normal text-xl text-[#3D3D3D]">
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
        </FadeIn>
      </div>
    </section>
  );
}
