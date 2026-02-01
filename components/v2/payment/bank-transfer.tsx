"use client";

import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

interface BankTransferProps {
  onSent: () => void;
  onChangeMethod: () => void;
}

export function BankTransfer({ onSent, onChangeMethod }: BankTransferProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col h-full max-w-[400px] mx-auto">
      <div className="flex gap-3 items-center mb-6">
        <button onClick={onChangeMethod}>
          <ArrowLeft className="w-5 h-5 text-[#111528]" />
        </button>
        <span className="text-gray-900 font-medium">
          Pay with Bank Transfer
        </span>
      </div>

      <div className="text-center mb-6">
        <div className="text-sm text-[#111528] mb-1">
          Transfer
          <span className="font-bold text-[#111528] ml-1">
            NGN 362,500
          </span>
        </div>
        <div className="text-xs text-blue-500">
          Account number expires in 30 Mins
        </div>
      </div>

      <div className="bg-[#F9FAFB] rounded-xl p-6 pb-10 space-y-5 mb-8 relative">
        {/* Custom Dashed Border via SVG */}
        <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
          <svg className="w-full h-full">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="12"
              fill="none"
              stroke="#DEE2E6"
              strokeWidth="2"
              strokeDasharray="10 10"
              // className="dark:stroke-gray-800"
            />
          </svg>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">BANK NAME</div>
          <div className="font-medium text-gray-900">FCMB</div>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">
            ACCOUNT NAME
          </div>
          <div className="font-medium text-gray-900">
            Jane Doe
          </div>
        </div>

        <div
          className="flex justify-between items-center group cursor-pointer"
          onClick={() => copyToClipboard("1234567890", "account")}
        >
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">
              ACCOUNT NUMBER
            </div>
            <div className="font-medium text-gray-900 ">
              1234567890
            </div>
          </div>
          <button className="text-gray-400 hover:text-blue-500 transition">
            {copiedField === "account" ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        <div
          className="flex justify-between items-center group cursor-pointer"
          onClick={() => copyToClipboard("362500", "amount")}
        >
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
            <div className="font-medium text-gray-900 ">
              NGN 362,500
            </div>
          </div>
          <button className="text-gray-400 hover:text-blue-500 transition">
            {copiedField === "amount" ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={onSent}
        className="w-full py-4 rounded-xl font-medium text-white bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20 transition-all mb-4"
      >
        I&apos;ve sent the money
      </button>

      <button
        onClick={onChangeMethod}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition"
      >
        Change Payment Method
      </button>

      {copiedField && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-full px-4 py-2 flex items-center gap-2 z-50 animate-in fade-in slide-in-from-bottom-5">
          <span className="text-green-500 text-sm font-medium">Copied</span>
          <Check className="w-4 h-4 text-green-500" />
        </div>
      )}
    </div>
  );
}
