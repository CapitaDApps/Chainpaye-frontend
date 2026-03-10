import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export function Investors() {
  return (
    <section className="px-4 md:py-24 py-6 pb-10">
      <div className="container mx-auto">
        <div className="relative w-full h-[643px] rounded-[24px] overflow-hidden bg-[#0A1A3B] text-white py-24 px-6 md:px-16 text-center shadow-xl">
          <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
            <Image
              src="/assets/Investor c.png"
              alt="Investment Background"
              fill
              className="object-cover object-bottom-left md:object-bottom"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl md:text-[40px] font-medium mb-6">
              We are raising $200K for 8% Equity
            </h3>
            <p className="text-[#E5E7EB] text-base font-medium mb-10">
              Explore the vision, traction, and roadmap behind our company.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link
                href="https://drive.google.com/file/d/1J55IP9IlpSsA5EYiX7tEq42OXfLKslL7/view"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-[#111528] px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100 flex items-center gap-2"
              >
                View Pitch Deck <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
              <Link
                href="mailto:Business@chainpaye.com"
                className="text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-2"
              >
                Contact investor relations <Mail className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
