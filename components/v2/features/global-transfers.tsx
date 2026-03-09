"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import clsx from "clsx";

export function GlobalTransfersFeature() {
  const [apiStep, setApiStep] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const runApiSequence = () => {
      setApiStep(1);
      timeout = setTimeout(() => {
        setApiStep(2);
        timeout = setTimeout(() => {
          setApiStep(3);
          timeout = setTimeout(() => {
            setApiStep(0);
            timeout = setTimeout(() => {
              runApiSequence();
            }, 500);
          }, 2000);
        }, 1200);
      }, 1200);
    };
    runApiSequence();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="md:p-8 rounded-4xl flex flex-col justify-between">
      <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 p-4 relative overflow-hidden flex justify-center">
        {/* iPhone Mockup */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-full">
          <Image
            src="/assets/iphone.png"
            alt="iPhone"
            width={200}
            height={300}
            className="object-contain drop-shadow-2xl"
          />

          {/* Nigeria Flag (Left) */}
          <div
            className={clsx(
              "absolute -left-20 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center transition-opacity duration-500",
              apiStep >= 1 ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src="/assets/nigeria.svg"
              alt="Nigeria"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>

          {/* Right Flags Container */}
          <div className="absolute -right-12 top-1/2 -translate-y-1/2 flex flex-col gap-2">
            {/* USA Flag */}
            <div
              className={clsx(
                "w-10 h-10  flex items-center justify-center transition-all duration-500",
                apiStep >= 2
                  ? "opacity-100 translate-x-10 -translate-y-5"
                  : "opacity-0 translate-x-4",
              )}
            >
              <Image
                src="/assets/usa.svg"
                alt="USA"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            {/* UK Flag */}
            <div
              className={clsx(
                "w-10 h-10 flex items-center justify-center transition-all duration-500",
                apiStep >= 3
                  ? "opacity-100 translate-x-10"
                  : "opacity-0 translate-x-4",
              )}
            >
              <Image
                src="/assets/uk.svg"
                alt="UK"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Notification 1: USD */}
        <div
          className={clsx(
            "absolute top-8 left-1/2 -translate-x-1/2 w-[85%] bg-white/40 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 z-10 transition-all duration-500",
            apiStep >= 1
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-10 scale-80",
          )}
        >
          <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center shrink-0 overflow-hidden p-1.5 border border-white/20">
            <Image
              src="/assets/usd.svg"
              alt="USD"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#111528]">USD Received</div>
            <div className="text-[10px] text-[#5A5F73]">
              You have received $1,500 in your wallet
            </div>
          </div>
          <span className="ml-auto text-[8px] text-[#5A5F73]/60">Just now</span>
        </div>

        {/* Notification 2: GBP */}
        <div
          className={clsx(
            "absolute top-6 left-1/2 -translate-x-1/2 w-[85%] bg-white/40 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 z-20 transition-all duration-500",
            apiStep >= 2
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-10 scale-95",
          )}
        >
          <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center shrink-0 overflow-hidden p-1.5 border border-white/20">
            <Image
              src="/assets/ponds.svg"
              alt="GBP"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#111528]">GBP Received</div>
            <div className="text-[10px] text-[#5A5F73]">
              You have received £2,000 in your wallet
            </div>
          </div>
          <span className="ml-auto text-[8px] text-[#5A5F73]/60">Just now</span>
        </div>

        {/* Notification 3: Success */}
        <div
          className={clsx(
            "absolute top-5 left-1/2 -translate-x-1/2 w-[85%] bg-white/40 backdrop-blur-xl p-2 rounded-2xl shadow-xl flex items-center gap-3 border border-white/20 z-30 transition-all duration-500",
            apiStep >= 3
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 -translate-y-10 scale-95",
          )}
        >
          <div className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center shrink-0 overflow-hidden p-1.5 border border-white/20">
            <Image
              src="/assets/ponds.svg"
              alt="Success"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-[#111528]">
              Transaction Successful
            </div>
            <div className="text-[10px] text-[#5A5F73]">
              You have sent €2,000 from your wallet.
            </div>
          </div>
          <span className="ml-auto text-[8px] text-[#5A5F73]/60">Just now</span>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-base mb-2 text-[#111528]">
          Instant Global Transfers
        </h3>
        <p className="text-base font-normal text-[#5A5F73]">
          Send money across borders in under 50 seconds with guaranteed
          settlement times.
        </p>
      </div>
    </div>
  );
}
