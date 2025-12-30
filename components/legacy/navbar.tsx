"use client";

import Link from "next/link";
import Image from "next/image";

import { Menu, X, Moon, Sun } from "lucide-react";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import WhatsappIcon from "../whatsapp-icon";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/chainpaye.png"
            alt="Chainpaye"
            width={140}
            height={40}
            className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#businesses"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            For Businesses
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            Use cases
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {mounted && theme === "dark" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </button>

          <Link
            href="https://wa.me/"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-900 dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-black">
          <div className="flex flex-col space-y-4">
            <Link
              href="#businesses"
              className="text-base font-medium text-zinc-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              href="#use-cases"
              className="text-base font-medium text-zinc-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use cases
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-zinc-900 dark:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <div className="pt-4 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-sm font-medium dark:text-zinc-400">
                Theme
              </span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {mounted && theme === "dark" ? (
                  <Moon className="h-5 w-5" />
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
