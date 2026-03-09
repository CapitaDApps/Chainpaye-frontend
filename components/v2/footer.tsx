"use client";

import Link from "next/link";
import Image from "next/image";
import InstagramIcon from "../instagram";
import XIcon from "../x";
import TictokIcon from "../tictok";
import GmailIcon from "../gmail";

export function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#FFFFFF] to-[#CCD9F8] md:pt-20 pb-8 px-4 overflow-hidden text-[#111528]">
      <div className="container mx-auto ">
        <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 mb-5 md:pb-12 md:border-b border-[#E3E3E3]">
          <div className="lg:w-1/2">
            <h2 className="text-[25px] md:text-[40px] font-medium mb-6 leading-tight text-[#111528]">
              Unlock Borderless Payments <br className="hidden md:block" /> With
              Chainpaye
            </h2>
            <h5 className="text-[#5A5F73] font-medium text-[18px]">
              Contact us at{" "}
              <span className="text-[#003DFF]">support@chainpaye.com</span>
            </h5>
          </div>

          <div className="lg:w-1/2 flex flex-col items-start">
            <p className="text-[18px] text-[#5A5F73] mb-8">
              Join our Community to get latest News and updates about Chainpaye
            </p>
            <Link
              href="#"
              className="bg-[#003DFF] text-white px-8 py-3 rounded-md font-bold text-sm transition-colors whitespace-nowrap flex items-center gap-2"
            >
              Join our community →
            </Link>
          </div>
        </div>

        {/* Middle: Links & Socials */}
        <div className="flex flex-col-reverse md:flex-row justify-between md:items-center mb-2 gap-4 md:gap-8 pt-4  md: md: ">
          <div className="flex gap-8 text-sm font-medium text-gray-[#5A5F73] flex-col md:flex-row md:border-none pt-3 md:pt-0 w-full">
            <Link href="/products" className=" transition-colors">
              Products
            </Link>
            <a href="/businesses" className=" transition-colors">
              Businesses
            </a>
            <a href="#how-it-works" className=" transition-colors">
              How it works
            </a>
            <a href="/company" className=" transition-colors">
              Company
            </a>
            <a
              href="https://windy-pocket-e02.notion.site/chainpaye-privacy-policy-2efda843c27c805bb749fdec52e22308?pvs=74"
              className=" transition-colors"
              target="_blank"
            >
              Privacy policy
            </a>
          </div>

          <div className="flex gap-6 text-gray-600 w-full">
            <a
              href="https://www.instagram.com/chainpaye?igsh=djQxM2x4eTRmMGx0&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://x.com/chainpaye?s=21"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              <XIcon />
            </a>
            <a href="#" className="hover:text-black transition-colors">
              <TictokIcon />
            </a>
            <a
              href="mailto:support@chainpaye.com"
              className="hover:text-red-600 transition-colors"
            >
              <GmailIcon />
            </a>
          </div>
        </div>

        {/* Bottom: Giant Text & Copyright */}
        <div className="text-center relative mt-16">
          <div className="absolute left-1/2 -translate-x-1/2 top-8 z-0 w-full px-4 pointer-events-none flex justify-center">
            <Image
              src="/assets/CHAINPAYE.svg"
              alt="CHAINPAYE"
              width={1200}
              height={300}
              className="w-full h-full object-contain "
              priority
            />
          </div>

          <div className="h-24 md:h-48"></div>

          <div className="flex justify-between text-base text-[#5A5F73] font-medium px-2 py-4 relative z-10 flex-col md:flex-row items-start gap-4">
            <h3>©{new Date().getFullYear()} Chainpaye</h3>
            <h3>Chainpaye is a product of Capita Dapps Bridge Limited</h3>
            <h3>All Rights Reserved.</h3>
          </div>
        </div>
      </div>
    </footer>
  );
}
