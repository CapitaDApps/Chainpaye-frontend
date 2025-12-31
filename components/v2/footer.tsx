"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Twitter,
  Instagram,
  Linkedin,
  Disc as Discord,
  Mail,
  MessageCircle,
} from "lucide-react";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// Custom icons if not in Lucide or specific styling needed
const TicTokIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    className="h-5 w-5"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
  </svg>
);

const XIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    className="h-5 w-5"
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

export function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-[#EFEFF1] dark:from-[#202024] dark:to-[#0B1837] to-[#CCD9F8] pt-20 pb-8 px-4 overflow-hidden text-[#111528] dark:text-white">
      <div className="container mx-auto">
        {/* Top: CTA Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-24">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Unlock Borderless Payments <br /> With Chainpaye
            </h2>
          </div>

          <div className="lg:w-1/2 flex flex-col items-start">
            <p className="text-[18px] text-[#5A5F73] dark:text-[#BDBFC7] mb-8 max-w-md">
              Add seamless global and on-chain payments to your business with
              one lightweight integration — we handle compliance, settlement,
              liquidity, and infrastructure so you can focus on growth.
            </p>
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Get in touch with us →
            </Link>
          </div>
        </div>

        {/* Middle: Links & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 pt-10">
          <div className="flex gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Solutions
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Developers
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              Use cases
            </a>
            <div className="flex items-center gap-2">
              <span>Theme</span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-5 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center px-1 cursor-pointer transition-colors relative"
                aria-label="Toggle theme"
              >
                {mounted && (
                  <div
                    className={`w-3 h-3 rounded-full shadow-sm transition-transform duration-200 ${
                      theme === "dark"
                        ? "bg-white translate-x-5"
                        : "bg-orange-400 translate-x-0"
                    }`}
                  />
                )}
              </button>
            </div>
          </div>

          <div className="flex gap-6 text-gray-600 dark:text-gray-400">
            <a href="#" className="hover:text-green-600 transition-colors">
              <MessageCircle className="h-6 w-6" /> {/* WhatsApp/Chat */}
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <XIcon />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <TicTokIcon />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              <Discord className="h-6 w-6" />
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Bottom: Giant Text & Copyright */}
        <div className="text-center relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-8 z-0 w-full px-4 pointer-events-none flex justify-center">
            <Image
              src="/assets/CHAINPAYE.svg"
              alt="CHAINPAYE"
              width={1200}
              height={300}
              className="w-full h-full object-contain "
              priority
            />
          </div>

          <div className="h-24 md:h-48"></div>

          <div className="flex justify-between text-[10px] md:text-xs text-gray-500 font-medium px-2 py-4 relative z-10 ">
            <span>© 2025 Chainpaye</span>
            <span>All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
