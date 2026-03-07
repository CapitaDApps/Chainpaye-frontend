"use client";

import Link from "next/link";
import Image from "next/image";

import { Menu, X } from "lucide-react";
import { useState } from "react";

import WhatsappIcon from "../whatsapp-icon";

interface NavbarProps {
  variant?: "default" | "dark";
}

export function Navbar({ variant = "default" }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDark = variant === "dark";

  return (
    <header className={`fixed top-0 z-50 w-full ${isDark ? "bg-[#0B3C6D]" : "bg-[#EFEFF1]/80 backdrop-blur-md"}`}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/chainpaye.png"
            alt="Chainpaye"
            width={140}
            height={40}
            className={`h-8 w-auto object-contain ${isDark ? "brightness-0 invert" : ""}`}
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#visacard"
            className={`text-sm font-medium ${isDark ? "text-white/80 hover:text-white" : "text-[#111528]/80 hover:text-[#111528]"}`}
          >
Products
          </Link>
          <Link
            href="/businesses"
            className={`text-sm font-medium ${isDark ? "text-white/80 hover:text-white" : "text-[#111528]/80 hover:text-[#111528]"}`}
          >
      Businesses
          </Link>
          <Link
            href="#use-cases"
            className={`text-sm font-medium ${isDark ? "text-white/80 hover:text-white" : "text-[#111528]/80 hover:text-[#111528]"}`}
          >
        How it works
          </Link>
          <Link
            href="/company"
            className={`text-sm font-medium ${isDark ? "text-white/80 hover:text-white" : "text-[#111528]/80 hover:text-[#111528]"}`}
          >
           Company
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://wa.me/message/RB4AEJEFPZE7G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex  relative items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        <button
          className={`md:hidden p-2 ${isDark ? "text-white" : "text-[#111528]"}`}
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
        <div className={`md:hidden border-t ${isDark ? "border-white/10 bg-[#0B3C6D]" : "border-black/10 bg-[#EFEFF1]"} px-4 py-6`}>
          <div className="flex flex-col space-y-4">
            <Link
              href="#visacard"
              className={`text-base font-medium ${isDark ? "text-white" : "text-[#111528]"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              VisaCards
            </Link>
            <Link
              href="/businesses"
              className={`text-base font-medium ${isDark ? "text-white" : "text-[#111528]"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Businesses
            </Link>
            <Link
              href="#use-cases"
              className={`text-base font-medium ${isDark ? "text-white" : "text-[#111528]"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Use cases
            </Link>
            <Link
              href="/company"
              className={`text-base font-medium ${isDark ? "text-white" : "text-[#111528]"}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Company
            </Link>
            <Link
              href="https://wa.link/m25oou"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
            >
              <WhatsappIcon />
              Start on WhatsApp
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
