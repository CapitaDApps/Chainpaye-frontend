"use client";

import Link from "next/link";

export function RealWorld() {
  return (
    <section className="py-24 px-4 overflow-hidden bg-[#F8F9FA] dark:bg-[#202024]">
      <div className="container mx-auto max-w-6xl text-center mb-16">
        <h2 className="text-3xl font-bold mb-4 text-[#111528] dark:text-white">
          Real world application
        </h2>
        <p className="text-gray-500">
          Discover how people and businesses use Chainpaye
        </p>
      </div>

      <div className="container mx-auto max-w-5xl mb-32">
        <div className="relative h-[500px] md:h-[400px] flex justify-center items-center">
          <div className="absolute w-[300px] md:w-[350px] bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-800 transform -rotate-12 -translate-x-12 md:-translate-x-48 z-10 transition-transform hover:z-30 hover:-translate-y-4">
            <h4 className="font-bold mb-3 text-lg">For Individuals</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Send and receive money instantly, no extra apps needed.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Pay friends, family, or split bills with ChainPaye fast, secure,
              and easy.
            </p>
          </div>

          <div className="absolute w-[300px] md:w-[350px] bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-xl border border-gray-100 dark:border-gray-800 transform rotate-12 translate-x-12 md:translate-x-48 z-10 transition-transform hover:z-30 hover:-translate-y-4">
            <h4 className="font-bold mb-3 text-lg">
              For Freelancers & Creators
            </h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
              Generate a payment link using Chainpaye and get settled in less
              than a minute.
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Clients pay through a bank card or bank transfers for US 🇺🇸 while
              EUR 🇪🇺 and GBP 🇬🇧 users. Bank card strictly
            </p>
          </div>

          <div className="absolute w-[320px] md:w-[380px] bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-2xl border border-gray-200 dark:border-gray-700 transform z-20 hover:-translate-y-2 transition-transform">
            <h4 className="font-bold mb-3 text-lg">For Businesses</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Leverage our APIs to scale your business while accepting global
              payments in USD 🇺🇸, EUR 🇪🇺, GBP 🇬🇧 — and more coming soon.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              Funds are automatically converted into NGN 🇳🇬, GHS 🇬🇭, or KES 🇰🇪
              at real-time rates.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl bg-[#EFEFF1] dark:bg-[#1A1A1E] rounded-[48px] p-8 md:p-16 text-left relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-[#111528] dark:text-white leading-tight">
              Unlock Borderless Payments <br /> With Chainpaye
            </h2>
            <p className="text-sm text-gray-500 mb-8 max-w-lg">
              Add seamless global and on-chain payments to your business with
              one lightweight integration — we handle compliance, settlement,
              liquidity, and infrastructure so you can focus on growth.
            </p>
            <div className="flex flex-col gap-2">
              <p className="text-xs text-gray-500">
                Message support at{" "}
                <span className="font-bold text-[#111528] dark:text-white">
                  business@chainpaye.com
                </span>
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold text-sm transition-colors whitespace-nowrap"
          >
            Get in touch with us →
          </Link>
        </div>
      </div>
    </section>
  );
}
