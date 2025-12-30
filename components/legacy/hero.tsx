"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Bell,
  Plug,
  MessageCircle,
  HelpCircle,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-24 pb-12 px-4 md:pt-32">
      {/* Background patterned map placeholder - kept for subtle texture behind everything if needed, or remove if map is enough. 
          The design shows a clean background with the map below. I'll keep the subtle grid/radial for texture.
      */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"></div>

      <div className="absolute inset-0 -z-20 bg-gradient-to-tr from-blue-50 to-white dark:from-zinc-900 dark:to-black opacity-40"></div>

      {/* Floating Cards Container - Pointer events allowed on cards, pass through on container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10 max-w-7xl mx-auto hidden lg:block">
        {/* Left Card - API Integration */}
        <div className="absolute top-[55%] left-[5%] transform -translate-y-1/2 pointer-events-auto">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-[260px] hover:scale-105 transition-transform duration-300 -rotate-3 hover:rotate-0 border border-zinc-100 dark:border-zinc-700">
            <div className="mb-4">
              <Plug className="h-8 w-8 text-zinc-900 dark:text-white" />
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Connect your platform with our API and start accepting global
              payments in minutes.
            </p>
          </div>
        </div>

        {/* Right Card - WhatsApp Integration */}
        <div className="absolute top-[55%] right-[5%] transform -translate-y-1/2 pointer-events-auto">
          <div className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl max-w-[260px] hover:scale-105 transition-transform duration-300 rotate-3 hover:rotate-0 border border-zinc-100 dark:border-zinc-700 relative">
            <div className="mb-4">
              <div className="h-8 w-8 bg-zinc-900 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white fill-current" />
              </div>
            </div>
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-relaxed">
              Send and receive payments directly inside WhatsApp – fast,
              effortless, and built-in
            </p>
            {/* Blue Help Icon Decoration */}
            <div className="absolute -right-12 top-1/2 rounded-full bg-blue-600 p-2 text-white shadow-lg animate-bounce">
              <HelpCircle className="h-6 w-6" />
            </div>
          </div>
        </div>
      </div>

      <div className="container relative mx-auto text-center z-10 max-w-4xl mt-12 lg:mt-0">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-[#111528] dark:text-white md:text-7xl">
          Empowering businesses <br /> and individuals to collect <br />
     payments globally
        </h1>
        <p className="mb-8 text-lg text-[#5A5F73] dark:text-zinc-400 md:text-xl max-w-2xl mx-auto">
          We empower individuals and ambitious businesses to collect payments
          globally without complexity.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/start-individuals"
            className="rounded-full bg-blue-600 px-8 py-4 text-base font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Start on WhatsApp
          </Link>
          {/* Removed secondary button to match screenshot design which emphasizes the WhatsApp action */}
        </div>
      </div>

      {/* Map Animation Section */}
      <div className="relative mt-8 w-full max-w-7xl mx-auto h-[400px] md:h-150 pointer-events-none select-none">
        <WorldMapAnimation />
      </div>
    </section>
  );
}

function WorldMapAnimation() {
  const [activeRoute, setActiveRoute] = useState<"usa-ng" | "uk-ng">("uk-ng");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRoute((prev) => (prev === "uk-ng" ? "usa-ng" : "uk-ng"));
    }, 4000); // Switch every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-100 dark:opacity-80">
        <Image
          src="/assets/world-map.png"
          alt="World Map"
          fill
          className="object-fill"
          priority
        />
      </div>

      {/* Animation Overlay Container */}
      <div className="relative w-full h-full max-w-[900px] max-h-[450px]">
        {/* Locations */}
        {/* USA */}
        <div className="absolute top-[22%] -left-[12%] w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-zinc-900 shadow-lg p-2 md:p-3 flex items-center justify-center z-10 transition-transform hover:scale-110">
          <Image
            src="/assets/us.png"
            alt="USA"
            width={32}
            height={32}
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* UK */}
        <div className="absolute top-[18%] left-[53%] w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-zinc-900 shadow-lg p-2 md:p-3 flex items-center justify-center z-10 transition-transform hover:scale-110">
          <Image
            src="/assets/uk.png"
            alt="UK"
            width={32}
            height={32}
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Nigeria */}
        <div className="absolute top-[62%] left-[46%] w-10 h-10 md:w-14 md:h-14 bg-white dark:bg-zinc-900 shadow-lg p-2 md:p-3 flex items-center justify-center z-10 transition-transform hover:scale-110">
          <Image
            src="/assets/ng.png"
            alt="Nigeria"
            width={32}
            height={32}
            className="w-full h-full object-contain rounded-full"
          />
        </div>

        {/* Notification Popup near Nigeria */}
        {/* 
                Position: Beside Nigeria flag, distance away.
                Nigeria is at left-46%, top-62%. 
                Placed at left-54%, top-60%.
            */}
        <div
          className={`absolute top-[60%] left-[54%] z-20 transition-all duration-500 ${
            activeRoute
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-4 flex items-start gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 whitespace-nowrap min-w-max">
            {/* Icon Box */}
            <div className="h-10 w-10 rounded-xl bg-zinc-100 dark:bg-zinc-700 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 border border-white dark:border-zinc-800"></span>
              </span>
            </div>
            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1 gap-4">
                <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
                  Payment Received
                </h4>
                <span className="text-xs text-zinc-400">Just now</span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-tight">
                {activeRoute === "usa-ng"
                  ? "$50 received from John Smith successfully"
                  : "£50 received from Amanda White successfully"}
              </p>
            </div>
          </div>
        </div>

        {/* SVG Lines */}
        <Paths activeRoute={activeRoute} />
      </div>
    </div>
  );
}

function Paths({ activeRoute }: { activeRoute: "usa-ng" | "uk-ng" }) {
  // Coords mapping:
  // Container Aspect: ~900x450 => 2:1
  // SVG ViewBox: 1000x500

  // USA Flag Center: ~ (-80, 110)
  // UK Flag Center: ~ (530, 90)
  // Nigeria Flag Center: ~ (460, 310)

  // Adjusting curves to look natural "entering" the flag.
  // Basically, we want the line to arrive at the destination (Nigeria) pointing somewhat towards it from the top/side.

  return (
    <svg
      viewBox="0 0 1000 500"
      className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
    >
      {/* USA -> Nigeria */}
      <path
        d="M -50,150 Q 250,50 460,300"
        fill="none"
        stroke="#003DFF"
        strokeWidth="3"
        strokeDasharray="8 8"
        strokeLinecap="round"
        className={`transition-all duration-1000 ${
          activeRoute === "usa-ng" ? "opacity-100 path-draw" : "opacity-0"
        }`}
      />
      {/* UK -> Nigeria */}
      <path
        d="M 570,110 Q 530,220 470,300"
        fill="none"
        stroke="#003DFF"
        strokeWidth="3"
        strokeDasharray="8 8"
        strokeLinecap="round"
        className={`transition-all duration-1000 ${
          activeRoute === "uk-ng" ? "opacity-100 path-draw" : "opacity-0"
        }`}
      />
    </svg>
  );
}
