"use client";

import { MultiCurrencyAnimation } from "../../animations/multi-currency-animation";

export function MultiCurrencyFeature() {
  return (
    <div className="md:p-8 rounded-4xl flex flex-col justify-between">
      <div className="h-44 bg-[#F5F7FA] rounded-t-xl mb-6 relative overflow-hidden flex flex-col justify-center items-center">
        <MultiCurrencyAnimation />
      </div>
      <div>
        <h3 className="font-medium text-base mb-2 text-[#111528]">
          Multi-Currency Conversion
        </h3>
        <p className="text-base font-normal text-[#5A5F73]">
          Support for NGN, KES, GHS, ZAR with competitive exchange rates.
        </p>
      </div>
    </div>
  );
}
