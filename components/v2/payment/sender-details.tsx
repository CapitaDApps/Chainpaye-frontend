"use client";

import { ArrowLeft } from "lucide-react";
import { ValidationError } from "@/lib/utils/validation";

export interface SenderDetailsProps {
  onNext: () => void;
  onBack: () => void;
  senderName: string;
  setSenderName: (name: string) => void;
  senderPhone: string;
  setSenderPhone: (phone: string) => void;
  senderEmail: string;
  setSenderEmail: (email: string) => void;
  validationErrors: ValidationError[];
  isSubmitting?: boolean;
}

export function SenderDetails({
  onNext,
  onBack,
  senderName,
  setSenderName,
  senderPhone,
  setSenderPhone,
  senderEmail,
  setSenderEmail,
  validationErrors,
  isSubmitting = false,
}: SenderDetailsProps) {
  return (
    <div className="w-full flex flex-col md:p-8">
      <div className="flex gap-3 items-center mb-10">
        <button onClick={onBack}>
          <ArrowLeft className="w-5 h-5 text-[#111528]" />
        </button>
        <span className="text-gray-900 font-medium text-lg">
          Pay with Bank Transfer
        </span>
      </div>

      <div className="space-y-6 mb-8">
        <div>
          <label
            htmlFor="senderName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sender Details
          </label>
          <div className="space-y-4 bg-[#F3F4F6] p-4 rounded-2xl">
            <div>
              <input
                type="text"
                id="senderName"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className={`w-full px-4 py-4 bg-white text-[#5A5F73] border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.find((e) => e.field === "name")
                    ? "border-red-500"
                    : "border-[#E3E3E3]"
                }`}
                placeholder="Enter your name"
              />
              {validationErrors.find((e) => e.field === "name") && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.find((e) => e.field === "name")?.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                id="senderPhone"
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className={`w-full px-4 py-4 bg-white text-[#5A5F73] border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.find((e) => e.field === "phone")
                    ? "border-red-500"
                    : "border-[#E3E3E3]"
                }`}
                placeholder="Enter your Phone Number"
              />
              {validationErrors.find((e) => e.field === "phone") && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.find((e) => e.field === "phone")?.message}
                </p>
              )}
            </div>

            {/* Email field - keeping it as it was in the original BankTransfer but following the new style */}
            <div>
              <input
                type="email"
                id="senderEmail"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className={`w-full px-4 py-4 bg-white text-[#5A5F73] border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  validationErrors.find((e) => e.field === "email")
                    ? "border-red-500"
                    : "border-[#E3E3E3]"
                }`}
                placeholder="Enter your Email"
              />
              <p className="text-gray-500 text-xs mt-2 ml-1">
                We&apos;ll send your receipt to this email
              </p>
              {validationErrors.find((e) => e.field === "email") && (
                <p className="text-red-500 text-xs mt-1">
                  {validationErrors.find((e) => e.field === "email")?.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-medium text-white transition-all mb-8 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20"
        }`}
      >
        {isSubmitting ? "Processing..." : "Next"}
      </button>
    </div>
  );
}
