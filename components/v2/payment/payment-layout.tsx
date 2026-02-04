import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface PaymentLayoutProps {
  children: React.ReactNode;
  step: "method" | "bank-details" | "confirming" | "success" | "loading" | "error";
  onBack?: () => void;
  paymentData?: {
    amount: string;
    currency: string;
    description: string;
    paymentType: string;
    name:string
  } | null;
}

export function PaymentLayout({ children, step, onBack, paymentData }: PaymentLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4 font-sans">
      {step === "method" ? (
        <div className="bg-white dark:bg-[#1A1F36] rounded-[32px] w-full max-w-[1100px] min-h-[600px] flex justify-between flex-col md:flex-row p-8 md:p-12 gap-8 md:gap-20 shadow-sm relative pb-16">
          {/* Left Column: Summary */}
          <div className="flex flex-col justify-between w-full md:max-w-[400px] shrink-0">
            <div>
              <div className="text-gray-500 mb-6 font-medium">
                You&apos;re paying:
              </div>
              <h1 className="text-5xl font-bold text-[#111528] mb-10">
                {paymentData ? `${paymentData.currency} ${paymentData.amount}` : "$250"}
              </h1>

              <div className="rounded-xl border border-gray-100 p-0 overflow-hidden">
                <div className="flex justify-between py-4 px-4 border-b border-gray-50  bg-white ">
                  <span className="text-gray-500 text-sm">Bill from</span>
                  <span className="font-medium text-[#111528] text-sm">
                    `${paymentData?.name}`
                  </span>
                </div>
                <div className="flex justify-between py-4 px-4 bg-white">
                  <span className="text-gray-500 text-sm">Purpose</span>
                  <span className="font-medium text-[#111528] text-sm text-right">
                    {paymentData?.description || "Payment for website design"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 w-fit text-nowrap md:mt-0 flex items-center gap-2 text-xs text-gray-400 md:relative absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <span>Powered by</span>
              <span className="font-bold text-[#111528]">
                Chainpaye
              </span>
              <span className="mx-2 text-gray-300">help</span>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="relative pt-2">{children}</div>
        </div>
      ) : (
        <div className="w-full bg-[#FDFDFD] rounded-xl min-h-175 h-[80vh] max-w-[972px] justify-center flex flex-col items-center relative px-4">
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
            <span className="font-normal text-[#111528]">
              Chainpaye
            </span>
            <span className="mx-2 text-[#5A5F73]">help</span>
          </div>
        </div>
      )}
    </div>
  );
}
