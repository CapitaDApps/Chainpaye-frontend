"use client";

import Link from "next/link";
import Image from "next/image";

import { Menu, X } from "lucide-react";

import { useState } from "react";
import WhatsappIcon from "../whatsapp-icon";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
            href="#businesses"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            For Businesses
          </Link>
          <Link
            href="#use-cases"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Use cases
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            About
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            href="https://wa.me/message/RB4AEJEFPZE7G1"
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-900"
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
        <div className="md:hidden border-t border-zinc-200 bg-white px-4 py-6">
          <div className="flex flex-col space-y-4">
            <Link
              href="#businesses"
              className="text-base font-medium text-zinc-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              For Businesses
            </Link>
            <Link
              href="#use-cases"
              className="text-base font-medium text-zinc-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use cases
            </Link>
            <Link
              href="#about"
              className="text-base font-medium text-zinc-900"
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
