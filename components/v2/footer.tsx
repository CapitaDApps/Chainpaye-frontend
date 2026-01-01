"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import WhatsappV2Icon from "../whatsappV2-icon";
import XIcon from "../x";
import TictokIcon from "../tictok";
import DiscordIcon from "../discord";
import GmailIcon from "../gmail";


export function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gradient-to-b from-[#EFEFF1] dark:from-[#202024] dark:to-[#0B1837] to-[#CCD9F8] md:pt-20 pb-8 px-4 overflow-hidden text-[#111528] dark:text-white">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 mb-5 md:mb-24">
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
              href="#"
              className="bg-[#003DFF] dark:bg-[#7DA2FF] dark:text-[#00174F] text-white px-8 py-3 rounded-md font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Get in touch with us →
            </Link>
          </div>
        </div>

        {/* Middle: Links & Socials */}
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center mb-2 gap-4 md:gap-8 pt-4  md:dark:border-[#4C4C4C] md:dark:border-t ">
          <div className="flex gap-8 text-sm font-medium text-gray-[#5A5F73] dark:text-[#BDBFC7] flex-col md:flex-row md:border-none pt-3 md:pt-0 dark:border-[#4C4C4C] dark:border-t">
            <a href="#" className=" transition-colors">
              Solutions
            </a>
            <a href="#" className=" transition-colors">
              Developers
            </a>
            <a href="#" className=" transition-colors">
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
              <WhatsappV2Icon />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <XIcon />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <TictokIcon />
            </a>
            <a href="#" className="hover:text-purple-600 transition-colors">
              <DiscordIcon />
            </a>
            <a href="#">
              <GmailIcon />
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

          <div className="flex justify-between text-base text-[#5A5F73] dark:text-[#BDBFC7] font-medium px-2 py-4 relative z-10 flex-col md:flex-row items-start">
            <span>© 2025 Chainpaye</span>
            <span>All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
