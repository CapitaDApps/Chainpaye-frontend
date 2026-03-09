"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import clsx from "clsx";

const PLATFORMS = [
  {
    icon: "/assets/Credit Card.png",
    title: "Fintech platforms & digital banks",
  },
  {
    icon: "/assets/Add Friend.png",
    title: "Agent & Distributor Networks",
  },
  {
    icon: "/assets/Empty Cart.png",
    title: "Marketplaces & E-commerce Platforms",
  },
  {
    icon: "/assets/Apple Wallet.png",
    title: "SaaS Tools Managing Customer Wallets",
  },
  {
    // Reusing an asset as we don't have a direct "NGO" image, using the blue globe
    icon: "/assets/ngo.png",
    title: "NGOs & International Organizations",
  },
  {
    icon: "/assets/Coins Chart.png",
    title: "Investment, Lending & Savings Products",
  },
];

export function BusinessPlatforms() {
  // Split platforms into two separate columns for the animation
  const column1 = PLATFORMS.slice(0, 3);
  const column2 = PLATFORMS.slice(3, 6);

  return (
    <section className="py-12 md:py-24 md:px-4 overflow-hidden">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 bg-[#F5F5F5] justify-end px-8 md:px-12">
        {/* Left Side: Copy */}
        <div className="w-full lg:w-1/2 z-10">
          <h2 className="text-3xl md:text-[40px] md:leading-[1.2] font-medium text-[#111528] mb-6">
            Built for the Platforms Powering Africa&apos;s Digital Economy
          </h2>
          <p className="text-lg text-[#5A5F73] mb-8 font-medium">
            ChainPay supports a wide range of industries helping them move money
            globally and settle locally with ease.
          </p>
          <a
            href="https://calendly.com/business-chainpaye/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#003DFF] text-white px-8 py-3.5 rounded-lg font-medium transition-colors hover:bg-blue-700"
          >
            <Phone size={20} /> Book a call
          </a>
        </div>

        {/* Right Side: Animated Content */}
        <div className="w-full lg:w-fit relative overflow-hidden flex flex-col gap-4">
          {/* Top/Bottom Fade Overlays (Desktop) */}
          <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-[#F5F5F5] to-transparent z-10 pointer-events-none hidden md:block" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#F5F5F5] to-transparent z-10 pointer-events-none hidden md:block" />

          {/* Left/Right Fade Overlays (Mobile) */}
          <div className="absolute top-0 bottom-0 left-0 w-12 bg-linear-to-r from-[#F5F5F5] to-transparent z-10 pointer-events-none md:hidden" />
          <div className="absolute top-0 bottom-0 right-0 w-12 bg-linear-to-l from-[#F5F5F5] to-transparent z-10 pointer-events-none md:hidden" />

          {/* Desktop View: 2 Columns */}
          <div className="hidden md:grid grid-cols-2 gap-4 md:gap-6 h-150">
            {/* Column 1 (Scrolls Up) */}
            <div className="relative h-full flex items-start overflow-hidden w-fit">
              <motion.div
                className="flex flex-col gap-4 md:gap-6 w-fit"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {[...column1, ...column1].map((platform, index) => (
                  <PlatformCard key={`d-col1-${index}`} platform={platform} />
                ))}
              </motion.div>
            </div>

            {/* Column 2 (Scrolls Down) */}
            <div className="relative h-full flex items-start overflow-hidden w-fit">
              <motion.div
                className="flex flex-col gap-4 md:gap-6 w-fit"
                animate={{ y: ["-50%", "0%"] }}
                transition={{
                  y: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 25,
                    ease: "linear",
                  },
                }}
              >
                {[...column2, ...column2].map((platform, index) => (
                  <PlatformCard key={`d-col2-${index}`} platform={platform} />
                ))}
              </motion.div>
            </div>
          </div>

          {/* Mobile View: 2 Rows */}
          <div className="md:hidden flex flex-col gap-4 py-8 overflow-hidden">
            {/* Row 1 (LTR) */}
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-4 w-fit"
                animate={{ x: ["-50%", "0%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 15,
                    ease: "linear",
                  },
                }}
              >
                {[...column1, ...column1].map((platform, index) => (
                  <PlatformCard
                    key={`m-row1-${index}`}
                    platform={platform}
                    mobile
                  />
                ))}
              </motion.div>
            </div>

            {/* Row 2 (RTL) */}
            <div className="relative w-full overflow-hidden">
              <motion.div
                className="flex gap-4 w-fit"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 18,
                    ease: "linear",
                  },
                }}
              >
                {[...column2, ...column2].map((platform, index) => (
                  <PlatformCard
                    key={`m-row2-${index}`}
                    platform={platform}
                    mobile
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlatformCard({
  platform,
  mobile = false,
}: {
  platform: any;
  mobile?: boolean;
}) {
  return (
    <div
      className={clsx(
        "bg-[#FDFDFD] p-6 rounded-3xl flex flex-col gap-4 border border-[#E3E3E3] shrink-0",
        mobile ? "w-64 min-h-40" : "w-full md:max-w-70 min-h-40",
      )}
    >
      <div className="relative w-16 h-16 shrink-0">
        <Image
          src={platform.icon}
          alt={platform.title}
          fill
          className="object-contain object-left"
        />
      </div>
      <h3 className="text-[#111528] font-medium text-base leading-snug">
        {platform.title}
      </h3>
    </div>
  );
}
