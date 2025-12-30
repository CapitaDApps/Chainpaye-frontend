"use client";

import { Code2, Globe, Headset } from "lucide-react";

export function Features() {
  return (
    <section className="py-24 px-4 bg-[#EFEFF1] dark:bg-[#202024]">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#111528] dark:text-white">
            Transforming cross-border <br /> payments in Africa
          </h2>
          <p className="text-gray-500">Simple instant and low fees</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 bg-blue-600 rounded-[40px] p-8 relative overflow-hidden min-h-[500px] flex flex-col justify-center items-center">
            <div className="absolute top-20 left-10 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg animate-pulse">
              Low cost
            </div>
            <div className="absolute top-32 right-10 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg delay-100 animate-pulse">
              Fast settlement
            </div>
            <div className="absolute bottom-32 left-8 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg delay-200 animate-pulse">
              Enhanced security
            </div>
            <div className="absolute bottom-20 right-12 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg delay-300 animate-pulse">
              Multi-currency support
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-blue-900 px-6 py-3 rounded-full text-sm font-bold shadow-xl scale-110 z-10">
              Global Access
            </div>
            <div className="absolute bottom-40 left-1/2 translate-x-10 bg-white text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg delay-500">
              Easy payment
            </div>

            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="h-32 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 p-4 relative overflow-hidden">
                <div className="bg-green-100 p-2 rounded-lg rounded-tl-none text-[10px] w-3/4 mb-2 text-green-900">
                  <span className="font-bold block">
                    Payment link for $500 has been generated
                  </span>
                  <span className="flex items-center gap-1 mt-1">
                    <span className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center text-white text-[8px]">
                      ✓
                    </span>{" "}
                    Copy payment link
                  </span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Seamless WhatsApp Payments
                </h3>
                <p className="text-sm text-gray-500">
                  Send and receive payments inside WhatsApp — chat, tap, done.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="h-32 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 p-4 flex flex-col justify-center">
                <div className="text-xs font-mono text-gray-400 mb-1">
                  API Key
                </div>
                <div className="bg-white dark:bg-zinc-900 border rounded flex items-center justify-between p-2">
                  <div className="h-2 w-24 bg-gray-200 rounded"></div>
                  <Code2 className="h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Global Payment API
                </h3>
                <p className="text-sm text-gray-500">
                  Accept global payments easily and focus on growth with quick
                  Chainpaye integration.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="h-32 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 flex items-center justify-center">
                <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl shadow-lg flex items-center gap-3">
                  <Globe className="h-8 w-8 text-orange-500" />
                  <div>
                    <div className="text-xs font-bold text-[#111528] dark:text-white">
                      EUR Received
                    </div>
                    <div className="text-[8px] text-gray-500">
                      You have received €2,000 in your wallet
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  Multi-Currency Support
                </h3>
                <p className="text-sm text-gray-500">
                  Receive funds in NGN, GHS, ZAR, KES, USD and convert
                  seamlessly.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1A1A1E] p-8 rounded-[32px] shadow-sm flex flex-col justify-between">
              <div className="h-32 bg-[#F5F7FA] dark:bg-zinc-800 rounded-xl mb-6 flex items-center justify-center">
                <div className="flex items-center gap-4 opacity-50">
                  <Headset className="h-8 w-8 text-gray-400" />
                  <div className="space-y-2">
                    <div className="h-2 w-20 bg-gray-300 rounded"></div>
                    <div className="h-2 w-12 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-[#111528] dark:text-white">
                  24/7 customer support
                </h3>
                <p className="text-sm text-gray-500">
                  Our customer support team is readily available to assist you
                  whenever needed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
