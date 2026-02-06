"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/assets/chainpaye.png";
import { useRef } from "react";
import { generateReceiptPDF } from "@/lib/utils/generate-receipt-pdf";
import Download from "@/components/download";

interface ConfirmationProps {
  isVerifying?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verificationError?: any;
}

export function Confirmation({
  isVerifying = true,
  verificationError,
}: ConfirmationProps = {}) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
      <div className="relative mb-6">
        <Image src={logo} alt="Chainpaye" width={100} height={100} />
      </div>
      <h3 className="text-lg font-medium text-gray-600  mb-6 uppercase tracking-wide">
        {isVerifying ? "CONFIRMING PAYMENT" : "PAYMENT VERIFICATION"}
      </h3>

      {isVerifying ? (
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-sm text-gray-500 text-center max-w-md">
            We&apos;re verifying your payment with our banking partner. This may
            take a few moments...
          </p>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Payment verification in progress
          </p>
        </div>
      )}

      {verificationError && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            Still verifying... This may take a few minutes for the payment to be
            processed.
          </p>
          <details className="mt-2">
            <summary className="text-xs text-yellow-600 cursor-pointer">
              Technical Details
            </summary>
            <pre className="text-xs text-yellow-700 mt-1 whitespace-pre-wrap">
              {JSON.stringify(verificationError, null, 2)}
            </pre>
          </details>
        </div>
      )}
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
  const receiptRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    await generateReceiptPDF({
      amount,
      refNumber,
      date,
      method,
      senderName,
      logoSrc: logo.src,
    });
  };

  return (
    <div
      className="mx-auto relative max-w-100 my-16 flex items-center justify-center pt-12"
      ref={receiptRef}
    >
      <div className="flex flex-col items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-t-4xl relative px-5 bg-white overflow-visible w-full max-w-95">
        <div className="absolute inset-0 rounded-t-4xl overflow-hidden pointer-events-none z-0">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url(${logo.src})`,
              backgroundRepeat: "repeat",
              backgroundSize: "120px 60px",
              transform: "rotate(-15deg) scale(1.5)",
            }}
          />
        </div>

        {/* Success Icon Overlap */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-[#f9fafb]">
            <div className="w-16 h-16 bg-[#23A26D] rounded-full flex items-center justify-center shadow-lg shadow-[#23A26D]/20">
              <Check className="w-8 h-8 text-white stroke-[4px]" />
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full px-1 pt-14">
          {/* Header Row - Below the Icon */}
          <div className="flex justify-between items-center w-full mb-6">
            <div className="flex items-center gap-1.5 ">
              <div className="w-[70px] sm:w-[100px] h-[50px] relative">
                <Image
                  src={logo}
                  alt="Chainpaye"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <span className="text-[#111528] text-[12px] font-normal uppercase tracking-widest">
              Transaction Receipt
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-center mb-6">
              <p className="text-[#121212] font-medium text-base mb-1">
                Payment Success!
              </p>
              <div className="flex items-baseline justify-center text-[#00174F] text-[32px]">
                <span className="mr-1">₦</span>
                <span className="tracking-tight leading-none">
                  {amount.replace(/[^\d.,]/g, "")}
                </span>
              </div>
              <p className="text-[#5A5F73] text-[12px] font-normal tracking-wide whitespace-nowrap">
                {date}
              </p>
            </div>

            {/* Details List */}
            <div className="w-full space-y-5 mb-6 border-t border-b border-[#F3F4F6] py-6 px-1">
              <div className="flex justify-between items-start group">
                <span className="text-[#9CA3AF] text-[12px] font-normal">
                  Recipient Details
                </span>
                <div className="text-right">
                  <div className="font-medium text-[#111528] text-[12px] leading-tight ">
                    Idowu Blessing Jeremiah
                  </div>
                  <div className="text-[#5A5F73] text-[12px] font-medium mt-0.5">
                    GTB | 01234567890
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-[#9CA3AF] text-[12px] font-normal">
                  Sender Details
                </span>
                <div className="text-right">
                  <div className="font-medium text-[#111528] text-[12px] leading-tight ">
                    {senderName}
                  </div>
                  <div className="text-[#5A5F73] text-[12px] font-medium mt-0.5">
                    {method} | {refNumber.slice(0, 10)}
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#9CA3AF] text-[12px] font-normal">
                  Transaction Id
                </span>
                <span className="text-[#5A5F73] text-[12px] font-medium mt-0.5">
                  {refNumber}
                </span>
              </div>
            </div>

            <button
              className="flex items-center gap-3 text-[#003DFF] hover:opacity-80 transition group z-10 py-1.5 mb-6"
              onClick={handleDownloadPDF}
            >
              <Download />
              <span className="text-sm font-normal">Download PDF receipt</span>
            </button>

            {/* Footer Text - Inside and compact */}
            <div className="flex justify-center items-center gap-2.5 mb-8 text-gray-400 text-[11px] font-semibold border-t border-gray-50 pt-6 w-full relative z-10">
              <span>
                Powered by{" "}
                <span className="text-gray-900 font-bold">Chainpaye</span>
              </span>
              <div className="w-px h-4 bg-gray-200" />
              <button className="hover:text-gray-800 transition">help</button>
            </div>
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
    </div>
  );
}
