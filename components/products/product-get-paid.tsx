import Image from "next/image";
import Link from "next/link";
import WhatsappIcon from "@/components/whatsapp-icon";

export function ProductGetPaid() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
        {/* Left Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] leading-tight">
            Get paid from anywhere.
          </h2>
          <p className="text-[#5A5F73] text-lg md:text-xl font-medium max-w-md leading-relaxed">
            One link to collect USD or Digital Dollars. Perfect for freelancers,
            vendors, and family abroad.
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

        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-square md:aspect-[4/3] bg-[#FDEBD3] rounded-[14px] md:rounded-[32px] overflow-hidden">
            {/* Lady Avatar positioned to the right */}
            <div className="absolute right-0 bottom-0 w-[80%] h-[90%] md:w-[75%] md:h-[95%]">
              <Image
                src="/assets/lady-avatar.png"
                alt="Get Paid from Anywhere Illustration"
                fill
                className="object-contain object-bottom-right"
              />
            </div>

            {/* SVG Chat Bubbles - Staggered on the left */}
            {/* Top Bubble */}
            <div className="absolute top-[10%] left-[10%] w-[45%] md:w-[40%] aspect-2/1">
              <Image
                src="/assets/up.svg"
                alt="Payment link"
                fill
                className="object-contain object-left"
              />
            </div>

            {/* Middle Bubble - Furthest left */}
            <div className="absolute top-[35%] left-[5%] w-[45%] md:w-[40%] aspect-2/1">
              <Image
                src="/assets/middle.svg"
                alt="Payment link generated"
                fill
                className="object-contain object-left"
              />
            </div>

            {/* Bottom Bubble */}
            <div className="absolute bottom-[5%] left-[5%] w-[55%] md:w-[50%] aspect-2/1">
              <Image
                src="/assets/currencies.png"
                alt="GBP Received"
                fill
                className="object-contain object-left"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
