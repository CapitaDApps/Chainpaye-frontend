"use client";

import Image from "next/image";
import Link from "next/link";

export function Steps() {
  return (
    <section className="md:py-24 px-4 " id="how-it-works">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block border border-[#D1D5DB] bg-white rounded-full px-3 py-1 text-lg font-medium text-[#5A5F73] mb-4 tracking-wide shadow-sm">
            How it works
          </div>
          <h2 className="text-3xl md:text-[40px] font-medium text-[#5A5F73]/75 mb-4">
            Get started with Chainpaye in <br />{" "}
            <span className="text-[#5A5F73]">Three Simple Steps</span>
          </h2>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-2 rounded-[30px] gap-8 md:gap-0 shadow-sm flex flex-col md:flex-row md:items-center items-stretch overflow-hidden">
            <div className="w-full md:w-1/2 p-8 py-8 px-4 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 1
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Start a WhatsApp Chat
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <p className="text-base text-[#5A5F73] font-medium">
                    Click{" "}
                    <Link
                      href="https://wa.me/message/RB4AEJEFPZE7G1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#7DA2FF] font-bold cursor-pointer"
                    >
                      here
                    </Link>{" "}
                    start a conversation with our WhatsApp AI agent <br />
                    <span className="mt-12 block">
                      Follow the prompts to complete onboarding.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full  md:w-1/2 bg-[#F5F7FA] relative h-1/2 min-h-52 md:min-h-100  rounded-[36px]">
              <div className="absolute inset-0 flex items-end justify-center pt-8 md:px-8 pb-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/sec1.svg"
                    alt="Start WhatsApp Chat"
                    fill
                    className="object-contain md:object-fill"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[30px] shadow-sm flex flex-col-reverse md:flex-row md:items-center items-stretch overflow-hidden p-2 gap-8 md:gap-0">
            <div className="w-full  md:w-1/2 bg-[#F5F7FA] relative h-1/2 min-h-52 md:min-h-100   rounded-[36px]">
              <div className="absolute inset-0 flex items-end justify-center pt-8 md:px-8 pb-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/updatedsec2.png"
                    alt="Create Wallet"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-8 py-8 px-4 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 2
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Verify your ID in 60 seconds.
              </h3>
              <p className="text-base text-[#5A5F73] font-medium">
                Securely verify your identity with your BVN to unlock full
                access.
              </p>
            </div>
          </div>

          <div className="bg-white gap-8 md:gap-0 rounded-[30px] shadow-sm flex flex-col md:flex-row md:items-center items-stretch overflow-hidden p-2">
            <div className="w-full md:w-1/2 py-8 px-4 md:p-16 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-base mb-2">
                Step 3
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Start sending & receiving payments globally
              </h3>
              <div className="space-y-4">
                <p className="text-base text-[#5A5F73] font-medium">
                  Quick Commands. Type:
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Transfer: </span> For instant
                  transfers between users.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Balance:</span> Real-time
                  wallet tracking.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">History:</span> Your last 20
                  transactions instantly.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Convert:</span> Swap
                  currencies in a tap.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Payment Link:</span> Create.
                  Share. Get paid.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Withdraw:</span> Send funds
                  home to your local bank.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Spend Crypto:</span>{" "}
                  Stablecoin in, fiat out.
                </p>
                <p className="text-base text-[#5A5F73] font-medium">
                  <span className="text-[#003DFF]">Support:</span> We’re here to
                  help, 24/7.
                </p>
              </div>
            </div>

            <div className="w-full  md:w-1/2 bg-[#F5F7FA] relative h-full md:h-[600px]  min-h-52 md:min-h-100  rounded-[36px] hidden md:block">
              <div className="absolute inset-0 flex items-end justify-center pt-8 md:px-8 pb-0">
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/sec3.png"
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
