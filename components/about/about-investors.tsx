import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";

export function AboutInvestors() {
  return (
    <>
      <section className="py-10 px-4  text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-[40px] font-semibold text-[#111528] mb-6">
          Invest in Africa&apos;s Financial Infrastructure
        </h2>
        <p className="text-[#5A5F73] text-xl max-w-4xl mb-8">
          We&apos;re building critical financial infrastructure for Africa and
          seeking strategic partners who share our vision. Join us in creating
          the future of cross-border payments.
        </p>
        <Link
          href="mailto:business@chainpaye.com"
          className="bg-[#003DFF] text-[#FFFFFF] text-base px-8 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          Contact us <Mail className="w-4 h-4 ml-1" />
        </Link>
      </section>

      <section className="px-4 py-24">
        <div className="container mx-auto">
          <div className="relative w-full h-[643px] rounded-[30px] overflow-hidden bg-[#0A1A3B] text-white py-24 px-6 md:px-16 text-center shadow-xl">
            <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
              <Image
                src="/assets/Investor c.png"
                alt="Investment Background"
                fill
                className="object-cover object-bottom"
              />
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <h3 className="text-3xl md:text-[40px] font-medium mb-6">
                We are raising $200K for 8% Equity
              </h3>
              <p className="text-[#E5E7EB] text-base font-medium mb-10">
                Explore the vision, traction, and roadmap behind our company.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link
                  href="#"
                  className="bg-white text-[#111528] px-6 py-3 rounded-lg font-medium transition-colors hover:bg-gray-100 flex items-center gap-2"
                >
                  View Pitch Deck <ArrowUpRight className="w-4 h-4 ml-1" />
                </Link>
                <Link
                  href="mailto:investors@chainpaye.com"
                  className="text-white hover:text-gray-300 transition-colors font-medium flex items-center gap-2"
                >
                  Contact investor relations <Mail className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
