"use client";

import { ChevronDown } from "lucide-react";
import { ValidationError } from "@/lib/utils/validation";
import Image from "next/image";

export interface SenderDetailsProps {
  onNext: () => void;
  senderName: string;
  setSenderName: (name: string) => void;
  senderPhone: string;
  setSenderPhone: (phone: string) => void;
  senderEmail: string;
  setSenderEmail: (email: string) => void;
  validationErrors: ValidationError[];
  isSubmitting?: boolean;
  paymentData: {
    name: string;
    amount: string;
    currency: string;
    description: string;
  } | null;
  senderCountryCode: string;
  setSenderCountryCode: (code: string) => void;
}

export function SenderDetails({
  onNext,
  senderName,
  setSenderName,
  senderPhone,
  setSenderPhone,
  senderEmail,
  setSenderEmail,
  validationErrors,
  isSubmitting = false,
  paymentData,
  senderCountryCode,
  setSenderCountryCode,
}: SenderDetailsProps) {
  const isFormValid =
    senderName.trim() !== "" &&
    senderPhone.trim() !== "" &&
    senderEmail.trim() !== "";

  return (
    <div className="w-full flex flex-col md:p-8 relative overflow-hidden">
      <Image
        src="/assets/chainpaye.png"
        alt="Chainpaye"
        width={140}
        height={140}
        className="h-14 w-fit relative -left-5 object-contain"
        priority
      />

      <h1 className="text-xl font-bold text-gray-900 mb-6 ml-2">
        Payment Checkout
      </h1>

      {/* Transaction Summary Card */}
      <div className="bg-[#FFFFFF] border border-[#E3E3E3] rounded-[18px] p-6 mb-6 space-y-3">
        <div className="text-[#003DFF] flex justify-between items-center p-4.5 font-sans rounded-[10px]  bg-[#E8EDFF]">
          <span className="font-medium">You&apos;re paying:</span>
          <span className="text-2xl font-bold">
            {paymentData?.currency === "NGN" ? "₦" : paymentData?.currency}
            {paymentData?.amount}
          </span>
        </div>

        <div className="space-y-4">
          <div className="p-4.5 rounded-[10px] bg-[#F3F4F6] flex justify-between text-sm">
            <span className="text-gray-500">Title</span>
            <span className="text-[#111528] font-medium">
              {paymentData?.name || "---"}
            </span>
          </div>
          <div className="flex justify-between text-sm p-4.5 rounded-[10px] bg-[#F3F4F6]">
            <span className="text-gray-500">Description</span>
            <span className="text-[#111528] font-medium">
              {paymentData?.description || "---"}
            </span>
          </div>
        </div>
      </div>

      {/* Sender Details Form */}
      <div className="bg-white rounded-[18px] border border-[#E3E3E3] p-6  mb-6">
        <h2 className="text-gray-900 font-bold mb-6">Sender Details</h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="senderName"
              maxLength={50}
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className={`w-full p-4.5 bg-[#F3F4F6] text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                validationErrors.find((e) => e.field === "name")
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              placeholder="Sender Name"
            />
            {validationErrors.find((e) => e.field === "name") && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.find((e) => e.field === "name")?.message}
              </p>
            )}
          </div>

          {/* Phone Number Field with Country Prefix */}
          <div className="flex gap-2">
            <div className="relative flex items-center bg-[#F3F4F6] rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 border border-transparent transition-all">
              <select
                value={senderCountryCode}
                onChange={(e) => setSenderCountryCode(e.target.value)}
                className="appearance-none bg-transparent pl-4 pr-8 py-4 text-[#111528] text-sm font-medium focus:outline-none cursor-pointer z-10"
              >
                <option value="+234">+234</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+233">+233</option>
                <option value="+254">+254</option>
                <option value="+27">+27</option>
              </select>
              <div className="absolute right-3 pointer-events-none z-0">
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex-1">
              <input
                type="tel"
                id="senderPhone"
                maxLength={10}
                value={senderPhone}
                onChange={(e) => setSenderPhone(e.target.value)}
                className={`w-full p-4.5 bg-[#F3F4F6] text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                  validationErrors.find((e) => e.field === "phone")
                    ? "border-red-500"
                    : "border-transparent"
                }`}
                placeholder="Phone Number"
              />
            </div>
          </div>
          {validationErrors.find((e) => e.field === "phone") && (
            <p className="text-red-500 text-xs mt-1">
              {validationErrors.find((e) => e.field === "phone")?.message}
            </p>
          )}

          {/* Email Field */}
          <div>
            <input
              type="email"
              id="senderEmail"
              maxLength={50}
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className={`w-full p-4.5 bg-[#F3F4F6] text-gray-700 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all ${
                validationErrors.find((e) => e.field === "email")
                  ? "border-red-500"
                  : "border-transparent"
              }`}
              placeholder="Email Address"
            />
            {validationErrors.find((e) => e.field === "email") && (
              <p className="text-red-500 text-xs mt-1">
                {validationErrors.find((e) => e.field === "email")?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={isSubmitting || !isFormValid}
        className={`w-full py-5 rounded-xl font-bold transition-all mb-4 mt-2 ${
          !isFormValid || isSubmitting
            ? "bg-[#7DA2FF] text-[#FFFFFF] cursor-not-allowed"
            : "bg-[#003DFF] text-white hover:bg-[#7DA2FF] "
        }`}
      >
        {isSubmitting ? "Processing..." : "Continue to Bank Transfer"}
      </button>
    </div>
  );
}
