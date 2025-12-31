"use client";

import Link from "next/link";
import Image from "next/image";

import { Menu, X, Moon, Sun, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import WhatsappIcon from "../whatsapp-icon";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#EFEFF1]/80 backdrop-blur-md dark:bg-[#202024]/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/v2" className="flex items-center gap-2">
          <Image
            src="/assets/chainpaye.png"
            alt="Chainpaye"
            width={140}
            height={40}
            className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#businesses"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528] dark:text-white/80 dark:hover:text-white"
          >
            For Businesses
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528] dark:text-white/80 dark:hover:text-white"
          >
            Use cases
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528] dark:text-white/80 dark:hover:text-white"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <Link
            href="#"
            className="flex items-center gap-2 rounded-lg bg-[#003DFF] dark:text-[#00174F] dark:bg-[#7DA2FF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[#111528] dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/10 bg-[#EFEFF1] px-4 py-6 dark:border-white/10 dark:bg-[#202024]">
          <div className="flex flex-col space-y-4">
            <Link
              href="#businesses"
              className="text-base font-medium text-[#111528] dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              href="#use-cases"
              className="text-base font-medium text-[#111528] dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use cases
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-[#111528] dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
