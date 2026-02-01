"use client";

import { CreditCard, Landmark} from "lucide-react";
import Image from "next/image";
import visa from "../../../public/assets/visa.png"
import masterCard from "../../../public/assets/masterclass.png";
import americaExpress from "../../../public/assets/american express.png";

interface MethodSelectionProps {
  selectedMethod: "card" | "bank" | null;
  onSelectMethod: (method: "card" | "bank") => void;
  onPay: () => void;
}

export function MethodSelection({
  selectedMethod,
  onSelectMethod,
  onPay,
}: MethodSelectionProps) {
  return (
    <div className="flex flex-col h-full md:gap-24">
      <div>
        <div className="md:text-center md:text-left mb-8">
          <h3 className="text-xs font-bold text-[#111528] uppercase tracking-wider mb-2">
            CHAINPAYE CHECKOUT
          </h3>
          <p className="text-gray-600  text-sm">
            Use one of the payment methods below to pay $250 to Blessing Idowu
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Payment method
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <label
              onClick={() => onSelectMethod("card")}
              className={`flex items-center p-4 cursor-pointer transition-all border-b border-gray-100  hover:bg-gray-50 ${
                selectedMethod === "card" ? "bg-gray-50 " : ""
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
                  selectedMethod === "card"
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === "card" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>

              <CreditCard className="w-5 h-5 text-gray-900  mr-3" />
              <span className="font-medium text-gray-900  flex-1">
                Pay with card
              </span>

              <div className="flex gap-1.5">
                <Image
                  src="/assets/visa.svg"
                  alt="Visa"
                  width={32}
                  height={20}
                  className="h-5 w-auto"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="w-8 h-5">
                  {/* VISA */}
                  <Image src={visa} alt="visa card" />
                </div>
                <div className="w-8 h-5">
                  {/* MC */}
                  <Image src={masterCard} alt="master card" />
                </div>
                <div className="w-8 h-5">
                  {/* AMEX */}
                  <Image src={americaExpress} alt="AMEX card" />
                </div>
              </div>
            </label>

            {/* Bank Transfer Option */}
            <label
              onClick={() => onSelectMethod("bank")}
              className={`flex items-center p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                selectedMethod === "bank" ? "bg-gray-50 " : ""
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
                  selectedMethod === "bank"
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === "bank" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>
              <Landmark className="w-5 h-5 text-gray-900  mr-3" />
              <span className="font-medium text-gray-900 ">
                Pay with Bank Transfer
              </span>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={onPay}
        disabled={!selectedMethod}
        className={`w-full py-4 rounded-xl font-semibold text-white transition-all mt-4 ${
          selectedMethod
            ? "bg-[#6390FF] hover:bg-[#4b7bff]"
            : "bg-[#6390FF]/50 cursor-not-allowed"
        }`}
      >
        Pay
      </button>
    </div>
  );
}
