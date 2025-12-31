"use client";

import Link from "next/link";
import Image from "next/image";
import { HelpCircle } from "lucide-react";
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
    }, 1300); // Disappear after 1.3 sec

    const switchTimeout = setTimeout(() => {
      setIndex((prev) => (prev + 1) % WORDS.length);
      setFadeProp("opacity-0 translate-y-8"); // Start from bottom

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
    <section className="mb-10 relative flex min-h-screen flex-col items-center pt-32 pb-16 px-4 overflow-hidden dark:bg-[#202024]">
      <div className="absolute top-20 inset-0 z-0 opacity-40 mt-60 dark:opacity-50 pointer-events-none flex items-center justify-center">
        <div className="relative w-[1200px] h-[600px]">
          <Image
            src="/assets/world-map.png"
            alt="World Map"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>

      <div className="container relative z-10 mx-auto text-center">
        <h1 className="mb-6 text-4xl font-semibold leading-tight tracking-tight text-[#111528] dark:text-white">
          Pay, Send and Receive <br />
          Money{" "}
          <span className="relative inline-flex justify-center w-[150px]">
            <span
              className={`text-[#003DFF] absolute transition-all duration-300 ease-out ${fadeProp}`}
            >
              {WORDS[index]}
            </span>
            <span className="opacity-0">globally</span>
          </span>{" "}
          as simple as a chat.
        </h1>

        <p className="mb-8 text-xl font-medium text-[#5A5F73] dark:text-[#BDBFC7] md:text-lg max-w-2xl mx-auto flex items-center justify-center gap-2">
          Send and receive money worldwide 🇬🇧🇺🇸🇳🇬 — instantly on WhatsApp
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-16">
          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg bg-[#003DFF] dark:text-[#00174F] dark:bg-[#7DA2FF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        <FadeIn
          delay={0.2}
          className="relative mx-auto w-full max-w-[1000px] h-[500px] sm:h-[600px] md:h-[800px]"
        >
          <div className="absolute left-1/2 top-0 sm:top-4 -translate-x-1/2 w-[280px] sm:w-[300px] md:w-[350px] h-[500px] sm:h-[600px] md:h-[700px] z-20">
            <Image
              src="/assets/phone1.png"
              alt="Chainpaye App Interface"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>

          <div className="absolute top-[40%] -left-8 sm:left-0 lg:-left-[10%] scale-[0.6] sm:scale-100 z-30 flex flex-col items-start gap-0 animate-in fade-in slide-in-from-left-4 duration-1000">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] dark:text-[#E8EDFF] transform text-center">
              Sent! 🚀
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40 bg-white dark:bg-[#2A2A33]">
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

          <div className="absolute top-[30%] -right-16 sm:right-0 lg:-right-[10%] scale-[0.6] sm:scale-100 z-30 flex flex-col items-start gap-0 animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
            <div className=" rounded-full text-sm  font-normal text-[#00174F] dark:text-[#E8EDFF] transform text-center">
              Received, Chris 👌
            </div>
            <div className="p-3 rounded-xl shadow-xl flex items-center gap-3 min-w-40 bg-white dark:bg-[#2A2A33]">
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

          <button className="fixed bottom-10 right-6 md:right-10 bg-[#003DFF] hover:bg-[#00174F] text-white p-3 rounded-full shadow-xl transition-transform hover:scale-110 z-50">
            <HelpCircle className="h-6 w-6" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
