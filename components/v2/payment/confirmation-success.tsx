"use client";

import { Download, Send } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/assets/Favicon.png";

export function Confirmation() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="relative mb-6">
        <Image src={logo} alt="Chainpaye" width={100} height={100} />
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-6 uppercase tracking-wide">
        CONFIRMING PAYMENT
      </h3>
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

interface SuccessReceiptProps {
  amount: string;
  refNumber: string;
  date: string;
  method: string;
  senderName: string;
}

export function SuccessReceipt({
  amount,
  refNumber,
  date,
  method,
  senderName,
}: SuccessReceiptProps) {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="flex flex-col items-center shadow-2xl rounded-t-4xl mx-auto relative px-4 py-8 max-w-[400px]">
      <div className="absolute -top-28 left-1/2 transform -translate-x-1/2">
        <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="w-16 h-16 bg-[#23A26D] rounded-full flex items-center justify-center">
            <Send className="w-5 h-5 text-white -ml-0.5 mt-0.5 transform -rotate-12" />
          </div>
        </div>
      </div>

      <div className="my-8 text-center">
        <h2 className="text-xl font-medium text-[#121212] dark:text-white mb-2">
          Payment Success!
        </h2>
        <p className="text-sm text-[#474747] font-normal">
          Your payment has been successfully done.
        </p>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#E8EAED]  mb-8" />

      <div className="text-center mb-8">
        <div className="text-sm text-[#474747] mb-2 font-normal">
          Total Payment
        </div>
        <div className="text-2xl font-semibold text-[#121212] dark:text-white">
          {amount}
        </div>
      </div>

      {/* Details Grid */}
      <div className="w-full grid grid-cols-2 gap-4 gap-y-6 text-left mb-10 px-2">
        <div className="p-3 border border-[#F3F4F6] dark:border-gray-800 rounded-lg">
          <div className="text-[11px] text-gray-400 mb-1">Ref Number</div>
          <div className="font-medium text-[#111528] dark:text-white text-sm">
            {refNumber}
          </div>
        </div>
        <div className="p-3 border border-[#F3F4F6] dark:border-gray-800 rounded-lg">
          <div className="text-[11px] text-gray-400 mb-1">Payment Time</div>
          <div className="font-medium text-[#111528] dark:text-white text-sm">
            {date}
          </div>
        </div>
        <div className="p-3 border border-[#F3F4F6] dark:border-gray-800 rounded-lg">
          <div className="text-[11px] text-gray-400 mb-1">Payment Method</div>
          <div className="font-medium text-[#111528] dark:text-white text-sm">
            {method}
          </div>
        </div>
        <div className="p-3 border border-[#F3F4F6] dark:border-gray-800 rounded-lg">
          <div className="text-[11px] text-gray-400 mb-1">Sender Name</div>
          <div className="font-medium text-[#111528] dark:text-white text-sm">
            {senderName}
          </div>
        </div>
      </div>

      <button
        className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition group"
        onClick={handleDownloadPDF}
      >
        <Download className="w-4 h-4 text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="text-sm font-medium">Download PDF receipt</span>
      </button>

      {/* Scalloped Bottom Edge */}
      <div className="absolute -bottom-[12px] left-0 right-0 h-[12px] overflow-hidden">
        <div
          className="w-full h-full flex"
          style={{
            maskImage:
              "radial-gradient(circle at center top, transparent 6px, black 6px)",
          }}
        >
          {/* We simulate the 'teeth' by repeating circles or simpler css mask */}
        </div>
      </div>

      <style jsx>{`
        .scalloped-bottom {
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          height: 10px;
          background-image: radial-gradient(
            circle,
            transparent 50%,
            #ffffff 50%
          );
          background-size: 20px 20px;
          background-position: center bottom;
          transform: rotate(180deg);
        }
      `}</style>
      <div className="scalloped-bottom"></div>
    </div>
  );
}
