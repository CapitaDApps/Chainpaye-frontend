"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import WhatsappIcon from "../whatsapp-icon";

export function WhatsappFeature() {
  return (
    <section>
      <div className="mx-auto container bg-[#E8EDFF]">
        <div className="flex flex-col md:flex-row max-h-[524px] items-center justify-evenly gap-12 md:gap-24">
          <div className="w-full md:w-fit flex justify-start md:justify-end">
            <div className="relative w-70 md:w-110 h-137.5 md:h-[600px] bottom-[40px]">
              <Image
                src="/assets/Group 7.png"
                alt="WhatsApp Interface"
                fill
                className="object-fill"
              />
            </div>
          </div>

          <div className="w-full md:w-fit text-left">
            <h2 className="text-[40px] md:text-5xl font-bold leading-tight text-[#111528] dark:text-white mb-6">
              Send and receive Money <br />
              instantly on <span className="font-extrabold">Whatsapp</span>
            </h2>
            <p className="text-lg text-[#5A5F73] font-medium  dark:text-zinc-400 mb-8 max-w-md leading-relaxed">
              With Chainpaye, anyone can send or receive money globally and
              withdraw to their local bank or mobile money — all inside a
              WhatsApp chat.
            </p>

            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-lg bg-[#003DFF] px-6 py-3 text-base font-bold text-white hover:bg-[#00174F]  transition-colors shadow-lg shadow-blue-500/20"
            >
              <WhatsappIcon />
              Start on WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
