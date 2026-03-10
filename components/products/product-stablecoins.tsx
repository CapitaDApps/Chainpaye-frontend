import Link from "next/link";
import WhatsappIcon from "@/components/whatsapp-icon";
import { StablecoinAnimation } from "@/components/animations/stablecoin-animation";
import { Phone } from "lucide-react";
import Image from "next/image";

export function ProductStablecoins() {
  return (
    <section className="pb-12 md:py-24 px-4 bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Illustration */}
        <div className="w-full md:w-1/2 border border-[#D1D5DB] rounded-xl">
          <div className="relative w-full aspect-square md:aspect-[4/3] overflow-hidden">
            <StablecoinAnimation />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] leading-tight">
            Stablecoins to Cash, <br />
            instantly
          </h2>
          <p className="text-[#5A5F73] text-lg md:text-xl font-medium max-w-md leading-relaxed">
            Convert your digital balance to Naira, Cedis, or Shillings. Straight
            to your bank account at real-time rates.
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
      </div>
    </section>
  );
}

export function ProductStablecoinsTopUp() {
  return (
    <section className="pb-12 md:py-24 px-4 bg-white">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Illustration */}
        <div className="w-full md:w-1/2 h-full ">
          <div className="relative w-full  2xl:-left-14 aspect-square md:h-[600px] overflow-hidden">
            <Image
              src="/assets/wallet.png"
              alt="wallet"
              fill
              className="object-contain  w-full h-full"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] leading-tight">
            Stablecoin OTC Top-Up
          </h2>
          <p className="text-[#5A5F73] text-lg md:text-xl font-medium max-w-md leading-relaxed">
            Large-volume stablecoin purchases for businesses and institutions.
          </p>
          <p className="text-[#5A5F73] text-lg md:text-xl font-medium max-w-md leading-relaxed">
            Transactions supported from $20K to $250K.
          </p>
          <Link
            href="https://calendly.com/business-chainpaye/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#003DFF] text-white px-8 py-3.5 rounded-lg font-medium transition-colors hover:bg-blue-700 w-full sm:w-auto"
          >
            <Phone className="w-5 h-5" />
            Book a call
          </Link>
        </div>
      </div>
    </section>
  );
}
