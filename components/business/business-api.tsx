"use client";

import { Braces, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedApiUi } from "../animations/animated-api-ui";
import Settings from "../settings";
import Clock from "../clock";

export function BusinessApi() {
  return (
    <section className="overflow-hidden">
      <div className="container mx-auto">
        <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] mb-12 max-w-md hidden">
          Get ready to scale with our payment APIs
        </h2>

        <div className="bg-[#E8EDFF] md:h-[600px] md:rounded-2xl flex flex-col md:flex-row items-center justify-between p-8 md:p-16 gap-12 md:gap-20">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528]  max-w-md md:hidden">
            Get ready to scale with our payment APIs
          </h2>
          {/* Left Side: Features list */}
          <div className="w-full md:w-5/12 space-y-8">
            <div className="flex items-center gap-4">
              <Settings />
              <span className="text-[#5A5F73] font-medium text-lg md:text-xl ">
                Quick setup, easy integration
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Braces className="w-6 h-6 text-[#10B981]" />
              <span className="text-[#5A5F73] font-medium text-lg md:text-xl ">
                Flexible APIs for any payment use case
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Clock />
              {/* <Clock className="w-6 h-6 text-[#F59E0B]" /> */}
              <span className="text-[#5A5F73] font-medium md:text-xl text-lg">
                Production-ready in under 30 minutes
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="https://wa.me/message/RB4AEJEFPZE7G1"
                className="flex w-fit items-center gap-1 text-base bg-[#003DFF] text-white px-8 py-3.5 rounded-lg font-medium transition-colors hover:bg-blue-700"
              >
                Get Started <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          {/* Right Side: Animated API UI */}
          <div className="w-[500px] px-20">
            <div className="bg-[#F5F7FA] rounded-lg h-[300px] md:h-[313px] max-w-[500px] relative overflow-hidden flex flex-col justify-center items-center p-6">
              <div className="relative w-full max-w-md h-44 flex flex-col justify-center items-center">
                <AnimatedApiUi />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
