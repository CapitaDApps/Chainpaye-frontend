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
  paymentData: {
    amount: string;
    currency: string;
    description: string;
    paymentType: string;
  };
  availableMethods: {
    card: boolean;
    bank: boolean;
  };
}

export function MethodSelection({
  selectedMethod,
  onSelectMethod,
  onPay,
  paymentData,
  availableMethods,
}: MethodSelectionProps) {
  
  // Debug logging
  console.log("MethodSelection Debug:", {
    selectedMethod,
    availableMethods,
    paymentData: {
      currency: paymentData.currency,
      paymentType: paymentData.paymentType,
      amount: paymentData.amount
    }
  });

  return (
    <div className="flex flex-col h-full md:gap-24">
      <div>
        <div className="md:text-center md:text-left mb-8">
          <h3 className="text-xs font-bold text-[#111528] uppercase tracking-wider mb-2">
            CHAINPAYE CHECKOUT
          </h3>
          <p className="text-gray-600  text-sm">
            Use onee of the payment methods below to pay {paymentData.currency} {Number(paymentData.amount).toLocaleString()}
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="text-sm font-medium text-gray-500 mb-2">
            Payment method
            {Object.values(availableMethods).filter(Boolean).length === 1 && (
              <span className="text-xs text-blue-600 ml-2">(Only available option)</span>
            )}
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden">
            {/* Card Payment Option */}
            <label
              onClick={() => {
                console.log("Card option clicked:", { availableCard: availableMethods.card });
                if (availableMethods.card) {
                  onSelectMethod("card");
                }
              }}
              className={`flex items-center p-4 transition-all border-b border-gray-100 ${
                availableMethods.card 
                  ? `cursor-pointer hover:bg-gray-50 ${selectedMethod === "card" ? "bg-gray-50" : ""}` 
                  : "cursor-not-allowed opacity-50 bg-gray-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
                  selectedMethod === "card" && availableMethods.card
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === "card" && availableMethods.card && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>

              <CreditCard className={`w-5 h-5 mr-3 ${availableMethods.card ? "text-gray-900" : "text-gray-400"}`} />
              <span className={`font-medium flex-1 ${availableMethods.card ? "text-gray-900" : "text-gray-400"}`}>
                Pay with card
                {!availableMethods.card && (
                  <span className="text-xs text-gray-400 block">
                    Not available for {paymentData.currency} {paymentData.paymentType === "bank" ? "bank" : ""} payments
                  </span>
                )}
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
                  <Image src={visa} alt="visa card" />
                </div>
                <div className="w-8 h-5">
                  <Image src={masterCard} alt="master card" />
                </div>
                <div className="w-8 h-5">
                  <Image src={americaExpress} alt="AMEX card" />
                </div>
              </div>
            </label>

            {/* Bank Transfer Option */}
            <label
              onClick={() => {
                console.log("Bank option clicked:", { availableBank: availableMethods.bank });
                if (availableMethods.bank) {
                  onSelectMethod("bank");
                }
              }}
              className={`flex items-center p-4 transition-all ${
                availableMethods.bank 
                  ? `cursor-pointer hover:bg-gray-50 ${selectedMethod === "bank" ? "bg-gray-50" : ""}` 
                  : "cursor-not-allowed opacity-50 bg-gray-100"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${
                  selectedMethod === "bank" && availableMethods.bank
                    ? "border-blue-600"
                    : "border-gray-300"
                }`}
              >
                {selectedMethod === "bank" && availableMethods.bank && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                )}
              </div>
              <Landmark className={`w-5 h-5 mr-3 ${availableMethods.bank ? "text-gray-900" : "text-gray-400"}`} />
              <span className={`font-medium ${availableMethods.bank ? "text-gray-900" : "text-gray-400"}`}>
                Pay with Bank Transfer
                {!availableMethods.bank && (
                  <span className="text-xs text-gray-400 block">
                    Not available for {paymentData.currency} card payments
                  </span>
                )}
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
      
      {/* Debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-3 bg-gray-100 rounded text-xs">
          <div><strong>Debug Info:</strong></div>
          <div>Selected: {selectedMethod || 'none'}</div>
          <div>Available: {JSON.stringify(availableMethods)}</div>
          <div>Currency: {paymentData.currency}</div>
          <div>Type: {paymentData.paymentType}</div>
          
          {/* Test redirect button */}
          <button
            onClick={() => {
              console.log("Test redirect clicked");
              onPay();
            }}
            className="mt-2 px-2 py-1 bg-blue-500 text-white text-xs rounded"
          >
            Test Pay Function
          </button>
        </div>
      )}
    </div>
  );
}
