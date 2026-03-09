export function AboutRoadmap() {
  return (
    <section className="md:py-10 pt-6 pb-24 px-4 bg-white text-center">
      <div className="container mx-auto max-w-5xl">
        <div className="inline-block border border-[#D1D5DB] bg-white rounded-full px-4 py-1 text-sm font-medium text-gray-600 mb-6 uppercase tracking-wider shadow-sm">
          Roadmap
        </div>
        <h2 className="text-[25px] md:text-[40px] font-medium text-[#111528] mb-6 md:mb-16">
          Our journey to financial infrastructure for Africa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white h-[296px] border border-gray-200 rounded-[24px] p-8 shadow-[0_4px_32px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="inline-block border text-lg border-[#D1D5DB] bg-white rounded-full px-4 py-1 text-sm font-medium text-[#5A5F73] mb-6 self-start shadow-sm">
              Now
            </div>

            {/* Items — flex-1 so they fill the remaining card height */}
            <div className="flex flex-1">
              {/* Left: dots + connecting line */}
              <div className="flex flex-col items-center mr-4">
                <div className="w-5 h-5 rounded-full border-[5px] border-[#22A753] bg-white flex-shrink-0"></div>
                <div className="w-px flex-1 bg-gray-200"></div>
                <div className="w-5 h-5 rounded-full border-[5px] border-[#22A753] bg-white flex-shrink-0"></div>
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-[#000000]">
                    WhatsApp banking
                  </span>
                  <span className="flex items-center gap-1 text-[#22A753] px-3 py-0.5 rounded-full bg-[#DDFBE7] text-sm whitespace-nowrap ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22A753] inline-block"></span>
                    Done
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-[#000000]">
                    Multi-currency accounts
                  </span>
                  <span className="flex items-center gap-1 text-[#22A753] px-3 py-0.5 rounded-full bg-[#DDFBE7] text-sm whitespace-nowrap ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22A753] inline-block"></span>
                    Done
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white h-[296px] border border-gray-200 rounded-[24px] p-8 shadow-[0_4px_32px_rgba(0,0,0,0.08)] flex flex-col">
            <div className="inline-block border text-lg border-[#D1D5DB] bg-white rounded-full px-4 py-1 text-sm font-medium text-[#5A5F73] mb-6 self-start shadow-sm">
              Soon
            </div>

            {/* Items — flex-1 so they fill the remaining card height */}
            <div className="flex flex-1">
              {/* Left: dots + connecting line */}
              <div className="flex flex-col items-center mr-4">
                <div className="w-5 h-5 rounded-full border-[5px] border-blue-500 bg-white flex-shrink-0"></div>
                <div className="w-px flex-1 bg-gray-200"></div>
                <div className="w-5 h-5 rounded-full border-[5px] border-gray-300 bg-white flex-shrink-0"></div>
              </div>

              <div className="flex flex-col justify-between flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-[#111528]">
                    Physical Visa cards
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 px-3 py-0.5 rounded-full bg-[#E4F5FF] text-sm whitespace-nowrap ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"></span>
                    In Progress
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm sm:text-base md:text-lg font-medium text-[#111528]">
                    Automated Payroll
                  </span>
                  <span className="flex items-center gap-1 text-[#6B7280] px-3 py-0.5 rounded-full bg-[#F3F4F6] text-sm whitespace-nowrap ml-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280] inline-block"></span>
                    Future
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
