"use client";

import { CoreFeaturesHero } from "./features/core-hero";
import { PaymentLinksFeature } from "./features/payment-links";
import { MultiCurrencyFeature } from "./features/multi-currency";
import { GlobalTransfersFeature } from "./features/global-transfers";
import { StablecoinFeature } from "./features/stablecoin-feature";

export function Features() {
  return (
    <section className="px-4 bg-white mt-14 md:mt-0">
      <div className="container mx-auto md:max-w-7xl">
        <div className="text-center md:mb-16">
          <h2 className="text-[#111528] text-[25px] md:text-[40px] font-medium mb-5">
            CORE FEATURES
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <CoreFeaturesHero />

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
            <PaymentLinksFeature />
            <MultiCurrencyFeature />
            <GlobalTransfersFeature />
            <StablecoinFeature />
          </div>
        </div>
      </div>
    </section>
  );
}
