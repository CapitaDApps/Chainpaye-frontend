import Image from "next/image";

export function AboutAbout() {
  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto flex  flex-col md:flex-row gap-12 lg:gap-32 items-start">
        <div className="w-full max-w-[692px] md:w-1/2 rounded-[30px] overflow-hidden relative h-100 md:h-150 bg-gray-100">
          <Image
            src="/assets/user-avatar.png"
            alt="About Chainpaye"
            fill
            className="object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 max-w-[480px]">
          <h2 className="text-3xl md:text-[40px] font-medium text-[#111528] mb-6">
            About Chainpaye
          </h2>
          <p className="text-[#5A5F73] font-normal font-sans text-base mb-8 leading-relaxed">
            Chainpaye is a stablecoin-powered platform that simplifies cross
            border payments and crypto off-ramps across Africa.
            <br />
            <br />
            Users can send, convert, and receive global funds instantly —
            directly through WhatsApp.
          </p>

          <div className="space-y-8">
            <div>
              <div className="inline-block border border-[#D1D5DB] rounded-full px-4 py-1.5 text-lg font-medium text-[#5A5F73] mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                Our Vision
              </div>
              <p className="text-[#5A5F73] text-base leading-relaxed">
                To become the global fiat-twins for the modern Africa.
              </p>
            </div>

            <div>
              <div className="inline-block border border-[#D1D5DB] bg-white rounded-full px-4 py-1.5 text-lg font-medium text-[#5A5F73] mb-4 shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
                Our Mission
              </div>
              <p className="text-[#5A5F73] text-base leading-relaxed">
                Build a friction messaging-based settlement layer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
