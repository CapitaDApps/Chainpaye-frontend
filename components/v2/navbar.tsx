"use client";

import Link from "next/link";
import Image from "next/image";

import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";

import WhatsappIcon from "../whatsapp-icon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full bg-[#EFEFF1]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/chainpaye.png"
            alt="Chainpaye"
            width={140}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#visacard"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528]"
          >
            VisaCards
          </Link>
          <Link
            href="#off-ramp"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528]"
          >
            Off-ramp
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528]"
          >
            Use cases
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-[#111528]/80 hover:text-[#111528]"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://wa.me/message/RB4AEJEFPZE7G1"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-medium text-[#FFFFFF] transition-colors"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-[#111528]"
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
        <div className="md:hidden border-t border-black/10 bg-[#EFEFF1] px-4 py-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="#visacard"
              className="text-base font-medium text-[#111528]"
              onClick={() => setMobileMenuOpen(false)}
            >
              VisaCards
            </Link>
            <Link
              href="#off-ramp"
              className="text-base font-medium text-[#111528]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Off-ramp
            </Link>
            <Link
              href="#use-cases"
              className="text-base font-medium text-[#111528]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use cases
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-[#111528]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
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
