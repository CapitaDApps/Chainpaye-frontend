"use client";

import { useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { Check, Bot } from "lucide-react";
import { WaitlistModal } from "./waitlist-modal";
import { SuccessModal } from "./success-modal";

const TIERS = [
  {
    id: "basic",
    name: "Basic",
    price: 25,
    description: "For everybody",
    cardImage: "/assets/Solaris V2.png",
    bg: "bg-[#EFEFF1]",
    textColor: "text-[#111528]",
    subTextColor: "text-[#5A5F73]",
    gridBorder: "border-black/10",
    checkColor: "text-blue-600",
    popular: false,
    headline: "Start simple, spend globally.",
    features: ["Works anywhere Visa is accepted", "Earn 2% on unused balance"],
  },
  {
    id: "gold",
    name: "Gold",
    price: 125,
    description: "For power users & professionals",
    cardImage: "/assets/GOLD V1.png",
    bg: "bg-[#BB7836]",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridBorder: "border-white/20",
    checkColor: "text-white",
    popular: true,
    headline: "Higher limits, more control.",
    features: [
      "No spending limits",
      "Earn up to 4% APY",
      "No Bespoke card design",
      "Priority top-up assistance",
    ],
  },
  {
    id: "platinum",
    name: "Platinum",
    price: 250,
    description: "For high-volume users",
    cardImage: "/assets/Platinum V2.png",
    bg: "bg-[#0047AB]",
    textColor: "text-white",
    subTextColor: "text-white/80",
    gridBorder: "border-white/20",
    checkColor: "text-white",
    popular: false,
    headline: "Higher limits, more control.",
    features: [
      "No spending limits",
      "Earn up to 6% APY",
      "Bespoke card design",
      "Priority top-up assistance",
    ],
  },
];

export function CardSelection() {
  const [selectedTier, setSelectedTier] = useState(TIERS[0]);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleWaitlistSuccess = () => {
    setIsWaitlistOpen(false);
    setIsSuccessOpen(true);
  };

  return (
    <section className="py-16 px-4 ">
      <div className="container mx-auto bg-[#FDFDFD] rounded-2xl md:p-10 p-6 dark:bg-[#2A2A33]">
        <h2 className="text-3xl md:text-4xl font-medium text-center mb-16 text-[#111528] dark:text-white">
          Select Your Card Tier
        </h2>

        <div className="flex flex-col-reverse md:flex-row justify-evenly gap-12 items-start">
          {/* Left Side - Card Preview */}
          <div
            className={clsx(
              "w-full md:w-2/5  relative rounded-[21px] md:rounded-3xl p-8 lg:min-h-[600px] flex flex-col gap-12 xl:gap-0 justify-between overflow-hidden transition-colors duration-500",
              selectedTier.bg
            )}
          >
            {/* Grid Background Effect */}
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-20">
              {Array.from({ length: 144 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx("border-[0.5px]", selectedTier.gridBorder)}
                />
              ))}
            </div>

            <div className="relative w-full  aspect-[1.586] z-10">
              <Image
                key={selectedTier.id}
                src={selectedTier.cardImage}
                alt={`${selectedTier.name} Card`}
                fill
                className="object-contain drop-shadow-2xl animate-in fade-in zoom-in duration-500"
              />
            </div>

            <div className="relative z-10 mt-auto">
              <div className="w-20 h-1 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-8 blur-[1px]"></div>

              <h3
                className={clsx(
                  "text-xl md:text-2xl font-medium mb-6",
                  selectedTier.textColor
                )}
              >
                {selectedTier.headline}
              </h3>

              <div className="space-y-4">
                {selectedTier.features.map((feature, i) => (
                  <div
                    key={i}
                    className={clsx(
                      "flex items-center gap-3",
                      selectedTier.subTextColor
                    )}
                  >
                    <span className={selectedTier.checkColor}>
                      <Check className="w-5 h-5" />
                    </span>
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Selection List */}
          <div className="w-full md:w-2/5 space-y-4">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                onClick={() => setSelectedTier(tier)}
                className={clsx(
                  "relative p-4 rounded-2xl border-2 transition-all cursor-pointer border-[#E5E7EB] flex items-center justify-between",
                  selectedTier.id === tier.id
                    ? "bg-[#E8EDFF] dark:bg-blue-900/10 dark:border-zinc-800 "
                    : "border-gray-100 bg-white dark:border-zinc-800 dark:bg-[#151518] hover:border-gray-200 dark:hover:border-zinc-700"
                )}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={clsx(
                      "w-6 h-6 rounded border flex items-center justify-center transition-colors",
                      selectedTier.id === tier.id
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-300 dark:border-zinc-600"
                    )}
                  >
                    {selectedTier.id === tier.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-xl text-[#5A5F73] dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-sm font-medium text-[#9CA3AF]">
                      {tier.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="text-2xl font-bold text-[#5A5F73]">
                    ${tier.price}
                  </span>
                  {tier.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-[#003DFF] rounded-full hidden md:block">
                      Most popular
                    </span>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-8 flex justify-end">
              <button
                onClick={() => setIsWaitlistOpen(true)}
                className="w-fit px-20  bg-[#003DFF] dark:bg-[#7DA2FF] dark:text-[#00174F] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.99]"
              >
                Request Card
              </button>
            </div>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        onSuccess={handleWaitlistSuccess}
        selectedTier={selectedTier.name}
      />

      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </section>
  );
}
