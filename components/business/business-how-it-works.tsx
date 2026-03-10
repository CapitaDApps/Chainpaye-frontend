import Image from "next/image";
import Link from "next/link";

export function BusinessHowItWorks() {
  return (
    <section className="md:py-2 px-4">
      <div className="container mx-auto ">
        <div className="text-center md:mb-16 mb-6">
          <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] mb-4">
            How It Works
          </h2>
          <p className="text-[#5A5F73] text-lg font-medium">
            Join Chainpaye in minutes and start receiving payments globally
          </p>
        </div>

        <div className="space-y-8 mx-auto">
          {/* Step 1: Talk to our team */}
          <div className="w-full bg-white p-2 rounded-[30px] shadow-sm flex flex-col md:flex-row md:items-center overflow-hidden">
            <div className="w-full md:w-1/2 p-8 py-8 px-6 md:p-12 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-sm mb-2">
                Step 1
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Talk to our team
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    Click{" "}
                    <Link
                      href="https://calendly.com/business-chainpaye/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#003DFF] cursor-pointer "
                    >
                      here
                    </Link>{" "}
                    to book a call with our team.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    We&apos;ll understand your business needs and help you
                    choose the best way to accept payments.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    After the call, we&apos;ll generate your API credentials for
                    you automatically.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#F5F7FA] relative h-[300px] md:h-[450px] rounded-xl flex items-end justify-center pt-8 overflow-hidden">
              <div className="relative w-full max-w-[280px] h-full translate-y-8">
                {/* Placeholder for the phone scheduling UI */}
                <Image
                  src="/assets/businessIphone.png"
                  alt="Schedule Call UI"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Integrate the API */}
          <div className="w-full bg-white p-2 rounded-[30px] shadow-sm flex flex-col-reverse md:flex-row md:items-center overflow-hidden">
            <div className="w-full md:w-1/2 bg-[#F5F7FA] relative h-[300px] md:h-[450px] rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/assets/Frame 1618869307.png"
                alt="Integrate API Code Snippet"
                fill
                className="object-cover"
              />
            </div>

            <div className="w-full md:w-1/2 p-8 py-8 px-6 md:p-12 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-sm mb-2">
                Step 2
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Integrate the API (done by you or your developer)
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    Your developer can plug Chainpaye into your website,
                    platform, or mobile app using our simple guide.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    If you don&apos;t have a developer, we&apos;ll recommend one
                    you can trust.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Global Payments (Reused) */}
          <div className="w-full bg-white gap-8 md:gap-0 rounded-[30px] shadow-sm flex flex-col md:flex-row md:items-center overflow-hidden p-2">
            <div className="w-full md:w-1/2 p-8 py-8 px-6 md:p-12 flex flex-col justify-center">
              <div className="text-[#003DFF] font-medium text-sm mb-2">
                Step 3
              </div>
              <h3 className="text-2xl font-medium text-[#111528] mb-8">
                Start receiving payments globally
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    Once your API is connected, Customers can pay you from
                    anywhere.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    You get settled instantly in NGN, GHS, KES, ZAR, or USD.
                  </p>
                </div>
                <div className="flex gap-4">
                  <span className="rounded-full flex items-center justify-center w-6 h-6 bg-[#E5EBFB] text-[#003DFF] font-medium text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p className="text-base text-[#5A5F73] font-medium">
                    Every payment is secured and verified.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-[#F5F7FA] relative h-[300px] md:h-[450px] rounded-2xl flex items-center justify-center overflow-hidden">
              <div className="relative w-[90%] h-[90%]">
                <Image
                  src="/assets/mini3.svg"
                  alt="Global Payments Map"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
