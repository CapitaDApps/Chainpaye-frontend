"use client";

import { ArrowLeft, Copy, Check } from "lucide-react";
import { useState } from "react";

export interface BankTransferProps {
  onSent: () => void;
  onChangeMethod: () => void;
  paymentData: {
    amount: string;
    currency: string;
    selectedCurrency: string;
    paymentType: string;
    token: string;
    transactionId: string;
    paymentInitialization: {
      toronetResponse: {
        bankname?: string;
        accountnumber?: string;
        accountname?: string;
        amount?: number;
        instruction?: string;
      };
    };
  };
  isSubmitting: boolean;
}

export function BankTransfer({
  onSent,
  onChangeMethod,
  paymentData,
  isSubmitting,
}: BankTransferProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Determine if this is a USD bank payment
  const isUSDBank =
    paymentData.currency === "USD" &&
    paymentData.paymentType === "bank" &&
    paymentData.token === "USD";

  // Determine if this is NGN payment
  const isNGN = paymentData.currency === "NGN";

  // Get bank details based on currency/payment type
  const getBankDetails = () => {
    if (isUSDBank) {
      return {
        bankName: "Chase Bank",
        accountName: "ConnectWorld Inc",
        accountNumber: "839128227",
        routingNumber: "021000021",
        bankAddress: "Chase Bank, NA. 270 Park Avenue, New York, NY 10017",
        amount: `${paymentData.currency} ${Number(paymentData.amount).toLocaleString()}`,
      };
    } else if (isNGN) {
      return {
        bankName:
          paymentData.paymentInitialization.toronetResponse.bankname || "N/A",
        accountName:
          paymentData.paymentInitialization.toronetResponse.accountname ||
          "N/A",
        accountNumber:
          paymentData.paymentInitialization.toronetResponse.accountnumber ||
          "N/A",
        amount: `${paymentData.currency} ${Number(paymentData.paymentInitialization.toronetResponse.amount || paymentData.amount).toLocaleString()}`,
      };
    }
    return null;
  };

  const bankDetails = getBankDetails();

  if (!bankDetails) {
    return (
      <div className="flex flex-col h-full max-w-[400px] mx-auto">
        <div className="text-center text-red-500">
          <p>Unable to load bank details. Please try again.</p>
        </div>
      </div>
    );
  }

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

      <div className="text-center mb-6 space-y-2">
        <div className="text-sm text-[#111528] mb-1">
          Transfer
          <span className="font-bold text-[#111528] ml-1">
            {bankDetails.amount}
          </span>
        </div>
        {isUSDBank && (
          <div className="px-4 py-2 bg-orange-50 text-[#FF7700] rounded-lg text-sm text-center">
            Copy transaction ID for this transaction to be successful
          </div>
        )}
        {isNGN && (
          <div className="text-xs text-blue-500">
            Account number expires in 30 Mins
          </div>
        )}
      </div>

      <div className="bg-white border-2 border-dashed border-[#DEE2E6] rounded-xl p-6 space-y-5 mb-8">
        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">BANK NAME</div>
          <div className="font-medium text-gray-900">
            {bankDetails.bankName}
          </div>
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase mb-1">
            ACCOUNT NAME
          </div>
          <div className="font-medium text-gray-900">
            {bankDetails.accountName}
          </div>
        </div>

        <div
          className="flex justify-between items-center group cursor-pointer"
          onClick={() => copyToClipboard(bankDetails.accountNumber, "account")}
        >
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">
              ACCOUNT NUMBER
            </div>
            <div className="font-medium text-gray-900">
              {bankDetails.accountNumber}
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

        {/* Routing Number for USD Bank Payments */}
        {isUSDBank && "routingNumber" in bankDetails && (
          <div
            className="flex justify-between items-center group cursor-pointer"
            onClick={() =>
              copyToClipboard(bankDetails.routingNumber!, "routing")
            }
          >
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">
                ROUTING NUMBER
              </div>
              <div className="font-medium text-gray-900">
                {bankDetails.routingNumber}
              </div>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition">
              {copiedField === "routing" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        {/* Bank Address for USD Bank Payments */}
        {isUSDBank && "bankAddress" in bankDetails && (
          <div
            className="flex justify-between items-center group cursor-pointer"
            onClick={() =>
              copyToClipboard(bankDetails.bankAddress!, "bank-address")
            }
          >
            <div>
              <div className="text-xs text-gray-500 uppercase mb-1">
                BANK ADDRESS
              </div>
              <div className="font-medium text-gray-900">
                {bankDetails.bankAddress}
              </div>
            </div>
            <button className="text-gray-400 hover:text-blue-500 transition">
              {copiedField === "bank-address" ? (
                <Check className="w-4 h-4 text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>
        )}

        {/* Transaction ID */}
        <div
          className="flex justify-between items-center group cursor-pointer"
          onClick={() => copyToClipboard(paymentData.transactionId, "tx-id")}
        >
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">
              TRANSACTION ID
            </div>
            <div className="font-medium text-gray-900 break-all">
              {paymentData.transactionId}
            </div>
          </div>
          <button className="text-gray-400 hover:text-blue-500 transition">
            {copiedField === "tx-id" ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>

        <div className="flex justify-between items-center group cursor-pointer">
          <div>
            <div className="text-xs text-gray-500 uppercase mb-1">AMOUNT</div>
            <div className="font-bold text-[#003DFF]">{bankDetails.amount}</div>
          </div>
        </div>
      </div>

      <button
        onClick={onSent}
        disabled={isSubmitting}
        className={`w-full py-4 rounded-xl font-medium text-white transition-all mb-4 ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#003DFF] hover:bg-[#002dbf] shadow-lg shadow-blue-500/20"
        }`}
      >
        {isSubmitting ? "Processing..." : "I've sent the money"}
      </button>

      <button
        onClick={onChangeMethod}
        className="w-full py-2 text-sm text-gray-500 hover:text-gray-900 transition mb-8"
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
