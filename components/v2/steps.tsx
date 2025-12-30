"use client";

import Image from "next/image";

export function Steps() {
  return (
    <section className="py-24 px-4 bg-[#EFEFF1] dark:bg-[#202024]">
      <div className="container mx-auto">
        <div className="text-left md:text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-[#111528] dark:text-white mb-4">
            Get started with Chainpaye in <br /> Three Simple Steps
          </h2>
          <p className="text-[#5A5F73] dark:text-gray-400">
            Join Chainpaye in minutes and start receiving payments globally
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#1A1A1E] p-2 rounded-[30px] shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden">
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 1
              </div>
              <h3 className="text-2xl font-medium text-[#111528] dark:text-white mb-8">
                Start a WhatsApp Chat
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Click{" "}
                    <span className="text-[#003DFF] font-bold cursor-pointer">
                      here
                    </span>{" "}
                    to get directed to our WhatsApp AI agent
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Our AI Agent greets you instantly — no app download required
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Verify your identity securely inside WhatsApp
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#F5F7FA] dark:bg-zinc-800 relative min-h-[400px] rounded-[30px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-100">
                  <Image
                    src="/assets/f1.png"
                    alt="Start WhatsApp Chat"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1E] rounded-[30px] shadow-sm flex flex-col-reverse md:flex-row items-stretch overflow-hidden p-2">
            <div className="w-full md:w-1/2 bg-[#F5F7FA] dark:bg-zinc-800 relative min-h-[400px] rounded-[30px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/f2.png"
                    alt="Create Wallet"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 2
              </div>
              <h3 className="text-2xl font-medium text-[#111528] dark:text-white mb-8">
                Create Your Wallet
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Follow the prompts to create your Chainpaye wallet in
                    seconds
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Set your 4-digit PIN for secure transactions.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Your wallet is instantly ready for global payments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1A1A1E] rounded-[30px] shadow-sm flex flex-col md:flex-row items-stretch overflow-hidden p-2">
            <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 3
              </div>
              <h3 className="text-2xl font-medium text-[#111528] dark:text-white mb-8">
                Start sending & receiving payments globally
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Chat, send, and receive money directly inside WhatsApp.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Pay or get paid in multiple currencies — USD, EUR, GBP, NGN,
                    and more.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium dark:text-gray-400">
                    Track every transaction in real-time through the WhatsApp
                    interface.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#F5F7FA] dark:bg-zinc-800 relative min-h-100 rounded-[30px]">
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/f3.png"
                    alt="Global Payments"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
