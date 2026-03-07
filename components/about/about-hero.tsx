import Image from "next/image";

export function AboutHero() {
  return (
    <section className="bg-[#0B3C6D] text-white overflow-hidden pt-32 pb-24 relative min-h-[65vh] flex items-center">
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{ top: 0, bottom: 0, right: 0, width: "100%", height: "100%" }}
      >
        <Image
          src="/assets/earth.png"
          alt="Global Network"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col justify-center h-full py-12 lg:py-24">
        <div className="max-w-xl space-y-8 z-20 mb-16 lg:mb-24">
          <h1 className="text-4xl md:text-[40px] font-medium leading-tight">
            Building Payment Rails for a Borderless Africa
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Chainpaye enables instant global payments using stablecoins and
            regulated banking infrastructure — directly on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 z-20 w-full lg:w-4/5 xl:w-[85%] mt-auto">
          <div className="pl-4 flex flex-row self-start gap-2">
            <div className="bg-[#00D4FF] h-6 mt-2 w-0.5" />
            <div>
              <div className="text-2xl font-medium">{"<"} 47 sec</div>
              <div className="text-sm text-gray-300 mt-1">Settlement Speed</div>
            </div>
          </div>
          <div className="pl-4 flex flex-row self-start gap-2">
            <div className="bg-[#00D4FF] h-6 mt-2 w-0.5" />
            <div>
              <div className="text-2xl font-medium">98%</div>
              <div className="text-sm text-gray-300 mt-1">
                historical uptime
              </div>
            </div>
          </div>
          <div className="pl-4 flex flex-row self-start gap-2">
            <div className="bg-[#00D4FF] h-6 mt-2 w-0.5" />
            <div>
              <div className="text-2xl font-medium">4+</div>
              <div className="text-sm text-gray-300 mt-1">
                Supported Currencies
              </div>
            </div>
          </div>
          <div className="pl-4 flex flex-row self-start gap-2">
            <div className="bg-[#00D4FF] h-6 mt-2 w-0.5" />
            <div>
              <div className="text-2xl font-medium">1.5%</div>
              <div className="text-sm text-gray-300 mt-1">Average Fee</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
