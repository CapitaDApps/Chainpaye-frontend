import Link from "next/link";
import WhatsappIcon from "@/components/whatsapp-icon";
import { HeroAnimation } from "./hero-animation";

export function ProductHero() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-[25px] md:text-5xl font-medium text-[#111528] leading-tight max-w-md">
            Move money at the <br className="hidden md:block" />
            speed of a text.
          </h1>
          <p className="text-[#5A5F73] text-lg md:text-xl font-medium max-w-md">
            Instant global settlements in USD, GBP, EUR, and CAD. No bank
            delays. No 5-day waits.
          </p>
          <Link
            href="https://wa.me/message/RB4AEJEFPZE7G1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[#003DFF] px-8 py-3.5 text-base font-bold text-white transition-colors shadow-lg shadow-blue-500/10"
          >
            <WhatsappIcon />
            Start on WhatsApp
          </Link>
        </div>

        {/* Right Illustration */}
        <div className="w-full md:w-1/2 relative">
          <div className="relative w-full aspect-[4/3] bg-[#F8F9FA] rounded-[32px] overflow-hidden">
            <HeroAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
