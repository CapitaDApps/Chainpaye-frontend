import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PaymentLayoutProps {
  children: React.ReactNode;
  step: "method" | "bank-details" | "confirming" | "success";
  onBack?: () => void;
}

export function PaymentLayout({ children, step, onBack }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#0B0E14] flex items-center justify-center p-4 font-sans">
      {/* 
        LAYOUT 1: Split View for 'method' selection 
        Shows Payment Overview on Left, Content on Right
      */}
      {step === "method" ? (
        <div className="bg-white dark:bg-[#1A1F36] rounded-[32px] w-full max-w-[1100px] min-h-[600px] flex justify-between flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-20 shadow-sm relative pb-16">
          {/* Left Column: Summary */}
          <div className="flex flex-col justify-between w-full md:max-w-[400px] shrink-0">
            <div>
              <div className="text-gray-500 mb-6 font-medium">
                You&apos;re paying:
              </div>
              <h1 className="text-5xl font-bold text-[#111528] dark:text-white mb-10">
                $250
              </h1>

              <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-0 overflow-hidden">
                <div className="flex justify-between py-4 px-4 border-b border-gray-50 dark:border-gray-800 bg-white dark:bg-transparent">
                  <span className="text-gray-500 text-sm">Bill from</span>
                  <span className="font-medium text-[#111528] dark:text-white text-sm">
                    Blessing Idowu
                  </span>
                </div>
                <div className="flex justify-between py-4 px-4 bg-white dark:bg-transparent">
                  <span className="text-gray-500 text-sm">Purpose</span>
                  <span className="font-medium text-[#111528] dark:text-white text-sm text-right">
                    Payment for website design
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 w-fit text-nowrap md:mt-0 flex items-center gap-2 text-xs text-gray-400 md:relative absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span>Powered by</span>
              <span className="font-bold text-[#111528] dark:text-white">
                Chainpaye
              </span>
              <span className="mx-2 text-gray-300">help</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="relative pt-2">{children}</div>
        </div>
      ) : (
        /* 
           LAYOUT 2: Single Column View for Bank Details, Confirmation, Success 
           Centered white card, No Overview sidebar, Footer outside
        */
        <div className="w-full bg-[#FDFDFD] rounded-xl h-[80vh] max-w-[972px] justify-center flex flex-col items-center relative px-4">
          <div
            className={`max-w-125 ${
              step === "success" ? "rounded-t-4xl" : "rounded-4xl"
            }  w-full relative`}
          >
            {children}
          </div>

          {/* Footer Outside */}
          <div className=" flex items-start absolute md:left-14 left-1/2 transform -translate-x-1/2 md:translate-x-0   bottom-6 gap-2 text-xs text-gray-400 ">
            <span>Powered by</span>
            <span className="font-normal text-[#111528] dark:text-white">
              Chainpaye
            </span>
            <span className="mx-2 text-[#5A5F73]">help</span>
          </div>
        </div>
      )}
    </div>
  );
}
