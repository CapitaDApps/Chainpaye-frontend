"use client";

import { StablecoinAnimation } from "../../animations/stablecoin-animation";

export function StablecoinFeature() {
  return (
    <div className="p-6 md:p-8 rounded-4xl flex flex-col justify-between">
      <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 flex items-center justify-center overflow-hidden relative">
        <StablecoinAnimation
          className="scale-75 origin-center"
          isfull={false}
          imageUrl="/assets/retail.svg"
        />
      </div>
      <div>
        <h3 className="font-medium text-base mb-2 text-[#111528]">
          Spend Stablecoins Like Cash
        </h3>
        <p className="text-base font-normal text-[#5A5F73]">
          Convert USDT/USDC into NGN KES GHS ZAR
        </p>
      </div>
    </div>
  );
}
